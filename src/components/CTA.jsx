import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "../lib/whatsapp";

export default function CTA() {
  return (
    <section className="bg-teal-deep py-16 md:py-20">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-between gap-8 rounded-xl3 bg-gradient-to-br from-teal to-teal-deep px-6 py-10 text-center shadow-lift sm:px-8 sm:py-12 md:flex-row md:text-left"
        >
          <div>
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              Agende seu atendimento
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
              Entre em contato para agendar uma consulta ou procedimento de
              enfermagem no conforto da sua casa.
            </p>
          </div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-base font-bold text-teal-deep shadow-card transition-transform hover:-translate-y-0.5 md:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            Falar no WhatsApp agora
          </a>
        </motion.div>
      </div>
    </section>
  );
}
