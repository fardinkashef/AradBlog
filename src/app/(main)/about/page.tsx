import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      {/* Hero Section / Main Title */}
      <div className="text-center mb-12 md:mb-16 lg:mb-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark dark:text-gray-50 leading-tight">
          OceanArk Technical Solutions
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Delivering Specialized Marine Services with Precision and Trust.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Section 1: Our Core Philosophy */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-brand-light dark:text-blue-300">
              Our Foundation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At OceanArk Technical Solutions, we believe that{" "}
              <strong className="text-brand-light dark:text-blue-400">
                precision, professionalism, and trust
              </strong>{" "}
              are the foundations of effective marine support. Based in Iran and
              operating across regional ports and offshore waters, we offer
              hands-on technical expertise shaped by real field experience.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our experience-driven approach ensures fast, accurate, and
              trustworthy support where it matters most —{" "}
              <strong className="text-brand-light dark:text-blue-400">
                onboard and onsite.
              </strong>
            </p>
          </CardContent>
        </Card>

        {/* Section 2: Core Technical Services */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-brand-light dark:text-blue-300">
              Specialized Marine Inspection & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We specialize in marine inspection and compliance support tailored
              to the challenges and realities of operating in the Gulf region.
              Our work is guided by international standards, but grounded in
              local understanding — allowing us to respond quickly, accurately,
              and with full awareness of port procedures, vessel needs, and
              operational pressures.
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Rapid, Accurate Response</li>
              <li>Deep Local Understanding of Gulf Region Operations</li>
              <li>Adherence to International Standards</li>
              <li>Comprehensive Awareness of Port Procedures & Vessel Needs</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12 md:my-16 lg:my-20 bg-blue-200 dark:bg-blue-800" />

      {/* Section 3: Marine Trade & Brokerage Support - Full Width */}
      <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-brand-light dark:text-blue-300">
            Beyond Technical: Marine Trade & Brokerage Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            In addition to our core technical services, we provide{" "}
            <strong className="text-brand-light dark:text-blue-400">
              Marine Trade & Brokerage Support
            </strong>{" "}
            — helping clients bridge operational and commercial gaps through:
          </p>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Cargo Sourcing</li>
            <li>Buyer Matching</li>
            <li>Shipping Line Coordination</li>
            <li>Port Access Representation across the region</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            OceanArk is built for those who seek clarity in reporting,
            confidence in decision-making, and reliable support where it matters
            most —{" "}
            <strong className="text-brand-light dark:text-blue-400">
              onboard and onsite.
            </strong>
          </p>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center mt-12 md:mt-16 lg:mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
          Ready for Reliable Marine Solutions?
        </h2>
        <Button asChild size="lg" className="px-8 py-3 text-lg">
          <Link href="/contact">Contact Us Today</Link>
        </Button>
      </div>
    </div>
  );
}
