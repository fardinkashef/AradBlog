"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Anchor, FileCheck, Handshake, Lightbulb, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const services = [
  {
    title: "Marine Inspection & Surveys",
    icon: Search,
    subServices: [
      "Pre-Purchase Inspection",
      "On-Hire / Off-Hire Survey",
      "Condition Survey",
      "Draught Survey",
      "Third-Party Marine Surveys",
      "Bunker Survey",
      "Hull & Machinery Damage Assessment",
      "Ship Accident Investigation",
    ],
  },
  {
    title: "Technical Compliance & Documentation",
    icon: FileCheck,
    subServices: [
      "P&I Condition Surveys & Reporting",
      "Class & Flag Liaison Support",
      "SMS / ISM Documentation Advisory",
      "Port State Compliance Review",
    ],
  },
  {
    title: "Port & Offshore Support",
    icon: Anchor,
    subServices: [
      "Local Attendance in Iranian Ports",
      "Offshore Inspection & Marine Supervision",
      "Ship Repair Superintendence",
      "Crew Liaison & Port Coordination",
      "Emergency Response Support",
      "Pre-arrival Advisory Services",
    ],
  },
  {
    title: "Marine Consultancy",
    icon: Lightbulb,
    subServices: [
      "Marine Technical Consultancy",
      "Technical Report Review & Editing",
      "Internal Audits & System Review",
      "Document Preparation",
    ],
  },
  {
    title: "Marine Trade & Brokerage Support",
    icon: Handshake,
    subServices: [
      "Cargo Sourcing & Buyer Matching",
      "Shipping Line Coordination",
      "Port Access Representation",
      "Regional Client Development",
      "On-Demand Vessel & Cargo Support",
    ],
  },
];

export default function ServicesAccordion() {
  const [activeAccordionItem, setActiveAccordionItem] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    // The fragment identifier is available via window.location.hash
    // usePathname doesn't directly expose the hash, so we use window.location
    const fragment = window.location.hash.substring(1); // Remove the '#'
    if (fragment) {
      setActiveAccordionItem(fragment);
    }
  }, []);

  return (
    <Accordion
      type="single"
      collapsible
      className="p-4 max-w-4xl mx-auto mb-20"
      value={activeAccordionItem}
      onValueChange={setActiveAccordionItem}
    >
      {services.map((service, index) => (
        <AccordionItem
          value={`service${index + 1}`}
          key={service.title}
          className="shadow-md hover:shadow-lg transition-all duration-300"
          id={`service${index + 1}`}
        >
          <AccordionTrigger className="flex items-center gap-4 p-6">
            <div className="p-3 bg-blue-100 rounded-lg">
              <service.icon className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xl text-slate-800 grow">{service.title}</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="grid gap-2 md:grid-cols-2 max-w-3xl mx-auto pl-16">
              {service.subServices.map((subService, subIndex) => (
                <li
                  key={subIndex}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-slate-700 leading-relaxed font-medium">
                    {subService}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
