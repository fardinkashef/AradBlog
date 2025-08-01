"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const carouselItems = [
  {
    title: "Precision Surveys. Real Field Experience",
    subTitle:
      "We provide trusted technical inspections tailored to international standards and local port operations",
    imageSrc: "/slider/service1.jpg",
    cta: "Explore Marine Surveys",
  },
  {
    title: "Ensuring Compliance. Enhancing Safety",
    subTitle:
      "Supporting your documentation and inspections to meet class, flag, and port state requirements — because compliance is not just paperwork, it’s safety",
    imageSrc: "/slider/service2.jpg",
    cta: "See How We Help",
  },
  {
    title: "Reliable Local Marine Partner — At Port and Offshore",
    subTitle:
      "Based locally, we support vessel operations with presence, precision, and professionalism — in every tide and every turn.",
    imageSrc: "/slider/service3.jpg",
    cta: "View Operational Support",
  },
  {
    title: "Technical Insight. Trusted Marine Advice",
    subTitle:
      "We support your decisions with audits, documentation, and expert consultancy — helping you operate smarter, safer, and in full compliance.",
    imageSrc: "/slider/service4.jpg",
    cta: "Explore Consultancy Services",
  },
  {
    title: "Trade Support with Maritime Precision",
    subTitle:
      "We connect cargo owners, exporters, and shipping lines with reliable partners — offering tailored coordination and port representation",
    imageSrc: "/slider/service5.jpg",
    cta: "Explore Trade Support",
  },
];

export default function MyCarousel() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="cursor-grab">
        {carouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full aspect-video max-h-[80vh]">
              <Image
                src={item.imageSrc}
                fill
                alt={item.title}
                className="object-cover" // Ensure the image covers the container without distortion
              />

              <div className="relative bg-black/60 z-10 text-white w-full h-full">
                <div className="container absolute top-1/2 sm:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-4 md:p-8 flex flex-col">
                  <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 select-none">
                    {item.title}
                  </p>

                  <p className="hidden sm:block text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-normal opacity-90 mb-12 select-none">
                    {item.subTitle}
                  </p>
                  <Link
                    href={`/services#service${index + 1}`}
                    // className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    className="w-fit mx-auto"
                  >
                    <Button className="hidden sm:inline-flex text-lg bg-gray-500 p-6 rounded-full">
                      {item.cta}
                      <ArrowRight size={30} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
