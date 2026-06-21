import { TrendingUp } from "lucide-react";

const stats = [
  {
    id: "stat-certified",
    value: "31,000+",
    label: "Operators Certified",
    detail: "Trained and compliant",
  },
  {
    id: "stat-experience",
    value: "45+",
    label: "Years of Experience",
    detail: "In material handling safety",
  },
  {
    id: "stat-classes",
    value: "7",
    label: "OSHA Classes Covered",
    detail: "Class I through Class VII",
  },
  {
    id: "stat-companies",
    value: "5,000+",
    label: "Companies Served",
    detail: "Nationwide safety partners",
  },
];

export default function StatsRow() {
  return (
    <section
      className="bg-bhg-black py-20 relative overflow-hidden border-y border-zinc-800"
      aria-labelledby="stats-heading"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      {/* Orange glow top-right */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-bhg-orange/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <TrendingUp className="w-4 h-4 text-bhg-orange" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-widest uppercase text-bhg-orange">
            Our Track Record
          </span>
        </div>

        <div id="stats-heading" className="sr-only">
          BHG Safety Partners by the numbers
        </div>

        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              id={stat.id}
              className="flex flex-col items-center text-center group"
            >
              <div
                className={`relative w-full flex flex-col items-center ${
                  i !== 0 ? "md:border-l md:border-white/10" : ""
                } px-4`}
              >
                {/* Glowing value */}
                <dt className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight leading-none mb-2 group-hover:text-bhg-orange transition-colors duration-300 drop-shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  {stat.value}
                </dt>

                <dd className="text-sm font-semibold text-white/70 mb-1">
                  {stat.label}
                </dd>

                <p className="text-xs text-white/40">{stat.detail}</p>

                {/* Animated orange underbar */}
                <span className="mt-4 block h-0.5 w-8 rounded-full bg-bhg-orange/50 group-hover:w-16 group-hover:bg-bhg-orange group-hover:shadow-[0_0_8px_rgba(249,115,22,0.7)] transition-all duration-500" />
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

