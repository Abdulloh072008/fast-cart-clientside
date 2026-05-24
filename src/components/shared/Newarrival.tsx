import sony from "../../assets/img/ps5-slim-goedkope-playstation_large 1.png"
import weman from "../../assets/img/attractive-woman-wearing-hat-posing-black-background 1.png"
import spiker from "../../assets/img/Frame 707.png"
import dukhy from "../../assets/img/Frame 706.png"


export default function Newarrival() {
  return (
    <section className="flex flex-col gap-5 w-full max-w-[1170px] mx-auto font-sans select-none px-4 lg:px-0">
      <div className="flex items-center gap-4">
        <div className="w-5 h-10 bg-[#DB4444] rounded" />
        <span className="text-[#DB4444] font-semibold text-base leading-none">Featured</span>
      </div>

      <div className="w-full mb-3">
        <h2 className="text-4xl font-bold tracking-wider text-foreground leading-none">New Arrival</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-6 w-full h-auto lg:h-[600px]">
        <div className="lg:col-span-2 lg:row-span-2 h-[300px] lg:h-full bg-black bg-cover bg-center bg-no-repeat relative p-6 lg:p-8 flex flex-col justify-end  cursor-pointer" style={{ backgroundImage: `url(${sony})` }}>
          <div className="relative z-10 flex flex-col items-start gap-2 max-w-[270px]">
            <h3 className="text-white text-2xl font-bold tracking-wider">PlayStation 5</h3>
            <p className="text-[#F5F5F5] text-sm font-normal leading-tight">Black and White version of the PS5 coming out on sale.</p>
            <span className="text-white font-medium text-base underline underline-offset-4 hover:text-gray-300 transition-colors mt-2">Shop Now</span>
          </div>
        </div>

        <div className="lg:col-span-2 lg:row-span-1 h-[300px] lg:h-full bg-black bg-cover bg-center bg-no-repeat relative p-6 lg:p-8 flex flex-col justify-end group cursor-pointer" style={{ backgroundImage: `url(${weman})` }}>
          <div className="relative z-10 flex flex-col items-start gap-2 max-w-[270px]">
            <h3 className="text-white text-2xl font-bold tracking-wider">Women's Collections</h3>
            <p className="text-[#F5F5F5] text-sm font-normal leading-tight">Featured woman collections that give you another vibe.</p>
            <span className="text-white font-medium text-base underline underline-offset-4 hover:text-gray-300 transition-colors mt-2">Shop Now</span>
          </div>
        </div>

        <div className="h-[300px] lg:h-full bg-black bg-cover bg-center bg-no-repeat relative p-6 flex flex-col justify-end group cursor-pointer" style={{ backgroundImage: `url(${spiker})` }}>
          <div className="relative z-10 flex flex-col items-start gap-1.5 max-w-[220px]">
            <h3 className="text-white text-xl font-bold tracking-wider">Speakers</h3>
            <p className="text-[#F5F5F5] text-xs font-normal leading-tight">Amazon wireless speakers</p>
            <span className="text-white font-medium text-sm underline underline-offset-4 hover:text-gray-300 transition-colors mt-1.5">Shop Now</span>
          </div>
        </div>

        <div className="h-[300px] lg:h-full bg-black bg-cover bg-center bg-no-repeat relative p-6 flex flex-col justify-end group cursor-pointer" style={{ backgroundImage: `url(${dukhy})` }}>
          <div className="relative z-10 flex flex-col items-start gap-1.5 max-w-[220px]">
            <h3 className="text-white text-xl font-bold tracking-wider">Perfume</h3>
            <p className="text-[#F5F5F5] text-xs font-normal leading-tight">GUCCI INTENSE OUD EDP</p>
            <span className="text-white font-medium text-sm underline underline-offset-4 hover:text-gray-300 transition-colors mt-1.5">Shop Now</span>
          </div>
        </div>
      </div>
    </section>
  )
}