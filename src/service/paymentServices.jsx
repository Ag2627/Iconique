import axios from "axios";
import { toast } from "@/hooks/use-toast"; 
import { clearCartInDB, clearCartItems, fetchCartItems } from "@/redux/store/cart-slice";
const account = JSON.parse(localStorage.getItem("account"));

export const paymentServices = async (orderData, navigate, dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/payment/createOrder", orderData);
    const data = res.data;

    if (data && data.success) {
      const backendOrderId = data.orderId;

      // ✅ Define handler function here so it has access to dispatch/navigate
      const handleRazorpayResponse = async (response) => {
        const optn = {
          orderId: backendOrderId,
          paymentId: response.razorpay_payment_id,
          sign: response.razorpay_signature,
        };

        try {
          const res = await axios.post("http://localhost:5000/payment/capturePayment", optn);
          if (res.data.success) {
            toast({ title: "Payment successful!" });
            dispatch(clearCartInDB(account?.id));
            dispatch(clearCartItems()); // ✅ Redux cart now clears
            navigate("/payment/success-page");     // ✅ Redirect happens
          } else {
            toast({ title: "Payment failed", variant: "destructive" });
          }
        } catch (err) {
          console.log("Payment verification failed:", err);
          toast({ title: "Error verifying payment", variant: "destructive" });
        }
      };

      const paymentObject = new window.Razorpay({
        key: "rzp_test_pIRmD0pCH6Ut3K",
        order_id: data.id,
        amount: data.amount,
        currency: data.currency,

        handler: handleRazorpayResponse, // ✅ Now uses correct closure

        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            toast({ title: "Payment popup closed" });
          },
        },
      });

      paymentObject.open();
    } else {
      toast({ title: "Failed to initiate payment", variant: "destructive" });
    }
  } catch (error) {
    console.error("Error in paymentServices:", error);
    toast({ title: "Payment service error", variant: "destructive" });
  }
};
