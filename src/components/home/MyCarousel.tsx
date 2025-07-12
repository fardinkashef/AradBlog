"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const carouselItems = [
  {
    title: "Precision Surveys. Real Field Experience",
    subTitle:
      "We provide trusted technical inspections tailored to international standards and local port operations",
    imageSrc: "/slider/service1.jpg",
  },
  {
    title: "Ensuring Compliance. Enhancing Safety",
    subTitle:
      "Supporting your documentation and inspections to meet class, flag, and port state requirements — because compliance is not just paperwork, it’s safety",
    imageSrc: "/slider/service2.jpg",
  },
  {
    title: "Reliable Local Marine Partner — At Port and Offshore",
    subTitle:
      "Based locally, we support vessel operations with presence, precision, and professionalism — in every tide and every turn.",
    imageSrc: "/slider/service3.jpg",
  },
  {
    title: "Technical Insight. Trusted Marine Advice",
    subTitle:
      "We support your decisions with audits, documentation, and expert consultancy — helping you operate smarter, safer, and in full compliance.",
    imageSrc: "/slider/service4.jpg",
  },
  {
    title: "Trade Support with Maritime Precision",
    subTitle:
      "We connect cargo owners, exporters, and shipping lines with reliable partners — offering tailored coordination and port representation",
    imageSrc: "/slider/service5.jpg",
  },
];

export default function MyCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full my-3"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
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
                <div className="container absolute top-1/2 sm:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center p-4 md:p-8">
                  <p className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-3">
                    {item.title}
                  </p>

                  <p className="hidden sm:block text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-normal opacity-90">
                    {item.subTitle}
                  </p>
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
