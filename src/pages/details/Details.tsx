import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Minus, Plus, RotateCcw, Star, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getColors } from "../../api/Colorapi";
import { getProducts } from "../../api/Productapi";
import Cards from "../../components/shared/Cards";
import type { RootState } from "../../store/store";
import { axiosRequest } from "../../utils/token";
import { addToCart, updateQuantity } from "../../reducer/Cartslice";
import { toggleWishlist } from "../../reducer/Wishlistslice";

export interface Product {
  id: number;
  productName: string;
  code: string;
  description: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
  quantity: number;
  weight: string;
  size: string;
  image: string;
  images: string[];
  rating: number;
  brandId: number;
  colorId: number;
  subCategoryId: number;
  categoryId: number;
  categoryName: string;
}

interface ApiResponse {
  data: Product;
  statusCode: number;
  message: string;
}

const SIZES = ["XS", "S", "M", "L", "XL"];

const Details = () => {
  const { productid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const colors = useSelector((state: RootState) => state.colors.colors);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  // const [selectedColor, setSelectedColor] = useState<number | null>(null);

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((i) => i.id === product?.id)
  );

  const qty = cartItem?.quantity || 1;
  const isInWishlist = wishlistItems.some((item) => item.id === product?.id);

  async function getProductById() {
    try {
      setLoading(true);
      const { data } = await axiosRequest.get<ApiResponse>(
        `/api/Product/get-product-by-id`,
        {
          params: { id: productid },
        }
      );
      setProduct(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (productid) getProductById();
    dispatch(getProducts({}));
    dispatch(getColors());
  }, [productid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-t-2 border-b-2 border-[#DB4444]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link to="/">
          <Button>Back Home</Button>
        </Link>
      </div>
    );
  }

  const displayPrice = product.hasDiscount
    ? product.discountPrice
    : product.price;

  const handleBuyNow = () => {
    if (!cartItem) {
      dispatch(
        addToCart({
          id: product.id,
          productName: product.productName,
          price: product.price,
          discountPrice: product.discountPrice,
          hasDiscount: product.hasDiscount,
          image: product.image,
        })
      );
    }
    navigate("/checkout");
  };

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-25 ">
      <div className="flex flex-col lg:flex-row gap-10">

        <div className="flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex flex-col gap-3">
            {product.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-[110px] h-[110px] py-2 px-2 border ${selectedImage === i ? "border-[#DB4444]" : "border-transparent"
                  }`}
              >
                <img src={img} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

          <div className="lg:w-[400px] lg:h-[510px] h-[400px] px-3 bg-[#F5F5F5] flex items-center justify-center">
            <img
              src={product.images?.[selectedImage] ?? product.image}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">
            {product.productName}
          </h1>

          <div className="flex items-center gap-3 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
                  }`}
              />
            ))}
          </div>

          <div className="text-3xl font-bold">${displayPrice}</div>

          <p className="text-sm text-gray-500">{product.description}</p>

          <Separator />

          <div className="flex items-center gap-4">
            <span>Size:</span>
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border ${selectedSize === size ? "bg-black text-white" : ""
                  }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-4">

            <button
              onClick={() => {
                dispatch(
                  updateQuantity({
                    id: product.id,
                    quantity: Math.max(1, qty - 1),
                  })
                );
              }}
              className="w-10 h-11 flex items-center justify-center border"
            >
              <Minus />
            </button>

            <span className="w-12 text-center">{qty}</span>

            <button
              onClick={() => {
                if (!cartItem) {
                  dispatch(
                    addToCart({
                      id: product.id,
                      productName: product.productName,
                      price: product.price,
                      discountPrice: product.discountPrice,
                      hasDiscount: product.hasDiscount,
                      image: product.image,
                    })
                  );
                } else {
                  dispatch(
                    updateQuantity({
                      id: product.id,
                      quantity: cartItem.quantity + 1,
                    })
                  );
                }
              }}
              className="w-10 h-11 flex items-center justify-center bg-[#DB4444] text-white"
            >
              <Plus />
            </button>

            <Button onClick={handleBuyNow} className="bg-[#DB4444] hover:bg-[#c33d3d] py-6 px-10 text-white rounded">
              Buy Now
            </Button>
            
            <button 
              onClick={() => dispatch(toggleWishlist({
                id: String(product.id),
                productName: product.productName,
                price: product.price,
                discountPrice: product.discountPrice,
                hasDiscount: product.hasDiscount,
                image: product.image
              }))}
              className="border w-11 h-11 flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Heart className={`w-5 h-5 transition-colors ${isInWishlist ? "fill-[#DB4444] text-[#DB4444]" : "text-black"}`} />
            </button>
          </div>

          <div className="mt-6 border rounded">
            <div className="p-4 flex gap-3">
              <Truck />
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-xs underline">Check availability</p>
              </div>
            </div>

            <Separator />

            <div className="p-4 flex gap-3">
              <RotateCcw />
              <div>
                <p className="font-semibold">Return Policy</p>
                <p className="text-xs">30 days free return</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Related Products
        </h2>
        <Cards limit={4} />
      </div>
    </div>
  );
};

export default Details;