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
        <h2 className="text-center text-2xl">svg format 16KB 👇</h2>
        <div className="relative aspect-video max-w-3xl mx-auto">
          <Image src="/PersianGulf/pg.svg" alt="Persian Gulf map" fill />
        </div>
        <h2 className="text-center text-2xl">png format 20 KB 👇</h2>
        <div className="relative aspect-video max-w-3xl mx-auto">
          <Image src="/PersianGulf/pg.png" alt="Persian Gulf map" fill />
        </div>
        <h2 className="text-center text-2xl">jpg format 850 KB 👇</h2>
        <img
          src="/PersianGulf/pg.jpg"
          alt="sdsfd"
          className="max-w-3xl mx-auto"
        />
        <h2 className="text-center text-2xl">jpg format 1.8 MB 👇</h2>
        <img
          src="/PersianGulf/pg-hq.jpg"
          alt="sdsfd"
          className="max-w-3xl mx-auto"
        />

        <h2 className="text-center text-2xl">The images we had before 👇</h2>
        <img src="/PersianGulf.jpg" alt="sdsfd" className="max-w-3xl mx-auto" />
        <div className="relative aspect-video max-w-3xl mx-auto">
          <Image src="/PersianGulf.jpg" alt="Persian Gulf map" fill />
        </div>
        <div className="relative aspect-video max-w-xl mx-auto">
          <Image src="/PersianGulf2.png" alt="Persian Gulf map" fill />
        </div>
        <div className="relative aspect-video max-w-xl mx-auto">
          <Image src="/PersianGulf.png" alt="Persian Gulf map" fill />
        </div>
      </div>
    </section>
  );
}
