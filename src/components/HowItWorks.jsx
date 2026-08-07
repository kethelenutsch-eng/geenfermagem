import { motion } from "framer-motion";
import { timeline } from "../data/content";

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section-pad bg-white transition-colors duration-300 dark:bg-teal-night">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Como funciona</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-deep dark:text-white md:text-4xl">
            Do primeiro contato ao acompanhamento
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-sand-line dark:bg-white/10 md:block" />
          {timeline.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative flex flex-col items-start md:items-center md:text-center"
            >
              <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-teal-deep text-white shadow-card dark:bg-teal-soft dark:text-teal-night">
                <step.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <span className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-teal-mid dark:text-teal-soft">
                Etapa {i + 1}
              </span>
              <h3 className="mt-1.5 font-display text-lg font-bold text-teal-deep dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[22ch] text-sm leading-relaxed text-sand-stone dark:text-white/65">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
