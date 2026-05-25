import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/shared/Productcards";
import { Card, CardContent } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import type { RootState } from "../../store/store";

interface Product {
    id: number;
    title?: string;
    price?: number;
    image?: string;
}

const Wishlist = () => {
    const wishlistItems = useSelector(
        (state: RootState) => state.wishlist.items
    );

    const loading = useSelector(
        (state: RootState) => state.products.loading
    );

    const error = useSelector(
        (state: RootState) => state.products.error
    );

    const products = useSelector(
        (state: RootState) => state.products.products
    );

    const [randomProducts, setRandomProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (products && products.length > 0) {
            const shuffled = [...products].sort(() => 0.5 - Math.random());
            setRandomProducts(shuffled.slice(0, 4));
        }
    }, [products]);

    if (wishlistItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <h2 className="text-xl font-medium tracking-wide">
                    Your Wishlist is empty
                </h2>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-5 h-10 bg-[#DB4444] rounded" />
                        <h1 className="text-xl font-medium tracking-wide">
                            Just For You
                        </h1>
                    </div>

                    <Skeleton className="h-10 w-24 rounded" />
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card
                            key={i}
                            className="w-full sm:w-[calc(33%-12px)] lg:w-[calc(25%-18px)]"
                        >
                            <Skeleton className="w-full h-52" />

                            <CardContent className="p-3 space-y-2">
                                <Skeleton className="h-4 w-[80%]" />
                                <Skeleton className="h-4 w-[50%]" />
                                <Skeleton className="h-3 w-[60%]" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                <p className="text-lg font-medium text-red-500">
                    {String(error)}
                </p>
            </div>
        );
    }

    return (
        <main className="py-25">
            <section className="max-w-[1170px] mx-auto w-[90%]">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-xl font-medium">
                        Wishlist ({wishlistItems.length})
                    </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {wishlistItems.map((item: Product) => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            </section>

            <section className="max-w-[1170px] m-auto w-[90%]">
                <div className="max-w-6xl mx-auto px-4 py-16">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-5 h-10 bg-[#DB4444] rounded" />

                            <h1 className="text-xl font-medium tracking-wide">
                                Just For You
                            </h1>
                        </div>

                        <button className="border border-border rounded px-6 py-2.5 text-sm font-medium hover:bg-muted transition-colors bg-background">
                            See All
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                        {randomProducts.map((product: Product) => (
                            <div
                                key={product.id}
                                className="w-full sm:w-[calc(33%-12px)] lg:w-[calc(25%-18px)]"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Wishlist;