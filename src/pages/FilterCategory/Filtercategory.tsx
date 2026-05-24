import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../api/Productapi";
import Cards from "../../components/shared/Cards";
import FilterSidebar from "./Filtersidebare";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { RootState } from "../../store/store";

export default function FilterCategory() {
  const { categoryId, subCategoryId } = useParams();
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (categories.length > 0 && categoryId) {
      const cat = categories.find(c => String(c.id) === categoryId);
      if (cat) {
        const relevantIds = categories
          .filter(c => c.categoryName === cat.categoryName)
          .map(c => c.id);
        dispatch(getProducts({ categoryId: relevantIds, subCategoryId }));
      } else {
        dispatch(getProducts({ categoryId, subCategoryId }));
      }
    } else if (!categoryId) {
      dispatch(getProducts({ subCategoryId }));
    }
  }, [categoryId, subCategoryId, dispatch, categories]);

  return (
    <div className="mt-20 w-[90%] py-10 lg:max-w-[1170px] mx-auto bg-background text-foreground">
      <div className="text-sm pb-6">
        <p>
          <span className="text-muted-foreground">Home / </span>
          Explore Our Products
        </p>
      </div>

      <div className="flex items-center justify-between mb-4 lg:hidden">
        <p className="text-sm text-muted-foreground">Use filters to narrow results</p>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-border"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-[300px] sm:w-[340px] p-0 flex flex-col gap-0">
            <SheetHeader className="px-5 py-4 border-b border-border text-left">
              <SheetTitle className="text-base font-bold">Filters</SheetTitle>
            </SheetHeader>
            <ScrollArea className="flex-1 py-2">
              <div className="px-5 py-2">
                <FilterSidebar categoryId={categoryId} />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex items-start gap-8">
        <aside className="hidden lg:block shrink-0 w-[240px]">
          <FilterSidebar categoryId={categoryId} />
        </aside>

        <div className="flex-1 min-w-0">
          <Cards />
        </div>
      </div>
    </div>
  );
}