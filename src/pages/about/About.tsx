import {
  Coins,
  DollarSign,
  ShoppingBag,
  Store
} from 'lucide-react';
import { useEffect } from 'react';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getImageUrl } from "../../lib/utils";
import 'swiper/css';
import 'swiper/css/pagination';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Card from '../../components/shared/Card';

export default function AboutPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,     
    });
  }, []);

  const celebrities = [
    {
      id: 1,
      name: "Tom Cruise",
      role: "Founder & Chairman",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Emma Watson",
      role: "Managing Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Will Smith",
      role: "Product Designer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Selena Gomez",
      role: "Marketing Head",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <main className="w-full bg-background text-foreground font-sans min-h-screen overflow-x-hidden">
      
      <div className="max-w-[1170px] mx-auto px-4 md:px-8 pt-8 text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">Home</span> / <span className="text-foreground font-medium">About</span>
      </div>

      <section className="max-w-[1170px] mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col md:flex-row gap-10 items-center justify-between">
        <div className="space-y-6 w-full md:w-[48%] max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider">Our Story</h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Launched in 2015, Exclusive is South Asia's premier online shopping 
            marketplace with an active presence in Bangladesh. Supported by 
            wide range of tailored marketing, data and service solutions, 
            Exclusive has 10,500 sellers and 300 brands and serves 3 
            millions customers across the region.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Exclusive has more than 1 Million products to offer, growing at a 
            very fast. Exclusive offers a diverse assortment in categories 
            ranging from consumer.
          </p>
        </div>
        <div className="w-full md:w-[48%] h-[400px] md:h-[500px]">
          <img 
            src={getImageUrl("https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop")} 
            alt="Two women smiling with colorful shopping bags" 
            className="w-full h-full object-cover rounded-sm grayscale-[0.2] dark:grayscale-[0.4]"
          />
        </div>
      </section>

      <section className="max-w-[1170px] mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap gap-6 justify-between">
          
          <div className="w-full sm:w-[48%] md:w-[23%] border border-border rounded p-6 flex flex-col items-center justify-center text-center group hover:bg-[#DB4444] hover:border-[#DB4444] transition-all duration-300">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center border-8 border-accent group-hover:bg-white/20 group-hover:border-white/10 transition-colors">
              <Store className="w-6 h-6 text-foreground group-hover:text-white" />
            </div>
            <span className="text-3xl font-bold mt-4 tracking-wider group-hover:text-white">10.5k</span>
            <p className="text-sm text-muted-foreground mt-2 group-hover:text-white">Sellers active our site</p>
          </div>

          <div className="w-full sm:w-[48%] md:w-[23%] bg-[#DB4444] border border-[#DB4444] rounded p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-8 border-white/10">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold mt-4 tracking-wider text-white">33k</span>
            <p className="text-sm text-white mt-2">Monthly Product Sale</p>
          </div>

          <div className="w-full sm:w-[48%] md:w-[23%] border border-border rounded p-6 flex flex-col items-center justify-center text-center group hover:bg-[#DB4444] hover:border-[#DB4444] transition-all duration-300">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center border-8 border-accent group-hover:bg-white/20 group-hover:border-white/10 transition-colors">
              <ShoppingBag className="w-6 h-6 text-foreground group-hover:text-white" />
            </div>
            <span className="text-3xl font-bold mt-4 tracking-wider group-hover:text-white">45.5k</span>
            <p className="text-sm text-muted-foreground mt-2 group-hover:text-white">Customer active in our site</p>
          </div>

          <div className="w-full sm:w-[48%] md:w-[23%] border border-border rounded p-6 flex flex-col items-center justify-center text-center group hover:bg-[#DB4444] hover:border-[#DB4444] transition-all duration-300">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center border-8 border-accent group-hover:bg-white/20 group-hover:border-white/10 transition-colors">
              <Coins className="w-6 h-6 text-foreground group-hover:text-white" />
            </div>
            <span className="text-3xl font-bold mt-4 tracking-wider group-hover:text-white">25k</span>
            <p className="text-sm text-muted-foreground mt-2 group-hover:text-white">Anual gross sale in our site</p>
          </div>

        </div>
      </section>

    
      <section 
        className="max-w-[1170px] mx-auto px-4 md:px-8 py-16 custom-swiper-container"
        data-aos="fade-up" 
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={32}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-16"
          loop={true}
        >
          {celebrities.map((member) => (
            <SwiperSlide key={member.id}>
              <div className="flex flex-col w-full">
                <div className="bg-muted rounded-t flex justify-center items-end h-[430px] pt-8">
                  <img 
                    src={getImageUrl(member.image)} 
                    alt={member.name} 
                    className="max-h-full object-contain dark:opacity-80 transition-opacity" 
                  />
                </div>
                <div className="pt-6 space-y-2">
                  <h3 className="text-2xl font-bold tracking-wide">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  
                  <div className="flex items-center gap-4 pt-1">
                    <a href="#twitter" className="text-foreground hover:text-muted-foreground" aria-label="Twitter">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a href="#instagram" className="text-foreground hover:text-muted-foreground" aria-label="Instagram">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#linkedin" className="text-foreground hover:text-muted-foreground" aria-label="LinkedIn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style dangerouslySetInnerHTML={{__html: `
          .custom-swiper-container .swiper-pagination-bullet {
            background: #D1D5DB !important;
            opacity: 1 !important;
            width: 12px !important;
            height: 12px !important;
          }
          .custom-swiper-container .swiper-pagination-bullet-active {
            background: #DB4444 !important;
            outline: 1px solid #9CA3AF !important;
            border: 2px solid #FFFFFF !important;
          }
        `}} />
      </section>

     <Card />

    </main>
  );
}