import Link from "next/link";
import { Button } from "./ui/button";

export default function ContactCTA() {
  return (
    <div className="bg-slate-300 text-slate-800 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Contact us today to discuss your marine service requirements and
          discover how our expertise can support your maritime operations.
        </p>
        <div className=" justify-center items-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="text-lg bg-brand-dark text-white hover:bg-brand-light hover:text-white"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
