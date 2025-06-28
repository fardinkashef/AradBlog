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
} from "lucide-react";
// import { sessionUser } from "@/lib/types";

const links = [
  { title: "Home", href: "/", icon: Home },
  { title: "Blog", href: "/blog", icon: Library },
  { title: "Contact", href: "/contact", icon: Phone },
  { title: "services", href: "/services", icon: HeartHandshake },
];
export default function NavBarMenuSheet() {
  // { user }: { user: sessionUser }
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden cursor-pointer">
        <Menu color="black" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-[400px] flex flex-col p-3"
      >
        {links.map((link, index) => (
          <SheetClose asChild key={index}>
            <Link
              href={link.href}
              className="flex items-center gap-2 p-2 hover:bg-gray-100"
            >
              <link.icon size={22} />
              <span>{link.title}</span>
            </Link>
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
