"use client";

import { usePathname } from "next/navigation";
import Header from "../Header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Don't show the global header on the landing page (root path)
  if (pathname === "/") {
    return null;
  }

  return <Header />;
}