"use client";
import Image from "next/image";
import logo from "../../../../../public/logo.svg";

export default function Indicator() {
  return (
    <div>
      loading /blog
      <Image
        src={logo}
        alt="Logo"
        width={150}
        height={50}
        className="heartbeat-animation"
      />
    </div>
  );
}
