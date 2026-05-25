import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

interface CountdownTime {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export default function Flashsales() {
    const { t } = useTranslation();
    const [timeLeft, setTimeLeft] = useState<CountdownTime>({
        days: 3,
        hours: 23,
        minutes: 19,
        seconds: 56,
    })

    useEffect(() => {
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

    const formatNumber = (num) => {
        return num.toString().padStart(2, "0")
    }

    return (
        <div className="flex flex-col gap-6 font-sans select-none">
            <div className="flex items-center gap-4">
                <div className="w-5 h-10 bg-[#DB4444] rounded" />
                <span className="text-[#DB4444] font-semibold text-base leading-none">{t('home.todays')}</span>
            </div>

            <div className="flex lg:flex-row lg:items-end flex-col gap-5 lg:gap-12">
                <h2 className="text-4xl font-bold tracking-wider text-foreground leading-none">{t('home.flash_sales')}</h2>

                <div className="flex items-center gap-4 h-12">
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-foreground mb-1">{t('home.days')}</span>
                        <span className="text-3xl font-bold tracking-wider text-foreground leading-none">
                            {formatNumber(timeLeft.days)}
                        </span>
                    </div>

                    <span className="text-2xl font-bold text-[#E07575] self-end mb-1">:</span>

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-foreground mb-1">{t('home.hours')}</span>
                        <span className="text-3xl font-bold tracking-wider text-foreground leading-none">
                            {formatNumber(timeLeft.hours)}
                        </span>
                    </div>

                    <span className="text-2xl font-bold text-[#E07575] self-end mb-1">:</span>

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-foreground mb-1">{t('home.minutes')}</span>
                        <span className="text-3xl font-bold tracking-wider text-foreground leading-none">
                            {formatNumber(timeLeft.minutes)}
                        </span>
                    </div>

                    <span className="text-2xl font-bold text-[#E07575] self-end mb-1">:</span>

                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-foreground mb-1">{t('home.seconds')}</span>
                        <span className="text-3xl font-bold tracking-wider text-foreground leading-none">
                            {formatNumber(timeLeft.seconds)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}