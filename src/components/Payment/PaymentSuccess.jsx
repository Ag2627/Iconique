import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-16 space-y-6"> {/* Padding badhaya aur space-y-6 se gap add kiya */}
      <CardHeader className="p-0">
        <CardTitle className="text-4xl mb-4"> {/* mb-4 se heading aur button me gap */}
          Payment is successful!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="mt-6 px-6 py-3 text-lg" onClick={() => navigate("/profile/manage-orders")}>
          View Orders
        </Button>
      </CardContent>
    </Card>
  );
};
