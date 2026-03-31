import type { ReactNode } from "react";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <SiteHeader />
      {children}
      <div id="site-footer-trigger" />
      <SiteFooter />
    </div>
  );
}
