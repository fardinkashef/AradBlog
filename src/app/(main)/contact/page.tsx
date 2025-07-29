import { Mail, MapPin, Phone } from "lucide-react";

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
              Get in touch with our marine technical experts for specialized
              solutions
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center justify-center gap-3">
                <MapPin className="h-6 w-6 text-blue-400" />
                <span>Bushehr, Iran</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="h-6 w-6 text-blue-400" />
                <a href="tel:+98 998 121 3430">+98 998 121 3430</a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-6 w-6 text-blue-400" />
                <a href="mailto:info@oceanarktech.com">info@oceanarktech.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
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
