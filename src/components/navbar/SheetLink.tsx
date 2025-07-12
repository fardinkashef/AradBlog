"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

export default function SheetLink(props: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "text-brand-dark flex items-center gap-2 p-2 rounded-md hover:bg-brand-light hover:text-white",
        pathname === props.href && "bg-brand-dark text-white",
        props.className
      )}
    />
  );
}
