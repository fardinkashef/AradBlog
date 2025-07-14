import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function AboutSection() {
  return (
    <section className="bg-blue-50">
      <div className="max-w-5xl mx-auto p-6 pt-20 text-brand-dark">
        <h2 className="text-4xl font-semibold uppercase mb-6">
          <span className="font-bold">OceanArk</span> Technical Solutions
        </h2>
        <p className="text-xl mb-6">
          We deliver specialized marine services across Iranian ports and
          offshore waters — from inspections and compliance to consultancy, port
          support, and trade facilitation. Our experience-driven approach
          ensures fast, accurate, and trustworthy support where it matters most
          — onboard and onsite.
        </p>
        <div className="flex justify-end">
          <Link href="/about">
            <Button variant="outline" size="lg" className="text-lg">
              More about us <ArrowRight />
            </Button>
          </Link>
        </div>
        <div className="relative aspect-video max-w-2xl mx-auto">
          <Image src="/PersianGulf.png" alt="Persian Gulf map" fill />
        </div>
      </div>
    </section>
  );
}
