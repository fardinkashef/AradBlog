import { Anchor, Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "./_components/ContactForm";
import StaffCard from "./_components/StaffCard";
import { Card } from "@/components/ui/card";

const staff = [
  {
    position: "Principal Marine Surveyor",
    name: "Arad Aminikhah",
    tel: "+98 998 121 3430",
    email: "arad@oceanarktech.com",
    image: "/staff/Arad.jpg",
  },
  {
    position: "Business Development Manager",
    name: "Hedyeh Rostamian",
    tel: "+98 917 775 5120",
    email: "hedyeh@oceanarktech.com",
    image: "/staff/Arad.jpg",
  },
  {
    position: "Commercial Manager",
    name: "Mohammadreza Aminikhah",
    tel: "+98 917 778 3577",
    email: "mreza@oceanarktech.com",
    image: "/staff/Arad.jpg",
  },
];
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-slate-300 mb-8">
              Get in touch with our team of technical, business, and commercial
              marine professionals
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* <Card className="flex flex-col justify-center gap-12 text-xl">
              <div className="flex items-center justify-center gap-3">
                <MapPin className="h-6 w-6 text-blue-400" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bushehr%2C+Iran"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Head Office in Bushehr, Iran
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Anchor className="h-6 w-6 text-blue-400" />
                <span>Operating in All Iranian Ports & Offshore Waters</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="h-6 w-6 text-blue-400" />
                <a href="tel:+98 998 121 3430">+98 998 121 3430</a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-6 w-6 text-blue-400" />
                <a href="mailto:info@oceanarktech.com">info@oceanarktech.com</a>
              </div>
            </Card> */}
            <Card className="p-8">
              <div className=" space-y-6 mx-auto flex flex-col gap-6 text-lg">
                {/* Location */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-slate-900 mb-1">
                      Head Office
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Bushehr, Iran
                    </p>
                  </div>
                </div>

                {/* Operations */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                    <Anchor className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-slate-900 mb-1">
                      Operations
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      All Iranian Ports & Offshore Waters
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-slate-900 mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+989981213430"
                      className="text-slate-600 hover:text-green-600 transition-colors font-mono"
                    >
                      +98 998 121 3430
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-slate-900 mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:info@oceanarktech.com"
                      className="text-slate-600 hover:text-purple-600 transition-colors break-all"
                    >
                      info@oceanarktech.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>
            {/* Staff Cards */}
            {staff.map((staffMember) => (
              <StaffCard {...staffMember} key={staffMember.name} />
            ))}
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
