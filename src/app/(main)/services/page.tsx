import Image from "next/image";
import ServicesAccordion from "./_components/ServicesAccordion";
import ContactCTA from "@/components/ContactCTA";

export default function ServicesPage() {
  return (
    <div>
      <div className="relative h-80">
        <Image src="/services.jpg" alt="services image" fill />
      </div>
      <div className="max-w-4xl my-12 mx-auto text-brand-dark">
        <h2 className="text-3xl font-semibold mb-4">
          Specialized Marine Services — Built on Field Experience
        </h2>
        <p className="text-lg">
          At Oceanark, we provide tailored marine services for shipowners,
          operators, and maritime clients across Iranian ports and offshore
          waters. Our work is driven by technical precision, local presence, and
          global standards — offering trusted support across inspection,
          compliance, port operations, consultancy, and trade coordination.
        </p>
        <p>Click on any service to view details</p>
      </div>
      <ServicesAccordion />
      {/* Call to Action Section */}
      <ContactCTA />
    </div>
  );
}
