"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MapPin, Mail, Menu, X, Search } from "lucide-react";

// ─── Inline SVG social icons (lucide-react doesn't include these) ─────────────
const FbIcon  = () => <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TwIcon  = () => <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const YtIcon  = () => <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;
const IgIcon  = () => <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;

const navLinks = [
  { label: "Home",             href: "/" },
  { label: "About Us",         href: "/about" },
  { label: "Forklift Classes", href: "/services" },
  { label: "Locations",        href: "/locations", isDropdown: true },
  { label: "Contact",          href: "/contact" },
];

const SERVICE_STATES = [
  { name: "Alabama",      slug: "alabama" },
  { name: "Arkansas",     slug: "arkansas" },
  { name: "Georgia",      slug: "georgia" },
  { name: "Illinois",     slug: "illinois" },
  { name: "Indiana",      slug: "indiana" },
  { name: "Iowa",         slug: "iowa" },
  { name: "Kansas",       slug: "kansas" },
  { name: "Kentucky",     slug: "kentucky" },
  { name: "Louisiana",    slug: "louisiana" },
  { name: "Mississippi",  slug: "mississippi" },
  { name: "Missouri",     slug: "missouri" },
  { name: "Nebraska",     slug: "nebraska" },
  { name: "North Dakota", slug: "north-dakota" },
  { name: "Oklahoma",     slug: "oklahoma" },
  { name: "South Dakota", slug: "south-dakota" },
  { name: "Tennessee",    slug: "tennessee" },
  { name: "Texas",        slug: "texas" },
];

