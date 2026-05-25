import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../reducer/Cartslice";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { getImageUrl } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronUp, ChevronDown, X } from "lucide-react";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state: RootState) => state.cart.items);

  const [coupon, setCoupon] = useState("");

  const subtotal = items.reduce((sum, item) => {
    const price = item.hasDiscount
      ? item.discountPrice
      : item.price;

    return sum + price * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="mt-20 w-[90%] max-w-[1170px] py-25 mx-auto flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">
          Your cart is empty
        </h2>

        <Button onClick={() => navigate("/")}>
          Return To Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-20 w-[90%] max-w-[1170px]  mx-auto py-10">
      <div className="mb-8 text-sm text-muted-foreground">
        Home / Cart
      </div>

      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-center">
                Price
              </TableHead>
              <TableHead className="text-center">
                Quantity
              </TableHead>
              <TableHead className="text-center">
                Subtotal
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item) => {
              const price = item.hasDiscount
                ? item.discountPrice
                : item.price;

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.productName}
                        className="w-16 h-16 object-contain"
                      />

                      <span className="font-medium">
                        {item.productName}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    ${price}
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-center">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <span className="px-4 py-2 min-w-[50px] text-center">
                          {String(item.quantity).padStart(2, "0")}
                        </span>

                        <div className="flex flex-col border-l">
                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            className="px-2 py-1 hover:bg-muted"
                          >
                            <ChevronUp className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity - 1,
                                })
                              )
                            }
                            className="px-2 py-1 border-t hover:bg-muted"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-semibold">
                        $
                        {(price * item.quantity).toFixed(2)}
                      </span>

                      <Button
                        size="icon"
                        variant="destructive"
                        className="w-7 h-7 rounded-full"
                        onClick={() =>
                          dispatch(removeFromCart(item.id))
                        }
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
        >
          Return To Shop
        </Button>

        <Button
          variant="destructive"
          onClick={() => dispatch(clearCart())}
        >
          Remove All
        </Button>
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex gap-3 h-fit">
          <Input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Coupon Code"
            className="max-w-[220px]"
          />

          <Button variant="outline">
            Apply Coupon
          </Button>
        </div>

        <div className="w-full md:w-[380px] border rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold">
            Cart Total
          </h2>

          <div className="flex justify-between border-b pb-3 text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between border-b pb-3 text-sm">
            <span>Shipping</span>
            <span className="text-green-600">
              Free
            </span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <Link to={"/checkout"}>
          <Button className="w-full">
            Proceed to Checkout
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}