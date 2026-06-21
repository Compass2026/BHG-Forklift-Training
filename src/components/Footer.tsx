import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const serviceLinks = [
  { label: "Safety Training", href: "/services/safety-training" },
  { label: "OSHA Compliance", href: "/services/osha-compliance" },
  { label: "Hazard Assessments", href: "/services/hazard-assessments" },
  { label: "Safety Audits", href: "/services/safety-audits" },
  { label: "Emergency Response", href: "/services/emergency-response" },
];

const areasServed = [
  "Houston, TX",
  "Dallas, TX",
  "San Antonio, TX",
  "Austin, TX",
  "Fort Worth, TX",
  "Nationwide",
];

export default function Footer() {
  return (
    <footer className="bg-bhg-black text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5 group">
              <div className="bg-white rounded-xl px-3 py-2 inline-flex items-center group-hover:opacity-90 transition-opacity duration-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/bhg-logo-transparent.png"
                  alt="BHG Safety Partners LLC"
                  className="h-11 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Keeping your workforce safe and your business compliant. Trusted
              safety training and OSHA compliance experts.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-5 text-bhg-orange">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas Served Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5 text-bhg-orange">
              Areas Served
            </h3>
            <ul className="space-y-3">
              {areasServed.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 text-sm text-gray-400"
                >
                  <MapPin className="w-3.5 h-3.5 text-bhg-orange flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5 text-bhg-orange">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+18005550100"
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-150 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-bhg-orange/20 transition-colors flex-shrink-0">
                    <Phone className="w-3.5 h-3.5 text-bhg-orange" />
                  </div>
                  <span className="leading-relaxed">(800) 555-0100</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@bhgsafety.com"
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-150 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 group-hover:bg-bhg-orange/20 transition-colors flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-bhg-orange" />
                  </div>
                  <span className="leading-relaxed">info@bhgsafety.com</span>
                </a>
              </li>
            </ul>

            {/* CTA */}
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center px-5 py-2.5 rounded-lg bg-bhg-orange text-white text-sm font-semibold hover:bg-orange-500 transition-colors shadow-lg shadow-bhg-orange/20"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} BHG Safety Partners. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
