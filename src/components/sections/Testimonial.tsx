import Image from "next/image";
import { CheckCircle, Quote } from "lucide-react";

const highlights = [
  "Expert Safety Training",
  "Customized Safety Programs",
  "OSHA Compliance Support",
  "Industrial Hygiene Surveys",
  "Onsite Safety Inspections",
  "Written Safety Program Development",
];

export default function Testimonial() {
  return (
    <section
      className="bg-bhg-black py-24 relative overflow-hidden"
      aria-labelledby="testimonial-heading"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      {/* Orange glow */}
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-bhg-orange/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Professional Image ── */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
              <Image
                src="/safety-professional.png"
                alt="BHG Safety Partners safety professional on a job site"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Orange accent inset border */}
              <div className="absolute inset-0 rounded-2xl ring-4 ring-bhg-orange/30 pointer-events-none" />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-6 -right-4 md:right-4 bg-bhg-orange rounded-2xl px-6 py-4 shadow-xl shadow-bhg-orange/30 flex items-center gap-4">
              <span className="text-3xl font-extrabold text-white">45+</span>
              <span className="text-xs font-semibold text-white/85 leading-tight max-w-[80px]">
                Years of Combined Experience
              </span>
            </div>
          </div>

          {/* ── Right: Testimonials Content ── */}
          <div className="pt-8 lg:pt-0">
            <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
              Testimonials
            </span>
            <h2
              id="testimonial-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
            >
              What Our Clients Said
            </h2>

            {/* Highlights checklist — 2-column */}
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-10"
              aria-label="Service highlights"
            >
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-white/80 font-medium group cursor-default"
                >
                  <CheckCircle
                    className="w-4 h-4 text-bhg-orange flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span className="group-hover:text-white transition-colors duration-200">{item}</span>
                </li>
              ))}
            </ul>

            {/* Quote card */}
            <div className="relative bg-white rounded-2xl border border-gray-100 p-8 shadow-lg hover:shadow-xl hover:shadow-bhg-orange/10 transition-shadow duration-300">
              <Quote
                className="absolute top-4 right-5 w-10 h-10 text-bhg-orange/15"
                aria-hidden="true"
                strokeWidth={1}
              />

              <blockquote>
                <p className="text-gray-600 italic leading-relaxed text-base mb-6">
                  &ldquo;Brad and his team are very helpful and knowledgeable.
                  They came to our job site and conducted safety training that was
                  not only thorough and compliant, but genuinely engaging for our
                  crew. I highly recommend BHG Safety Partners to any company
                  that takes workplace safety seriously.&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-bhg-orange flex items-center justify-center flex-shrink-0 shadow-md shadow-bhg-orange/30">
                    <span className="text-white font-bold text-sm">KW</span>
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-bhg-black text-sm block">
                      Kelly Welch
                    </cite>
                    <span className="text-xs text-gray-400">
                      Project Manager
                    </span>
                  </div>
                  <span className="ml-auto h-8 w-px bg-bhg-orange/20 hidden sm:block" />
                  <span className="hidden sm:block text-xs font-semibold text-bhg-orange uppercase tracking-wide">
                    5-Star Review
                  </span>
                </footer>
              </blockquote>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
