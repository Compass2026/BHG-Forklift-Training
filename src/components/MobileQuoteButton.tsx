"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, HardHat } from "lucide-react";

/**
 * Sticky bottom CTA — visible on mobile only (hidden md+).
 * Pulses continuously to draw attention.
 */
export default function MobileQuoteButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes cta-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.55); }
          50%       { box-shadow: 0 0 0 14px rgba(249,115,22,0); }
        }
        .cta-pulse { animation: cta-pulse 2s ease-in-out infinite; }
      `}</style>

      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-5 pt-3 transition-all duration-300 ease-in-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(255,255,255,0.97) 60%, transparent)",
        }}
      >
        <Link
          href="/contact"
          id="mobile-sticky-quote"
          className="cta-pulse flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-bhg-orange text-white text-base font-bold tracking-wide shadow-xl shadow-bhg-orange/40 hover:bg-orange-500 active:scale-[0.98] transition-all duration-200"
        >
          <HardHat className="w-5 h-5" aria-hidden="true" />
          Get a Quote
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </>
  );
}