// ─── Desktop Locations dropdown ───────────────────────────────────────────────
// Uses onMouseEnter/onMouseLeave on the wrapper instead of pure CSS group-hover.
// A transparent "bridge" div fills the gap between the trigger and the panel so
// the mouse never exits the hover zone mid-travel (which caused the dropdown to
// disappear before the user could reach it).
function LocDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger link */}
      <Link
        href="/locations"
        className="text-base font-semibold text-gray-900 hover:text-bhg-orange transition-colors duration-200 relative inline-flex items-center gap-1.5 group"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Locations
        <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-bhg-orange rounded-full transition-all duration-300 group-hover:w-full" />
        <svg
          className={`w-3 h-3 mt-0.5 transition-all duration-200 ${open ? "rotate-180 opacity-100 text-bhg-orange" : "opacity-50"}`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* Invisible bridge — covers the 12px gap between the trigger bottom and
          the panel top so the mouse never leaves the hover zone mid-travel */}
      <div className="absolute top-full left-0 w-full h-3" aria-hidden="true" />

      {/* Dropdown panel */}
      <div
        className={`absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 w-64
          bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden
          transition-all duration-200 ease-out
          ${open
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-2"
          }`}
        role="menu"
      >
        <div className="px-5 py-3 bg-bhg-gray-light border-b border-gray-100">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-bhg-orange">
            States We Serve
          </p>
        </div>

        <div className="py-2 max-h-80 overflow-y-auto">
          {SERVICE_STATES.map((st) => (
            <Link
              key={st.slug}
              href={`/locations/${st.slug}`}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2 hover:bg-orange-50 group/item transition-colors duration-150"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-bhg-orange/30 flex-shrink-0 group-hover/item:bg-bhg-orange transition-colors" />
              <span className="text-sm font-medium text-bhg-black group-hover/item:text-bhg-orange transition-colors">
                {st.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="px-3 pb-3 pt-1 border-t border-gray-100">
          <Link
            href="/locations"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-bhg-orange/10 hover:bg-bhg-orange text-bhg-orange hover:text-white text-xs font-semibold tracking-wide transition-all duration-200"
          >
            View All Locations →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 will-change-transform transform-gpu">

      {/* ── Top Info Bar ─────────────────────────────────────────────────────── */}
      <div className="hidden md:block relative overflow-hidden" style={{ background: "linear-gradient(90deg, #0f0f0f 0%, #1a1a1a 30%, #c2460a 70%, #ea6c1a 100%)" }}>
        {/* Animated shimmer sweep */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
            animation: "shimmer 4s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        <style>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes pulse-badge {
            0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.5); }
            50% { box-shadow: 0 0 0 6px rgba(249,115,22,0); }
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-12">

            {/* Left: contact info */}
            <div className="flex items-center gap-5">
              <a
                href="tel:+15738226448"
                className="group flex items-center gap-2 text-white font-semibold text-sm hover:text-bhg-orange transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/20 group-hover:bg-bhg-orange/30 group-hover:border-bhg-orange/50 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.4)] transition-all duration-200">
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                (573) 822-6448
              </a>

              <span className="h-5 w-px bg-white/20" aria-hidden="true" />

              <span className="group flex items-center gap-2 text-white/85 text-sm">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/20">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                11325 Dove Ridge Road, Hannibal MO 63401
              </span>

              <span className="h-5 w-px bg-white/20" aria-hidden="true" />

              <a
                href="mailto:office@bhgpllc.com"
                className="group flex items-center gap-2 text-white font-semibold text-sm hover:text-bhg-orange transition-colors duration-200"
              >
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/20 group-hover:bg-bhg-orange/30 group-hover:border-bhg-orange/50 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.4)] transition-all duration-200">
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                office@bhgpllc.com
              </a>
            </div>

            {/* Right: social + CTA badge */}
            <div className="flex items-center gap-4">
              {[
                { Icon: FbIcon, label: "Facebook",  href: "https://facebook.com" },
                { Icon: TwIcon, label: "Twitter",   href: "https://twitter.com" },
                { Icon: YtIcon, label: "YouTube",   href: "https://youtube.com" },
                { Icon: IgIcon, label: "Instagram", href: "https://instagram.com" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/20 text-white/80 hover:bg-bhg-orange/30 hover:border-bhg-orange/50 hover:text-white hover:shadow-[0_0_10px_rgba(249,115,22,0.4)] transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>


          </div>
        </div>
      </div>

      {/* ── Main Nav Bar ─────────────────────────────────────────────────────── */}
      <div
        className={`transition-all duration-300 ease-in-out border-b ${
          scrolled
            ? "bg-white/30 backdrop-blur-lg md:bg-white/20 md:backdrop-blur-sm border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
            : "bg-white border-gray-200 shadow-md"
        }`}
        style={scrolled ? { WebkitBackdropFilter: "blur(16px)" } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28">

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bhg-logo-transparent.png"
                alt="BHG Safety Partners LLC"
                className="h-28 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                link.isDropdown ? (
                  <LocDropdown key={link.label} />
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-base font-semibold text-gray-900 hover:text-bhg-orange transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-bhg-orange rounded-full transition-all duration-300 group-hover:w-full" />
                  </Link>
                )
              ))}

              {/* Search Icon */}
              <button
                className="text-gray-900 hover:text-bhg-orange p-1 transition-colors duration-200 cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-bhg-orange text-white text-base font-bold shadow-md shadow-bhg-orange/25 hover:bg-orange-500 hover:shadow-lg hover:shadow-bhg-orange/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Get a Free Quote
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              aria-label="Toggle navigation menu"
              className="md:hidden p-3 rounded-lg text-bhg-gray-dark hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/98 backdrop-blur-md max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain">

          {/* Mobile contact strip */}
          <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 space-y-2">
            <a href="tel:+15738226448" className="flex items-center gap-2 text-xs text-bhg-orange font-medium">
              <Phone className="w-3 h-3 text-bhg-orange flex-shrink-0" />
              (573) 822-6448
            </a>
            <a href="mailto:office@bhgpllc.com" className="flex items-center gap-2 text-xs text-bhg-orange font-medium">
              <Mail className="w-3 h-3 text-bhg-orange flex-shrink-0" />
              office@bhgpllc.com
            </a>
            <div className="flex items-center gap-4 pt-1">
              <span className="text-[10px] font-semibold text-bhg-orange/60 uppercase tracking-widest">Follow:</span>
              {[
                { Icon: FbIcon, label: "Facebook",  href: "https://facebook.com" },
                { Icon: TwIcon, label: "Twitter",   href: "https://twitter.com" },
                { Icon: YtIcon, label: "YouTube",   href: "https://youtube.com" },
                { Icon: IgIcon, label: "Instagram", href: "https://instagram.com" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-bhg-orange hover:text-orange-400 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.label} className="mt-1">
                    <button
                      onClick={() => setLocOpen((p) => !p)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-bhg-gray-dark hover:text-bhg-orange hover:bg-orange-50 transition-colors duration-150"
                      aria-expanded={locOpen}
                      aria-controls="mobile-states-list"
                    >
                      Locations
                      <svg
                        className={`w-3.5 h-3.5 opacity-50 transition-transform duration-200 ${locOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {locOpen && (
                      <div
                        id="mobile-states-list"
                        className="ml-4 mt-1 border-l-2 border-bhg-orange/20 pl-3 space-y-0.5"
                      >
                        {SERVICE_STATES.map((st) => (
                          <Link
                            key={st.slug}
                            href={`/locations/${st.slug}`}
                            onClick={() => { setMobileOpen(false); setLocOpen(false); }}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-bhg-gray-dark hover:text-bhg-orange hover:bg-orange-50 transition-colors duration-150"
                          >
                            <span className="w-1 h-1 rounded-full bg-bhg-orange/50 flex-shrink-0" />
                            {st.name}
                          </Link>
                        ))}
                        <Link
                          href="/locations"
                          onClick={() => { setMobileOpen(false); setLocOpen(false); }}
                          className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-semibold text-bhg-orange hover:bg-orange-50 transition-colors"
                        >
                          View All Locations →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-bhg-gray-dark hover:text-bhg-orange hover:bg-orange-50 transition-colors duration-150"
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Search */}
            <div className="px-3 py-2.5 flex items-center gap-2 text-bhg-gray-dark border-t border-gray-100 mt-2">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-b border-gray-200 focus:border-bhg-orange focus:outline-none text-sm w-full py-0.5"
              />
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex justify-center items-center px-5 py-2.5 rounded-lg bg-bhg-orange text-white text-sm font-semibold hover:bg-orange-500 transition-colors"
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
