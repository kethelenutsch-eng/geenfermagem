import { motion } from "framer-motion";
import { differentials } from "../data/content";

export default function Differentials() {
  return (
    <section id="diferenciais" className="section-pad bg-white transition-colors duration-300 dark:bg-teal-night">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Diferenciais</span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-teal-deep dark:text-white sm:mt-4 xs:text-3xl md:text-4xl">
            O que guia cada atendimento
          </h2>
        </div>

        <div className="mt-9 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 md:mt-14 md:gap-6 lg:grid-cols-5">
          {differentials.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-xl2 border border-sand-line bg-teal-mist/60 p-5 transition-shadow duration-300 hover:shadow-card dark:border-white/10 dark:bg-white/5 sm:p-6"
            >
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-teal-deep shadow-card dark:bg-white/10 dark:text-teal-soft sm:h-12 sm:w-12">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-teal-deep dark:text-white sm:mt-5">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sand-stone dark:text-white/65">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
