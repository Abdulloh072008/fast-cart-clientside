import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Smartphone, Monitor, Watch, Camera, Headphones,
  Gamepad2, Volume2, ShoppingBag, Building2
} from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"
import type { AppDispatch, RootState } from "../../store/store"
import { getBrands } from "../../api/Brandapi"
import { useTranslation } from "react-i18next"

const BRAND_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  apple: Watch,
  samsung: Smartphone,
  sony: Monitor,
  lg: Monitor,
  huawei: Smartphone,
  readmi: Smartphone,
  xiaomi: Smartphone,
  nike: ShoppingBag,
  adidas: ShoppingBag,
}

function getBrandIcon(name: string) {
  const key = name.toLowerCase()
  for (const [k, Icon] of Object.entries(BRAND_ICONS)) {
    if (key.includes(k)) return Icon
  }
  return Building2
}

function dedupBrands<T extends { brandName: string }>(brands: T[]): T[] {
  const seen = new Set<string>()
  return brands.filter(b => {
    const k = b.brandName.toLowerCase()
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

export default function BrowseByBrand() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>()
  const { brands, loading, error } = useSelector((state: RootState) => state.brands)

  useEffect(() => {
    dispatch(getBrands())
  }, [dispatch])

  const uniqueBrands = dedupBrands(brands)

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-[1170px] mx-auto font-sans select-none px-4 md:px-6 lg:px-0">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-4 sm:w-5 h-8 sm:h-10 bg-[#DB4444] rounded" />
        <span className="text-[#DB4444] font-semibold text-sm sm:text-base leading-none">{t('nav.brands')}</span>
      </div>

      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-foreground leading-none">
          {t('home.browse_by_brand')}
        </h2>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button variant="secondary" size="icon" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full prev-brand-btn">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button variant="secondary" size="icon" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full next-brand-btn">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>

      <div className="w-full pt-2 sm:pt-3">
        {loading && <p className="text-muted-foreground text-sm">{t('common.loading')}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {!loading && !error && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            loop={uniqueBrands.length > 6}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{ prevEl: ".prev-brand-btn", nextEl: ".next-brand-btn" }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1280: { slidesPerView: 6, spaceBetween: 30 },
            }}
          >
            {uniqueBrands.map((brand) => {
              const Icon = getBrandIcon(brand.brandName)
              return (
                <SwiperSlide key={brand.id}>
                  <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full h-[110px] sm:h-[130px] lg:h-[145px] rounded border border-border bg-background text-foreground transition-colors duration-200 cursor-pointer hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white group">
                    <Icon className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 stroke-[1.25]" />
                    <span className="text-xs sm:text-sm lg:text-base font-normal">{brand.brandName}</span>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
      </div>
    </div>
  )
}