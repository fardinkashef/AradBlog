import { Mail, MapPin } from "lucide-react";
import { FaWhatsappSquare } from "react-icons/fa";

import ContactForm from "./_components/ContactForm";
import StaffCard from "./_components/StaffCard";

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
    image: "/staff/Hedyeh.jpg",
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
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-brand-dark text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
              Get in touch with our team of technical, business, and commercial
              marine professionals
            </p>
            <div className="flex flex-col lg:flex-row justify-center flex-wrap gap-6 lg:gap-x-16 mt-12">
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
                <FaWhatsappSquare className="h-8 w-8 text-green-500" />
                <a href="https://wa.me/989981213430">+98 998 121 3430</a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-6 w-6 text-blue-400" />
                <a href="mailto:info@oceanarktech.com">info@oceanarktech.com</a>
              </div>
              {/* <div className="flex items-center justify-center gap-3">
                <Anchor className="h-6 w-6 text-blue-400" />
                <span>Operating in All Iranian Ports & Offshore Waters</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Staff Cards */}
            {staff.map((staffMember) => (
              <StaffCard {...staffMember} key={staffMember.name} />
            ))}
          </div>
        </div>
      </div>
      {/* Contact Form */}
      <div className="my-20">
        <div className="">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-brand-dark text-xl md:text-2xl lg:text-3xl font-bold mb-6">
                Send us a Message
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
                Tell us about your marine service requirements and we&apos;ll
                get back to you promptly.
              </p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
