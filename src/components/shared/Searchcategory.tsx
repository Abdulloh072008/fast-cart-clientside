import * as React from "react"
import { ArrowLeft, ArrowRight, Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2 } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import { Button } from "@/components/ui/button"
import "swiper/css"
import "swiper/css/navigation"

interface Category {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

const categories: Category[] = [
  { id: "1", name: "Phones", icon: Smartphone },
  { id: "2", name: "Computers", icon: Monitor },
  { id: "3", name: "SmartWatch", icon: Watch },
  { id: "4", name: "Camera", icon: Camera },
  { id: "5", name: "HeadPhones", icon: Headphones },
  { id: "6", name: "Gaming", icon: Gamepad2 },
  { id: "7", name: "Audio", icon: Headphones },
  { id: "8", name: "Consoles", icon: Gamepad2 },
]

export default function Searchcategory() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-[1170px] mx-auto font-sans select-none px-4 md:px-6 lg:px-0">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="w-4 sm:w-5 h-8 sm:h-10 bg-[#DB4444] rounded" />
        <span className="text-[#DB4444] font-semibold text-sm sm:text-base leading-none">Categories</span>
      </div>

      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-foreground leading-none">Browse By Category</h2>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button variant="secondary" size="icon" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-secondary text-foreground hover:bg-secondary/80 prev-btn border-none">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button variant="secondary" size="icon" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full bg-secondary text-foreground hover:bg-secondary/80 next-btn border-none">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>

      <div className="w-full pt-2 sm:pt-3">
        <Swiper modules={[Navigation, Autoplay]} spaceBetween={16}  loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }} breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 },1280: { slidesPerView: 6, spaceBetween: 30 } }}>
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <SwiperSlide key={`${category.id}-${index}`}>
                <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full h-[110px] sm:h-[130px] lg:h-[145px] rounded border border-border bg-background text-foreground transition-colors duration-200 cursor-pointer hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white group">
                  <Icon className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 stroke-[1.25]" />
                  <span className="text-xs sm:text-sm lg:text-base font-normal">{category.name}</span>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}