import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { services } from "../data/content";

export default function Services() {
  return (
    <section id="servicos" className="section-pad bg-teal-mist/60 transition-colors duration-300 dark:bg-teal-nightSoft">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Nossos serviços</span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-teal-deep dark:text-white sm:mt-4 xs:text-3xl md:text-4xl">
            Cuidados de enfermagem sob medida
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-sand-stone dark:text-white/65 sm:mt-4 sm:text-base">
            Cada procedimento é realizado com técnica, atenção aos detalhes e o
            acolhimento que só o cuidado em casa proporciona.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:mt-10 sm:gap-5 md:mt-14 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className={`group relative flex flex-col rounded-xl3 border border-sand-line bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-lift dark:border-white/10 dark:bg-white/5 sm:p-8 ${
                service.items?.length ? "" : "lg:col-span-1"
              }`}
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-teal-pale text-teal-deep transition-colors duration-300 group-hover:bg-teal-deep group-hover:text-white dark:bg-white/10 dark:text-teal-soft">
                <service.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-display text-lg font-bold text-teal-deep dark:text-white">
                {service.title}
              </h3>

              {service.description ? (
                <p className="mt-3 text-sm leading-relaxed text-sand-stone dark:text-white/65">
                  {service.description}
                </p>
              ) : (
                <ul className="mt-4 space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-sand-stone dark:text-white/65">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-mid dark:text-teal-soft" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
