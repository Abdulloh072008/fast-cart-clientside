import * as React from "react"
import AOS from "aos"
import { Button } from "../../components/ui/button"
import "aos/dist/aos.css"
import bg from "../../assets/img/Frame 694-1.png"

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Bgtime() {
  const [timeLeft, setTimeLeft] = React.useState<CountdownTime>({
    days: 5,
    hours: 23,
    minutes: 59,
    seconds: 35,
  })

  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true })

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.days === 0 && prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer)
          return prev
        }

        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0")
  }

  return (
    <div className="w-full max-w-[1170px] mx-auto bg-black rounded-none p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden font-sans select-none box-border">
      <div className="flex flex-col items-start w-full md:w-1/2 gap-6 sm:gap-8 order-1 md:order-1">
        <span data-aos="fade-right" className="text-[#00FF66] font-semibold text-sm sm:text-base leading-none">Categories</span>
        
        <h2 data-aos="fade-right" data-aos-delay="100" className="text-3xl lg:text-5xl font-bold text-white  leading-tight">
          Enhance Your <br className="hidden sm:inline" /> Music Experience
        </h2>

        <div data-aos="fade-right" data-aos-delay="200" className="flex items-center gap-3 sm:gap-6">
          <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-background text-foreground border border-border/10">
            <span className="text-sm sm:text-base font-bold leading-none">{formatNumber(timeLeft.hours)}</span>
            <span className="text-[10px] sm:text-xs font-normal mt-0.5">Hours</span>
          </div>
          <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-background text-foreground border border-border/10">
            <span className="text-sm sm:text-base font-bold leading-none">{formatNumber(timeLeft.days)}</span>
            <span className="text-[10px] sm:text-xs font-normal mt-0.5">Days</span>
          </div>
          <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-background text-foreground border border-border/10">
            <span className="text-sm sm:text-base font-bold leading-none">{formatNumber(timeLeft.minutes)}</span>
            <span className="text-[10px] sm:text-xs font-normal mt-0.5">Minutes</span>
          </div>
          <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-background text-foreground border border-border/10">
            <span className="text-sm sm:text-base font-bold leading-none">{formatNumber(timeLeft.seconds)}</span>
            <span className="text-[10px] sm:text-xs font-normal mt-0.5">Seconds</span>
          </div>
        </div>

        <Button data-aos="fade-right" data-aos-delay="300" className="bg-[#00FF66] hover:bg-[#00E05A] text-black font-medium text-base px-8 sm:px-12 py-5 sm:py-6 rounded  transition-colors duration-200">
          Buy Now!
        </Button>
      </div>

      <div data-aos="zoom-in" data-aos-delay="200" className="w-full md:w-1/2 flex items-center justify-center order-2 md:order-2 px-4 sm:px-10 md:px-0">
        <div className="relative w-full  flex items-center justify-center">
          <div className="absolute inset-0 bg-white/10 blur-[80px] sm:blur-[120px] rounded-full scale-75 sm:scale-100" />
          <img src={bg} alt="JBL Speaker" className="relative z-10 w-full h-auto object-contain max-h-[250px] sm:max-h-[350px] md:max-h-[400px]" />
        </div>
      </div>
    </div>
  )
}