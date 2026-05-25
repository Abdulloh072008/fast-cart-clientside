import { Phone, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="w-[90%] max-w-[1170px] mx-auto">
        <nav className="mb-20 text-sm">
          <span className="text-muted-foreground">Home</span>
          <span className="text-muted-foreground mx-3">/</span>
          <span className="text-foreground">Contact</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          <div className="bg-card rounded-sm shadow-[0_1px_13px_rgba(0,0,0,0.05)] p-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[hsl(0,73%,57%)] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" fill="white" />
                </div>
                <h3 className="text-base font-medium">Call To Us</h3>
              </div>
              <p className="text-sm mb-4">We are available 24/7, 7 days a week.</p>
              <p className="text-sm">Phone: +8801611112222</p>
            </div>

            <div className="h-px bg-border my-8" />

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[hsl(0,73%,57%)] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-medium">Write To US</h3>
              </div>
              <p className="text-sm mb-4">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-sm mb-2">Emails: customer@exclusive.com</p>
              <p className="text-sm">Emails: support@exclusive.com</p>
            </div>
          </div>

          <div className="bg-card rounded-sm shadow-[0_1px_13px_rgba(0,0,0,0.05)] p-8">
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Name" className="bg-secondary/50 border-0 h-12" />
                <Input placeholder="Email" className="bg-secondary/50 border-0 h-12" />
                <Input placeholder="Phone" className="bg-secondary/50 border-0 h-12" />
              </div>
              <Textarea
                placeholder="Your Massage"
                className="bg-secondary/50 border-0 min-h-[200px] resize-none"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-[hsl(0,73%,57%)] hover:bg-[hsl(0,73%,52%)] text-white h-12 px-12 rounded-sm"
                >
                  Send Massage
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
