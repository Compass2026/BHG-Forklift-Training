import { FileSearch, Calendar, Presentation, Briefcase } from "lucide-react";

const steps = [
  {
    id: "step-choose",
    step: "01",
    icon: FileSearch,
    title: "Choose Your Service",
    description:
      "Browse our full catalog of safety services and select the program that best fits your industry, workforce size, and compliance needs.",
  },
  {
    id: "step-schedule",
    step: "02",
    icon: Calendar,
    title: "Schedule Your Appointment",
    description:
      "Work with our team to find a date and format — onsite or virtual — that integrates seamlessly with your operations.",
  },
  {
    id: "step-training",
    step: "03",
    icon: Presentation,
    title: "Get Expert Training",
    description:
      "Our certified safety professionals deliver engaging, OSHA-aligned training designed to stick — not just check a box.",
  },
  {
    id: "step-safer",
    step: "04",
    icon: Briefcase,
    title: "Work Safer, Every Day",
    description:
      "Walk away with real documentation, actionable insights, and a workforce that's prepared to identify and prevent hazards.",
  },
];

export default function HowWeWork() {
  return (
    <section
      className="bg-[#1e293b] py-24 relative overflow-hidden"
      aria-labelledby="how-we-work-heading"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      {/* Orange glow bottom-right */}
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-bhg-orange/8 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-3 text-xs font-semibold tracking-widest uppercase text-bhg-orange">
            Our Process
          </span>
          <h2
            id="how-we-work-heading"
            className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto leading-tight"
          >
            We Follow a Proven Training Process Because Your Time and Safety Matter
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            Each forklift class includes classroom instruction, hands on evaluation, and OSHA aligned certification to keep operators qualified and job sites safer.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="h-px w-12 bg-bhg-orange/40 rounded-full" />
            <span className="w-2 h-2 rounded-full bg-bhg-orange" />
            <span className="h-px w-12 bg-bhg-orange/40 rounded-full" />
          </div>
        </div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Desktop dotted connector line */}
          <div
            className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-px"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #F97316 0, #F97316 6px, transparent 6px, transparent 16px)",
              opacity: 0.35,
            }}
          />

          {steps.map(({ id, step, icon: Icon, title, description }) => (
            <div
              key={id}
              id={id}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step icon box */}
              <div className="relative z-10 flex items-center justify-center w-28 h-28 rounded-2xl
                bg-white/10 backdrop-blur-sm border-2 border-white/20
                group-hover:border-bhg-orange group-hover:bg-bhg-orange/10 group-hover:shadow-[0_0_28px_rgba(249,115,22,0.25)]
                transition-all duration-300 mb-6">
                <Icon
                  className="w-10 h-10 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)] group-hover:scale-110 group-hover:text-bhg-orange transition-all duration-300"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {/* Step number badge */}
                <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-bhg-orange text-white text-xs font-bold flex items-center justify-center shadow-md shadow-bhg-orange/40">
                  {step}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-bhg-orange transition-colors duration-300">
                {title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
