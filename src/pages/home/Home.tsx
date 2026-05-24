import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getProducts } from "../../api/Productapi";
import ProductCard from "../../components/shared/Productcards";
import SideBare from "../../components/shared/SideBare";
import Swipers from "../../components/shared/Swipers";
import Flashsales from "../../components/shared/Flashsales";
import { Button } from "../../components/ui/button";
import Searchcategory from "../../components/shared/Searchcategory";
import Bgtime from "../../components/shared/Bgtime";
import Cards from "../../components/shared/Cards";
import Newarrival from "../../components/shared/Newarrival";
import Card from "../../components/shared/Card";
import { Link } from "react-router-dom";

const Home = () => {

  const dispatch = useDispatch()
  const products = useSelector(({ products }) => products.products);


  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);


  return (
    <>
      <main className="my-20">
        <section className="max-w-[1170px] m-auto w-[90%] flex flex-col lg:flex-row justify-between py-10">
          <div>
            <SideBare />
          </div>
          <hr className="border lg:h-83 lg:mt-0 mt-5" />
          <div>
            <Swipers />
          </div>
        </section>

        <section className="max-w-[1170px] m-auto w-[90%]">
          <Flashsales />
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            loop={true}
          >
            {products
              .filter((product) => product.hasDiscount)
              .map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
          </Swiper>

          <div className="mt-10">
            <Link to={"/filtercategory"}>
              <Button className="bg-[#DB4444] px-20 py-6  lg:m-auto lg:flex">View All Products</Button>
            </Link>
          </div>
        </section>
        <hr className="max-w-[1170px] border lg:w-full m-auto w-[90%] my-15" />
        <section className="max-w-[1170px] m-auto w-[90%]">
          <Searchcategory />
        </section>

        <hr className="max-w-[1170px] border lg:w-full m-auto w-[90%] my-15" />

        <section className="max-w-[1170px] m-auto w-[90%]">
          <div className="flex flex-col gap-4 sm:gap-5 w-full max-w-[1170px] mx-auto font-sans select-none px-4 md:px-6 lg:px-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-4 sm:w-5 h-8 sm:h-10 bg-[#DB4444] rounded" />
              <span className="text-[#DB4444] font-semibold text-sm sm:text-base leading-none">This Month</span>
            </div>

            <div className="flex lg:items-center gap-5 items-start flex-col lg:flex-row justify-between w-full">
              <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-foreground leading-none">Best Selling Products</h2>
              <Button className="bg-[#DB4444] hover:bg-[#C23B3B] text-white font-medium text-xs  lg:text-base px-6 sm:px-10 py-4  lg:py-6  rounded transition-colors duration-200">
                View All
              </Button>
            </div>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            loop={true}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="mt-10">
          <Bgtime />
        </section>

        <section className="max-w-[1170px] m-auto w-[90%] mt-15">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-4 sm:w-5 h-8 sm:h-10 bg-[#DB4444] rounded" />
            <span className="text-[#DB4444] font-semibold text-sm sm:text-base leading-none">Our Products</span>
          </div>
          <h2 className="mb-5 mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-foreground leading-none">Explore Our Products</h2>

          <Cards limit={8} />

          <Link to="/filtercategory">
            <Button className="bg-[#DB4444] px-10 py-6 m-auto mt-10 flex ">View All Products</Button>
          </Link>
        </section>

        <section className="mt-10">
          <Newarrival />
        </section>

        <section>
          <Card />
        </section>
      </main>
    </>
  );
};

export default Home;
