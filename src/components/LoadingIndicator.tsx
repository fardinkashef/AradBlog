import Image from "next/image";
import logo from "../../public/logo.svg";

export default function LoadingIndicator() {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
      <Image
        src={logo}
        alt="Logo"
        width={200}
        height={60}
        className="heartbeat-animation"
      />
    </div>
  );
}
