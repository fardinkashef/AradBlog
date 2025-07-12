import Image from "next/image";
import logo from "../../public/logo.svg";

export default function LoadingIndicator() {
  return (
    <div className="grow w-full flex justify-center items-center">
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
