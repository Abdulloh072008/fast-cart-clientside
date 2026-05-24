import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { ChevronRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "../../api/categoryapi";

export default function SideBare() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { categories = [], loading } = useSelector((state: RootState) => state.categories);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleCategoryClick = (catId: number) => {
    navigate(`/filtercategory/${catId}`);
    setMobileOpen(false);
  };

  return (
    <div className="w-full md:w-auto p-4 md:p-0">

      <div className="md:hidden w-full">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between px-4 py-6 text-sm font-medium border-gray-200 shadow-sm rounded-xl">
              <span className="flex items-center gap-2.5">
                <Menu className="w-5 h-5 text-muted-foreground" />
                Browse Categories
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-[350px] p-0 flex flex-col gap-0 bg-background border-r">
            <SheetHeader className="px-5 py-4 border-b border-border text-left">
              <SheetTitle className="text-lg font-bold tracking-tight text-foreground">Categories</SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1 py-2">
              {loading ? (
                <div className="px-5 py-3 space-y-5">
                  {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-4 w-32" />)}
                </div>
              ) : (
                <ul className="px-2 space-y-0.5">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategoryClick(cat.id)}
                        className="w-full text-left px-3 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                      >
                        {cat.categoryName}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block relative w-54 bg-background">
        {loading ? (
          <div className="space-y-1 p-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="flex items-center justify-between px-3.5 py-2.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-3 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-0.5">
            {categories.map((cat) => (
              <li
                key={cat.id}
                className="relative"
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-all duration-150
                    ${hoveredId === cat.id ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/60"}`}
                >
                  <span className="text-sm tracking-wide">{cat.categoryName}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}