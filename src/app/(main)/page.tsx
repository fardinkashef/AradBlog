import MyCarousel from "@/components/home/MyCarousel";
import Image from "next/image";
import Link from "next/link"; // Keep Link if you plan to use it later

export default function HomePage() {
  return (
    <div className="flex justify-center items-center">
      <MyCarousel />
      {/* <div className="relative w-full max-w-6xl aspect-video max-h-[80vh]">
        <Image
          src="/slider/service1.jpg"
          fill
          alt="Two marine workers inspecting equipment on a ship, symbolizing compliance and safety in maritime operations."
          className="object-cover" // Ensure the image covers the container without distortion
        />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        text-white w-full h-full text-center p-4 md:p-8 rounded-lg bg-black/60 z-10
                        "
        >
          <p className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Ensuring Compliance Enhancing Safety
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-normal opacity-90">
            Supporting your documentation and inspections to meet class, flag,
            and port state requirements — because compliance is not just
            paperwork, it’s safety
          </p>
        </div>
      </div> */}
      {/* Your Link component is commented out, but good to keep if needed */}
      {/* <Link className="bg-black p-2 text-white" href="/admin">
        admin
      </Link> */}
    </div>
  );
}
