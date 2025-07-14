import { Anchor } from "lucide-react";
import Image from "next/image";

export default function Slogan() {
  return (
    <section className="bg-blue-50 relative py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Image
            src="/logo-icon.png"
            alt="Logo"
            width={67}
            height={85}
            className="mx-auto mb-6"
          />
          <blockquote className="font-bold">
            <p className="text-brand-dark text-2xl md:text-4xl italic mb-4 leading-relaxed">
              "Professional Marine Support —
            </p>
            <p className="text-brand-light text-2xl md:text-4xl italic">
              At Port and Beyond."
            </p>
          </blockquote>
          <div className="mt-12 pt-8 border-t border-brand-dark">
            <p className="text-slate-800 text-xl">
              Your trusted partner in maritime excellence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
