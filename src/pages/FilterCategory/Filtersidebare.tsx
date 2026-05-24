import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBrands } from "../../api/Brandapi";
import { getProducts } from "../../api/Productapi";
import { getCategories } from "../../api/categoryapi";
import type { AppDispatch, RootState } from "../../store/store";

const INITIAL_SHOW = 5;

interface FilterSidebarProps {
  categoryId?: string;
  onApply?: () => void;
}

export default function FilterSidebar({ categoryId, onApply }: FilterSidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { categories = [] } = useSelector((state: RootState) => state.categories);
  const { brands = [] } = useSelector((state: RootState) => state.brands);

  const uniqueCategories = categories.filter(
    (cat, index, self) => self.findIndex((c) => c.categoryName === cat.categoryName) === index
  );
  const uniqueBrands = brands.filter(
    (brand, index, self) => self.findIndex((b) => b.id === brand.id) === index
  );

  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minInput, setMinInput] = useState("0");
  const [maxInput, setMaxInput] = useState("100000");

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);


  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      if (categoryId) {
        const cat = categories.find(c => String(c.id) === categoryId);
        if (cat) {
          setSelectedCategoryName(cat.categoryName);
        }
      } else {
        setSelectedCategoryName(null);
      }
    }
  }, [categoryId, categories]);

  const handleCategoryClick = (catName: string | null) => {
    setSelectedCategoryName(catName);

    if (catName === null) {
      navigate("/filtercategory");
      dispatch(
        getProducts({
          brandIds: selectedBrands.length ? selectedBrands : undefined,
          colorIds: selectedColors.length ? selectedColors : undefined,
          minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
          maxPrice: priceRange[1] < 100000 ? priceRange[1] : undefined,
        })
      );
    } else {
      const relevantIds = categories
        .filter(c => c.categoryName === catName)
        .map(c => c.id);

      if (relevantIds.length > 0) {
        navigate(`/filtercategory/${relevantIds[0]}`);
      }

      dispatch(
        getProducts({
          categoryId: relevantIds.length > 0 ? relevantIds : undefined,
          brandIds: selectedBrands.length ? selectedBrands : undefined,
          colorIds: selectedColors.length ? selectedColors : undefined,
          minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
          maxPrice: priceRange[1] < 100000 ? priceRange[1] : undefined,
        })
      );
    }
  };

  const toggleBrand = (id: number) => {
    const updated = selectedBrands.includes(id)
      ? selectedBrands.filter((b) => b !== id)
      : [...selectedBrands, id];
    setSelectedBrands(updated);

    const relevantIds = selectedCategoryName
      ? categories.filter(c => c.categoryName === selectedCategoryName).map(c => c.id)
      : undefined;

    dispatch(
      getProducts({
        categoryId: relevantIds,
        brandIds: updated.length ? updated : undefined,
        colorIds: selectedColors.length ? selectedColors : undefined,
        minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
        maxPrice: priceRange[1] < 100000 ? priceRange[1] : undefined,
      })
    );
  };

  const applyFilters = () => {
    const relevantIds = selectedCategoryName
      ? categories.filter(c => c.categoryName === selectedCategoryName).map(c => c.id)
      : undefined;

    dispatch(
      getProducts({
        categoryId: relevantIds,
        brandIds: selectedBrands.length ? selectedBrands : undefined,
        colorIds: selectedColors.length ? selectedColors : undefined,
        minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
        maxPrice: priceRange[1] < 100000 ? priceRange[1] : undefined,
      })
    );
    onApply?.();
  };

  const clearFilters = () => {
    setSelectedCategoryName(null);
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 100000]);
    setMinInput("0");
    setMaxInput("100000");
    navigate("/filtercategory");
    dispatch(getProducts({}));
  };

  const handleSliderChange = (val: number[]) => {
    setPriceRange([val[0], val[1]]);
    setMinInput(String(val[0]));
    setMaxInput(String(val[1]));
  };

  const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setMinInput(raw);
    const val = Number(raw);
    if (!isNaN(val) && val >= 0 && val <= priceRange[1]) {
      setPriceRange([val, priceRange[1]]);
    }
  };

  const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setMaxInput(raw);
    const val = Number(raw);
    if (!isNaN(val) && val >= priceRange[0]) {
      setPriceRange([priceRange[0], val]);
    }
  };

  const activeFilterCount =
    selectedBrands.length +
    selectedColors.length +
    (priceRange[0] > 0 || priceRange[1] < 100000 ? 1 : 0);

  // Determine which categories/brands to show
  const visibleCategories = showAllCategories
    ? uniqueCategories
    : uniqueCategories.slice(0, INITIAL_SHOW);
  const visibleBrands = showAllBrands
    ? uniqueBrands
    : uniqueBrands.slice(0, INITIAL_SHOW);

  return (
    <div className="w-full lg:w-[240px]">
      <div className="hidden lg:flex items-center justify-between mb-2">
        <h2 className="text-base font-bold">Filters</h2>
        {(activeFilterCount > 0 || selectedCategoryName !== null) && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#DB4444] hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>
      {(activeFilterCount > 0 || selectedCategoryName !== null) && (
        <div className="lg:hidden flex justify-end mb-2">
          <button
            onClick={clearFilters}
            className="text-xs text-[#DB4444] hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        </div>
      )}

      <Accordion
        type="multiple"
        defaultValue={["category", "brand", "features", "price", "condition", "rating"]}
        className="w-full"
      >
        <AccordionItem value="category" className="border-b border-border">
          <AccordionTrigger className="text-sm font-semibold py-3 hover:no-underline">
            Category
          </AccordionTrigger>
          <AccordionContent className="pb-3">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors ${selectedCategoryName === null
                  ? "text-[#DB4444] font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
              >
                All products
              </button>

              {uniqueCategories.length === 0 ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 w-28 bg-muted animate-pulse rounded mx-2 my-2" />
                ))
              ) : (
                <>
                  {(showAllCategories ? uniqueCategories : uniqueCategories.slice(0, INITIAL_SHOW)).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.categoryName)}
                      className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors ${selectedCategoryName === cat.categoryName
                        ? "text-[#DB4444] font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                    >
                      {cat.categoryName}
                    </button>
                  ))}

                  {uniqueCategories.length > INITIAL_SHOW && (
                    <button
                      onClick={() => setShowAllCategories((prev) => !prev)}
                      className="w-full text-left text-xs text-[#DB4444] font-medium px-2 py-1.5 hover:underline transition-colors"
                    >
                      {showAllCategories ? "See less" : `See all (${uniqueCategories.length})`}
                    </button>
                  )}
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand" className="border-b border-border">
          <AccordionTrigger className="text-sm font-semibold py-3 hover:no-underline">
            Brands
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-2">
            {uniqueBrands.length === 0 ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-24 bg-muted animate-pulse rounded" />
              ))
            ) : (
              <div className="flex flex-col gap-2">
                {(showAllBrands ? uniqueBrands : uniqueBrands.slice(0, INITIAL_SHOW)).map((brand) => (
                  <label
                    key={brand.id}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <Checkbox
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={() => toggleBrand(brand.id)}
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {brand.brandName}
                    </span>
                  </label>
                ))}

                {uniqueBrands.length > INITIAL_SHOW && (
                  <button
                    onClick={() => setShowAllBrands((prev) => !prev)}
                    className="text-xs text-[#DB4444] font-medium px-0.5 hover:underline transition-colors text-left"
                  >
                    {showAllBrands ? "See less" : `See all (${uniqueBrands.length})`}
                  </button>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-b border-border">
          <AccordionTrigger className="text-sm font-semibold py-3 hover:no-underline">
            Price range
          </AccordionTrigger>
          <AccordionContent className="pb-4 space-y-4">
            <Slider
              min={0}
              max={100000}
              step={100}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handleSliderChange}
              className="w-full"
            />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={minInput}
                onChange={handleMinInput}
                className="h-8 text-sm"
                placeholder="Min"
                min={0}
                max={priceRange[1]}
              />
              <span className="text-muted-foreground text-sm">–</span>
              <Input
                type="number"
                value={maxInput}
                onChange={handleMaxInput}
                className="h-8 text-sm"
                placeholder="Max"
                min={priceRange[0]}
                max={100000}
              />
            </div>
            <Button
              onClick={applyFilters}
              size="sm"
              className="w-full bg-[#DB4444] hover:bg-[#c03b3b] text-white"
            >
              Apply
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="condition" className="border-b border-border">
          <AccordionTrigger className="text-sm font-semibold py-3 hover:no-underline">
            Condition
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-2">
            {["Any", "Refurbished", "Brand new", "Old items"].map((c) => (
              <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
                <Checkbox defaultChecked={c === "Any"} />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {c}
                </span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating" className="border-none">
          <AccordionTrigger className="text-sm font-semibold py-3 hover:no-underline">
            Ratings
          </AccordionTrigger>
          <AccordionContent className="pb-3 space-y-2">
            {[5, 4, 3, 2, 1].map((r) => (
              <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
                <Checkbox />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 ${i < r
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted-foreground/30"
                        }`}
                      viewBox="0 0 24 24"
                    >
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </div>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}