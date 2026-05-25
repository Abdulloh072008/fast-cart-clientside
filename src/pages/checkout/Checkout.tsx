import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import logo from "../../assets/img/Frame 834.png"
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../reducer/Cartslice";
import { getImageUrl } from "@/lib/utils";

const Checkout = () => {

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const total = cartItems.reduce((sum, item) => {
    const price = item.hasDiscount ? item.discountPrice : item.price;
    return sum + price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    dispatch(clearCart()); 
    navigate("/"); 
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-25">
      <div className="text-sm text-gray-400 mb-12 flex gap-2">
        <span>Product</span>
        <span>/</span>
        <span>View Cart</span>
        <span>/</span>
        <span className="text-black font-medium">CheckOut</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-24 items-start">
        <div className="flex-1 w-full max-w-xl">
          <h1 className="text-3xl font-medium tracking-wide mb-8">Billing Details</h1>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-gray-400">First Name<span className="text-[#DB4444]">*</span></Label>
              <Input className="bg-[#F5F5F5] border-none h-12 rounded" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Last Name</Label>
              <Input className="bg-[#F5F5F5] border-none h-12 rounded" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Street Address<span className="text-[#DB4444]">*</span></Label>
              <Input className="bg-[#F5F5F5] border-none h-12 rounded" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Apartment, floor, etc. (optional)</Label>
              <Input className="bg-[#F5F5F5] border-none h-12 rounded" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Town/City<span className="text-[#DB4444]">*</span></Label>
              <Input className="bg-[#F5F5F5] border-none h-12 rounded" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Phone Number<span className="text-[#DB4444]">*</span></Label>
              <Input className="bg-[#F5F5F5] border-none h-12 rounded" />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400">Email Address<span className="text-[#DB4444]">*</span></Label>
              <Input className="bg-[#F5F5F5] border-none h-12 rounded" />
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <Checkbox id="save-info" className="data-[state=checked]:bg-[#DB4444] data-[state=checked]:border-[#DB4444]" />
              <label id="save-info" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Save this information for faster check-out next time
              </label>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[420px] pt-12">
          <div className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src={getImageUrl(item.image)} alt={item.productName} className="w-12 h-12 object-contain" />
                  <span className="text-sm font-medium">{item.productName}</span>
                </div>
                <span className="text-sm font-medium">
                  ${(item.hasDiscount ? item.discountPrice : item.price) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4 border-b border-gray-200 pb-4 mb-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-medium text-base border-t border-gray-200 pt-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <RadioGroup defaultValue="cod" className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="bank" id="bank" className="border-black text-black data-[state=checked]:border-[#DB4444] data-[state=checked]:text-[#DB4444]" />
                <Label htmlFor="bank" className="font-normal">Bank</Label>
              </div>
              <div className="flex items-center gap-2">
                <img src={logo} alt="bKash" className="h-4 object-contain" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="cod" id="cod" className="border-black text-black data-[state=checked]:border-[#DB4444] data-[state=checked]:text-[#DB4444]" />
              <Label htmlFor="cod" className="font-normal">Cash on delivery</Label>
            </div>
          </RadioGroup>

          <div className="flex gap-4 mb-8">
            <Input placeholder="Coupon Code" className="h-12 border border-black rounded px-4 flex-1" />
            <Button variant="outline" className="h-12 bg-[#DB4444] text-white hover:bg-[#c33d3d] hover:text-white px-8 rounded border-none">
              Apply Coupon
            </Button>
          </div>

          <Button 
            onClick={handlePlaceOrder}
            className="bg-[#DB4444] hover:bg-[#c33d3d] text-white h-12 px-12 rounded font-medium"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;  