import { motion } from "framer-motion";
import { trustPoints } from "../data/content";

export default function TrustBar() {
  return (
    <section className="border-y border-sand-line bg-white transition-colors duration-300 dark:border-white/10 dark:bg-teal-night">
      <div className="container-page grid grid-cols-1 gap-4 py-8 xs:grid-cols-2 xs:gap-5 sm:gap-6 sm:py-10 md:grid-cols-4 md:gap-8 md:py-12">
        {trustPoints.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-center gap-3"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal-pale text-teal-deep dark:bg-white/5 dark:text-teal-soft">
              <item.icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <span className="text-sm font-medium leading-snug text-sand-ink dark:text-white/80">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
