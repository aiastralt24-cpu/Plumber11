"use client";

import { useEffect, useRef, useState } from "react";

export function StickyCTA({ phoneNumber, whatsappNumber }: { phoneNumber: string; whatsappNumber: string }) {
  const footerRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 }
    );

    const footer = document.getElementById("site-footer-trigger");
    if (footer) {
      observer.observe(footer);
      footerRef.current = footer;
    }

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 gap-px bg-primary lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      } transition-transform`}
    >
      <a
        href={`tel:${phoneNumber}`}
        className="flex min-h-14 items-center justify-center bg-success font-semibold text-white"
      >
        Call Now
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        className="flex min-h-14 items-center justify-center bg-[#25D366] font-semibold text-white"
      >
        WhatsApp
      </a>
    </div>
  );
}
