import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ContactForm from "./_components/ContactForm";

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
                <span>+98 21 1234 5678</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="h-6 w-6 text-blue-400" />
                <span>info@oceanark.ir</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Lead Inspector Profile */}
            <div className="space-y-8">
              <Card>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    Lead Inspector
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="relative w-48 h-48 mx-auto">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Lead Inspector"
                      fill
                      className="rounded-full object-cover border-4 border-blue-100"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-slate-800">
                      Captain Arad Aminikhah
                    </h3>
                    <p className="text-slate-600 font-medium">
                      Chief Marine Inspector & Technical Consultant
                    </p>
                    <div className="flex items-center justify-center gap-2 text-blue-600">
                      <Mail className="h-5 w-5" />
                      <a
                        href="mailto:a.hosseini@oceanark.ir"
                        className="hover:underline font-medium"
                      >
                        a.hosseini@oceanark.ir
                      </a>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      With over 15 years of experience in marine inspections and
                      offshore operations, Captain Hosseini leads our technical
                      team in delivering comprehensive marine solutions across
                      Iranian waters.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

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
