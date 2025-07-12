"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export default function NavLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "text-brand-dark text-xl font-semibold p-2 border-y-4 border-transparent hover:border-b-brand-light",
        pathname === props.href && "border-b-brand-dark",
        props.className
      )}
    />
  );
}
