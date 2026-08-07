import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, UserRound } from "lucide-react";
import { whatsappLink } from "../lib/whatsapp";

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="topo" className="relative overflow-hidden bg-teal-mist pt-28 pb-16 transition-colors duration-300 dark:bg-teal-night sm:pt-32 sm:pb-20 md:pt-36 lg:pt-40 lg:pb-28">
      {/* organic teal shapes in the background */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-24 right-[6%] h-[420px] w-[420px] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-teal-soft/30 blur-2xl animate-blob dark:bg-teal-soft/10" />
        <div className="absolute top-40 right-[22%] h-[280px] w-[280px] rounded-[60%_40%_45%_55%/45%_55%_50%_50%] bg-teal-deep/10 blur-2xl animate-blob-slow dark:bg-teal-deep/30" />
        <div className="absolute -bottom-16 left-[8%] h-[300px] w-[300px] rounded-[50%_50%_40%_60%/55%_45%_55%_45%] bg-teal-pale blur-xl animate-blob-slow dark:bg-teal-deep/20" />
      </div>

      <div className="container-page relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-mid" />
            Enfermagem domiciliar em Belo Horizonte
          </span>

          <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.12] tracking-tight text-teal-deep dark:text-white md:text-5xl">
            Cuidado de enfermagem humanizado no conforto da sua casa.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-sand-stone dark:text-white/65">
            Assistência de enfermagem personalizada para adultos, idosos e pacientes em
            recuperação, com segurança, ética e acolhimento, em toda a Região
            Metropolitana de Belo Horizonte.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-deep px-7 py-4 text-sm font-semibold text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-teal"
            >
              <MessageCircle className="h-4 w-4" />
              Agendar pelo WhatsApp
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-teal-deep/20 bg-white px-7 py-4 text-sm font-semibold text-teal-deep transition-colors hover:border-teal-deep/40 hover:bg-teal-pale dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10"
            >
              Conhecer os serviços
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl3 border border-white/60 shadow-lift dark:border-white/10">
            {imgOk ? (
              <img
                src="/images/hero-enfermeira.jpg"
                alt="Enfermeira realizando atendimento domiciliar humanizado"
                className="h-full w-full object-cover"
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-teal-pale to-teal-soft/40 p-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white/70">
                  <UserRound className="h-9 w-9 text-teal-deep" strokeWidth={1.5} />
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-teal-deep/70">
                  Substitua por uma foto profissional
                  <br />
                  em <code className="rounded bg-white/60 px-1">/public/images/hero-enfermeira.jpg</code>
                </p>
              </div>
            )}
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl2 bg-white px-5 py-4 shadow-card dark:bg-teal-nightSoft sm:block">
            <p className="font-display text-2xl font-bold text-teal-deep dark:text-white">COREN</p>
            <p className="text-xs font-medium text-sand-stone dark:text-white/60">Registro ativo</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
