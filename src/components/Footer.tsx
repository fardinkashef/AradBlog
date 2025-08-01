import Link from "next/link";
import { Mail } from "lucide-react"; //
import { FiLinkedin } from "react-icons/fi";
import { SlSocialYoutube } from "react-icons/sl";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-700 dark:bg-gray-950 py-12 md:py-16 text-white dark:text-gray-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Branding & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-2xl font-bold dark:text-gray-50 mb-2">
            OceanArk Technical Soluctions
          </h3>
          <p className="mb-4">
            Professional Marine Support — At Port and Beyond.
          </p>
          <p className="text-sm">
            &copy; {currentYear} OceanArk. All rights reserved.
          </p>

          {/* Developer Credit */}
          <p className="text-xs mt-2 dark:text-gray-400">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/fardin-kashef/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              Fardin Kashef
            </a>
          </p>

          {/* Optional: Legal Links */}
          {/* <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
          </div> */}
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-xl font-semibold dark:text-gray-50 mb-4">
            Quick Links
          </h4>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </nav>
        </div>

        {/* Column 3: Social Media & Contact */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-xl font-semibold dark:text-gray-50 mb-4">
            Connect With Us
          </h4>
          <div className="flex items-center gap-4 mb-4">
            <a
              href="https://linkedin.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className=" hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <FiLinkedin className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/yourcompany"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className=" hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
            >
              <SlSocialYoutube className="h-6 w-6" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <a href="mailto:info@oceanarktech.com" className="hover:underline">
              info@oceanarktech.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
