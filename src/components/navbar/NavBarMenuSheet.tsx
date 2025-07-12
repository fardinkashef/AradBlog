import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  Home,
  Library,
  LogIn,
  Menu,
  Phone,
  HeartHandshake,
  Info,
} from "lucide-react";
import SheetLink from "./SheetLink";
// import { sessionUser } from "@/lib/types";

const links = [
  { title: "Home", href: "/", icon: Home },
  { title: "Blog", href: "/blog", icon: Library },
  { title: "Services", href: "/services", icon: HeartHandshake },
  { title: "About", href: "/about", icon: Info },
  { title: "Contact", href: "/contact", icon: Phone },
];
export default function NavBarMenuSheet() {
  // { user }: { user: sessionUser }
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden cursor-pointer">
        <Menu color="#004862" size={36} />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-[400px] flex flex-col p-3 pt-12"
      >
        {links.map((link, index) => (
          <SheetClose asChild key={index}>
            <SheetLink href={link.href}>
              <link.icon size={22} />
              <span>{link.title}</span>
            </SheetLink>
          </SheetClose>
        ))}

        {/* {user ? (
          <SheetClose asChild>
            <Link href="/learning" className="flex items-center gap-2">
              <Library size={22} />
              <span>Logout</span>
            </Link>
          </SheetClose>
        ) : (
          <SheetClose asChild>
            <Link href="/login" className="flex items-center gap-2">
              <LogIn size={22} />
              <span>Login</span>
            </Link>
          </SheetClose>
        )} */}
      </SheetContent>
    </Sheet>
  );
}
