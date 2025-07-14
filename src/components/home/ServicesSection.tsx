import {
  Anchor,
  ArrowRight,
  FileCheck,
  Handshake,
  Lightbulb,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const services = [
  {
    icon: Search,
    title: "Marine Inspection & Surveys",
  },
  {
    icon: FileCheck,
    title: "Technical Compliance & Documentation",
  },
  {
    icon: Anchor,
    title: "Port & Offshore Support",
  },
  {
    icon: Lightbulb,
    title: "Marine Consultancy",
  },
  {
    icon: Handshake,
    title: "Marine Trade & Brokerage Support",
  },
];
export default function ServicesSection() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-5xl mx-auto p-6 py-20 text-brand-dark">
        <h2 className="text-4xl font-semibold mb-6">
          Specialized Services For Complex Maritime Needs
        </h2>
        <p className="text-xl mb-6">
          From technical inspections to commercial coordination, our services
          are designed to support shipowners, operators, and maritime
          stakeholders with precision, responsiveness, and local expertise —
          both in port and at sea.
        </p>
        <div className="w-full p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card
                  key={index}
                  className="bg-white p-0 transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <Link href="/" className="flex items-center gap-4 p-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center">
                        <IconComponent className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-800 font-medium text-sm leading-relaxed">
                        {service.title}
                      </h3>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-lg">
              More about our services <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
