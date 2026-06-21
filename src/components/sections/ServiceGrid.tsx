import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "class-i-forklift",
    slug: "class-1-forklift",
    title: "CLASS I FORKLIFT TRAINING",
    description: "Designed for electric rider forklifts used in warehouses and distribution centers.",
    bullets: [
      "Equipment controls and safe operation",
      "Load handling and stability rules",
      "OSHA operator certification",
    ],
    image: "/images/forklift-class-1.png",
  },
  {
    id: "class-ii-forklift",
    slug: "class-2-forklift",
    title: "CLASS II FORKLIFT TRAINING",
    description: "Training for narrow aisle lift trucks used in tight warehouse layouts.",
    bullets: [
      "Narrow aisle maneuvering skills",
      "Rack and pallet safety methods",
      "OSHA operator certification",
    ],
    image: "/images/forklift-class-2.png",
  },
  {
    id: "class-iii-forklift",
    slug: "class-3-forklift",
    title: "CLASS III FORKLIFT TRAINING",
    description: "Certification for electric pallet jacks and walk behind lift equipment.",
    bullets: [
      "Walk behind control training",
      "Safe travel and stopping steps",
      "OSHA operator certification",
    ],
    image: "/images/forklift-class-3.png",
  },
  {
    id: "class-iv-forklift",
    slug: "class-4-forklift",
    title: "CLASS IV FORKLIFT TRAINING",
    description: "Training for indoor engine powered forklifts with cushion tires.",
    bullets: [
      "Fuel powered truck operation",
      "Indoor surface safety rules",
      "OSHA operator certification",
    ],
    image: "/images/forklift-class-4.png",
  },
  {
    id: "class-v-forklift",
    slug: "class-5-forklift",
    title: "CLASS V FORKLIFT TRAINING",
    description: "Certification for outdoor forklifts with pneumatic tires and engines.",
    bullets: [
      "Outdoor terrain operation",
      "Load balance and visibility",
      "OSHA operator certification",
    ],
    image: "/images/forklift-class-5.png",
  },
  {
    id: "class-vi-forklift",
    slug: "class-6-forklift",
    title: "CLASS VI FORKLIFT TRAINING",
    description: "Training for tow tractors and powered pulling equipment systems.",
    bullets: [
      "Towing limits and control",
      "Hitching and route safety",
      "OSHA operator certification",
    ],
    image: "/images/forklift-class-6.png",
  },
  {
    id: "class-vii-forklift",
    slug: "class-7-forklift",
    title: "CLASS VII FORKLIFT TRAINING",
    description: "Certification for rough terrain forklifts used on construction sites.",
    bullets: [
      "Uneven ground operation",
      "Lift and reach precautions",
      "OSHA operator certification",
    ],
    image: "/images/forklift-class-7.png",
  },
];

export default function ServiceGrid() {
  return (
    <section
      className="bg-gray-900 py-24 relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      {/* Orange glow top-left */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-bhg-orange/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
            Training Classes
          </span>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Forklift Operator Certification
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Professional OSHA-compliant forklift training for Classes I through VII. Select a class to enroll.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="h-px w-12 bg-bhg-orange/40 rounded-full" />
            <span className="w-2 h-2 rounded-full bg-bhg-orange" />
            <span className="h-px w-12 bg-bhg-orange/40 rounded-full" />
          </div>
        </div>

        {/* Card grid - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map(({ id, slug, title, description, bullets, image }) => (
            <Link
              key={id}
              href={`/classes/${slug}`}
              className={`group flex flex-col sm:flex-row bg-gray-800 rounded-2xl shadow-xl overflow-hidden
                hover:-translate-y-1 hover:shadow-2xl hover:shadow-bhg-orange/10
                transition-all duration-300 border border-gray-700 cursor-pointer ${
                  id === "class-vii-forklift" ? "lg:col-span-2" : ""
                }`}
            >
              {/* Left Side: Forklift Image */}
              <div className="w-full sm:w-2/5 min-h-[220px] sm:min-h-full relative overflow-hidden bg-gray-950 flex items-center justify-center">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Right Side: Content with Paper Texture */}
              <div
                className="w-full sm:w-3/5 p-6 pt-12 relative flex flex-col justify-between border-r-8 border-r-bhg-orange"
                style={{
                  backgroundImage: "url('/images/texture-paper.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Orange Square top-left */}
                <div
                  className="absolute top-4 left-4 w-4 h-4 bg-bhg-orange shadow-sm"
                  aria-hidden="true"
                />

                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-black text-gray-900 tracking-tight leading-snug">
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mt-3 leading-relaxed font-medium">
                    {description}
                  </p>

                  {/* Bullets */}
                  <ul className="mt-5 space-y-2.5">
                    {bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-800 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-bhg-orange mt-1.5 shrink-0" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learn More Button */}
                <div
                  className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                    bg-bhg-orange group-hover:bg-bhg-orange/90 text-white text-sm font-bold shadow-md
                    transition-all duration-200 self-start"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
