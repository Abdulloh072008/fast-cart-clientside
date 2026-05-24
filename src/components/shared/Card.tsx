import * as React from "react"
import { Truck, Headphones, CheckCircle2 } from "lucide-react"

interface ServiceItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const services: ServiceItem[] = [
  { id: "1", icon: Truck, title: "Free and Fast Delivery", description: "Free delivery for all orders over $140" },
  { id: "2", icon: Headphones, title: "24/7 Customer Service", description: "Friendly 24/7 customer support" },
  { id: "3", icon: CheckCircle2, title: "Money Back Guarantee", description: "We return money within 30 days" },
]

export default function Card() {
  return (
    <section className="max-w-[1170px] mx-auto px-4 lg:px-0 py-16 lg:py-24 font-sans select-none">
      <div className="flex flex-col lg:flex-row gap-12 justify-center text-center">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <div key={service.id} className="flex flex-col items-center space-y-4 w-full lg:w-[30%]">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center border-8 border-muted/50">
                <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-background" />
                </div>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">{service.title}</h3>
              <p className="text-xs text-muted-foreground">{service.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}