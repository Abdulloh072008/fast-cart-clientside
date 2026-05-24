import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img from "../../assets/img/hero_endframe__cvklg0xk3w6e_large 2-1.png";

import "swiper/css";
import "swiper/css/pagination";

const slidesData = [
  {
    id: 1,
    brand: "Apple",
    series: "iPhone 14 Series",
    discount: "Up to 10% off Voucher",
    link: "/shop/iphone",
    imgSrc: img,
    imgAlt: "iPhone 14 Pro Max",
    brandLogo: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.58 2.95-1.39z"/>
      </svg>
    )
  },
  {
    id: 2,
    brand: "Samsung",
    series: "Galaxy S23 Series",
    discount: "Up to 15% off Voucher",
    link: "/shop/samsung",
    imgSrc: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    imgAlt: "Samsung Galaxy S23 Ultra",
    brandLogo: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white object-contain" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 14.5c0-1.93 4.48-3.5 10-3.5s10 1.57 10 3.5-4.48 3.5-10 3.5-10-1.57-10-3.5zm1.5 0c0 .97 3.8 1.75 8.5 1.75s8.5-.78 8.5-1.75-3.8-1.75-8.5-1.75-8.5.78-8.5 1.75zM5 14.5c0 .41 3.13.75 7 .75s7-.34 7-.75-3.13-.75-7-.75-7 .34-7 .75z" opacity="0.15"/>
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="3.8" fontWeight="900" fontFamily="sans-serif" letterSpacing="-0.2">SAMSUNG</text>
      </svg>
    )
  },
  {
    id: 3,
    brand: "Xiaomi",
    series: "Xiaomi 13 Series",
    discount: "Up to 20% off Voucher",
    link: "/shop/xiaomi",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBkrSqCrLOXmbkXa4xcUm7OwryVuOZTVNOAw&s",
    imgAlt: "Xiaomi 13 Pro",
    brandLogo: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 2h20v20H2V2zm3.5 14.5h2.2v-5.3c0-.8.4-1.2 1-1.2.7 0 1 .4 1 1.2v5.3h2.2v-5.3c0-.8.4-1.2 1-1.2.7 0 1 .4 1 1.2v5.3H16v-5.8c0-1.9-1.1-3.1-2.9-3.1-1.2 0-2.2.6-2.7 1.5-.4-.9-1.4-1.5-2.7-1.5-1.7 0-2.9 1.2-3.1 3.1h-.1V9.2H3.5v7.3h2z"/>
      </svg>
    )
  }
];

export default function Swipers() {
  return (
    <div className="w-full lg:w-[892px] bg-black text-white relative overflow-hidden font-sans">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          el: ".custom-swiper-pagination",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id} className="w-full ">
            <div className="flex flex-col sm:flex-row items-center justify-between  pt-8 pb-14 sm:py-4  px-6 sm:px-10  gap-6 sm:gap-4">
              
              <div className="  flex flex-col justify-center items-start text-left space-y-3 sm:space-y-4 md:space-y-5 z-10">
                <div className="flex items-center gap-2 sm:gap-3 h-10">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center shrink-0">
                    {slide.brandLogo}
                  </div>
                  <p className="text-sm sm:text-sm md:text-base font-normal text-gray-200 pt-1">
                    {slide.series}
                  </p>
                </div>
                
                <h2 className="text-3xl sm:text-3xl md:text-5xl font-semibold tracking-wide leading-[1.2] w-[290px] sm:max-w-xs md:max-w-md">
                  {slide.discount}
                </h2>
                
                <div className="pt-2 sm:pt-4">
                  <a 
                    href={slide.link} 
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-medium border-b border-white/60 pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors group"
                  >
                    Shop Now
                    <svg 
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="w-full sm:w-1/2 flex items-center justify-center sm:justify-end mt-4 sm:mt-0">
                <img 
                  src={slide.imgSrc} 
                  alt={slide.imgAlt} 
                  className=" sm:w-auto h-auto sm:h-[220px] md:h-[300px] object-contain drop-shadow-[0_20px_20px_rgba(255,255,255,0.05)]"
                />
              </div>

            </div>
          </SwiperSlide>
        ))}

        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center custom-swiper-pagination" />
      </Swiper>

      <style>{`
        .custom-swiper-pagination {
          left: 0 !important;
          right: 0 !important;
          margin: 0 auto !important;
          width: 100% !important;
        }
        .custom-swiper-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #808080;
          opacity: 1;
          margin: 0 4px !important;
          transition: all 0.3s ease;
          border-radius: 50%;
        }
        @media (min-width: 640px) {
          .custom-swiper-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            margin: 0 5px !important;
          }
        }
        .custom-swiper-pagination .swiper-pagination-bullet-active {
          background: #DB4444;
          outline: 2px solid #FFFFFF;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}