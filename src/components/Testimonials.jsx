import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../data/content";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, []);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = testimonials[index];

  return (
    <section className="section-pad bg-teal-mist/60 transition-colors duration-300 dark:bg-teal-nightSoft">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Depoimentos</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-deep dark:text-white md:text-4xl">
            Famílias que confiam no cuidado GE
          </h2>
        </div>

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="mx-auto h-9 w-9 text-teal-soft" strokeWidth={1.5} />

          <div className="relative mt-6 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <blockquote className="mx-auto max-w-2xl font-display text-xl font-medium leading-relaxed text-sand-ink dark:text-white/90 md:text-2xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-sm font-semibold text-teal-deep dark:text-white">{t.author}</p>
                  <p className="text-xs text-sand-stone dark:text-white/55">{t.role}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              aria-label="Depoimento anterior"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sand-line bg-white text-teal-deep transition-colors hover:bg-teal-pale dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 lg:h-10 lg:w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 sm:gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  className={`tap-area h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-teal-deep dark:bg-teal-soft" : "w-2 bg-sand-line hover:bg-teal-soft dark:bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Próximo depoimento"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sand-line bg-white text-teal-deep transition-colors hover:bg-teal-pale dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 lg:h-10 lg:w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
