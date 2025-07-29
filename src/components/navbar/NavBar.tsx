import Link from "next/link";
// import { sessionUser } from "@/lib/types";
import NavBarMenuSheet from "./NavBarMenuSheet";
import Image from "next/image";
// import UserDropdown from "@/components/UserDropDown";
import logo from "../../../public/logo.svg";
import { cn } from "@/lib/utils";
import NavLink from "./NavLink";

const linkItems = [
  { title: "Services", href: "/services" },
  { title: "Blog", href: "/blog" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];
export default function Navbar() {
  // { user }: { user: sessionUser }
  return (
    <div className="flex justify-between items-center p-4 lg:px-[10%] border-t-8 border-t-brand-dark ">
      <Link href="/">
        <Image src={logo} alt="Logo" width={200} height={60} />
      </Link>
      {/* // Weird behaviour: if I put the following NavBarMenuSheet element after the nav element, it won't show up!!! */}
      <NavBarMenuSheet
      // user={user}
      />
      <nav className="hidden pr-12 md:flex items-center gap-8 ">
        {linkItems.map((linkItem, index) => (
          <NavLink
            href={linkItem.href}
            className={cn(
              linkItem.title === "Contact" &&
                "bg-brand-dark text-white rounded-md hover:bg-brand-light px-3"
            )}
            key={index}
          >
            {linkItem.title}
          </NavLink>
        ))}
        {/* {user ? <UserDropdown user={user} /> : <Link href="/login">Login</Link>} */}
      </nav>
    </div>
  );
}
