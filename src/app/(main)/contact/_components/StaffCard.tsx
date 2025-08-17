import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { FaWhatsappSquare } from "react-icons/fa";

type StaffCardProps = {
  position: string;
  name: string;
  tel: string;
  email: string;
  image: string;
};

export default function StaffCard({
  position,
  name,
  tel,
  email,
  image,
}: StaffCardProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold text-slate-800">
            {position}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="relative w-64 h-64 mx-auto">
            <Image
              src={image}
              alt={position}
              fill
              className="rounded-full object-cover border-4 border-blue-100"
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-800">{name}</h3>
            {/* <p className="text-slate-600 font-medium">
              Chief Marine Inspector & Technical Consultant
            </p> */}
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Mail className="h-5 w-5" />
              <a
                href="mailto:a.hosseini@oceanark.ir"
                className="hover:underline font-medium"
              >
                {email}
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <FaWhatsappSquare className="h-6 w-6 text-green-500" />
              <a
                href={`https://wa.me/${tel.replace("+", "").replaceAll(" ", "")}`}
                className="hover:underline font-medium"
              >
                {tel}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
