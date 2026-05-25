import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../reducer/Cartslice";
import { toggleWishlist } from "../../reducer/Wishlistslice";
import type { RootState } from "../../store/store";
import { getImageUrl } from "@/lib/utils";

const Cards = ({ limit }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useSelector((state: RootState) => state.auth.token)
    const products = useSelector(({ products }) => products.products)
    const loading = useSelector(({ products }) => products.loading)
    const error = useSelector(({ products }) => products.error)
    const initialized = useSelector(({ products }) => products.initialized)
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items)

    const discountPercent = (original: number, discounted: number) =>
        Math.round(((original - discounted) / original) * 100)

    const handleAddToCart = (product) => {
        if (!token) { navigate("/login"); return; }
        dispatch(addToCart({
            id: product.id,
            productName: product.productName,
            price: product.price,
            image: product.image,
            hasDiscount: product.hasDiscount,
            discountPrice: product.discountPrice,
        }))
    }

    const handleWishlist = (product) => {
        if (!token) { navigate("/login"); return; }
        dispatch(toggleWishlist(product))
    }

    const showproduct = limit ? products.slice(0, limit) : products

    return (
        <>
            {loading ? (
                <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} className="">
                            <Skeleton className="w-full h-52" />
                            <CardContent className="p-3 space-y-2">
                                <Skeleton className="h-4 w-[250px] -py-5" />
                                <Skeleton className="h-4 w-[250px] -py-5" />
                                <Skeleton className="h-3 w-[250px] -py-5" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                    <p className="text-lg font-medium text-red-500">{error}</p>
                </div>
            ) : initialized && products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                    <ShoppingCart className="w-12 h-12 mb-4 opacity-30" />
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm mt-1">Try selecting a different category</p>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                    {showproduct.map((product) => {
                        const isInWishlist = wishlistItems.some((item) => item.id === product.id)

                        return (
                            <Card
                                key={product.id}
                                className="slide-in-fwd-center group -py-5 border-border rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-300 w-68 overflow-hidden bg-card"
                            >
                                <div className="relative bg-muted h-52 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={getImageUrl(product.image)}
                                        alt={product.productName}
                                        className="object-contain h-full w-full p-4 transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {product.hasDiscount && (
                                        <span className="absolute top-2 left-2 bg-[#DB4444] text-white text-xs font-semibold px-2 py-0.5 rounded">
                                            -{discountPercent(product.price, product.discountPrice)}%
                                        </span>
                                    )}
                                    <div className="absolute top-2 right-2 flex flex-col gap-1.5">
                                        <button
                                            onClick={() => handleWishlist(product)}
                                            className="w-8 h-8 bg-background rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
                                        >
                                            <Heart
                                                className={`w-4 h-4 transition-colors ${isInWishlist ? "fill-[#DB4444] text-[#DB4444]" : "text-muted-foreground"}`}
                                            />
                                        </button>
                                        <Link to={`/details/${product.id}`}>
                                            <button className="w-8 h-8 bg-background rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform">
                                                <Eye className="w-4 h-4 text-muted-foreground" />
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <Button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90 text-sm font-medium h-10"
                                        >
                                            Add To Cart
                                        </Button>
                                    </div>
                                </div>

                                <CardContent className="p-3 space-y-1">
                                    <Link to={`/details/${product.id}`}>
                                        <p className="text-sm font-semibold text-foreground truncate hover:text-primary transition-colors">
                                            {product.productName}
                                        </p>
                                    </Link>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-[#DB4444]">
                                            ${product.hasDiscount ? product.discountPrice : product.price}
                                        </span>
                                        {product.hasDiscount && (
                                            <span className="text-xs text-muted-foreground line-through">
                                                ${product.price}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3.5 h-3.5 ${i < Math.round(product.rating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-muted text-muted-foreground/30"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default Cards;