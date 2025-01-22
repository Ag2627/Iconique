export const calculateCartTotals = (cartItems) => {
    let totalPrice = 0;
    let totalDiscount = 0;
  
    cartItems.forEach((item) => {
      const itemPrice = (item.price - (item.price * item.discount) / 100) * item.quantity;
      const itemDiscount = ((item.price - itemPrice) * item.quantity);
  
      totalPrice += itemPrice;
      totalDiscount += itemDiscount;
    });
  
    return {
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      totalDiscount: parseFloat(totalDiscount.toFixed(2)),
    };
  };
  