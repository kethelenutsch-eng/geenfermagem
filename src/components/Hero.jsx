import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { whatsappLink } from "../lib/whatsapp";

// Pequeno ramo ornamental — mesmo espírito da folhagem da logo, só que
// desenhado em traço simples para servir de detalhe discreto na Hero.
function LeafSprig({ className = "" }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <path
        d="M30 55 C 28 40, 20 30, 8 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="14" cy="26" rx="7" ry="3.2" fill="currentColor" opacity="0.55" transform="rotate(-35 14 26)" />
      <ellipse cx="22" cy="35" rx="6" ry="2.8" fill="currentColor" opacity="0.5" transform="rotate(-20 22 35)" />
      <ellipse cx="28" cy="46" rx="5.5" ry="2.5" fill="currentColor" opacity="0.45" transform="rotate(-10 28 46)" />
    </svg>
  );
}

// "position" ajusta o enquadramento (object-position) de cada foto — o
// assunto principal fica em alturas diferentes na foto original de cada
// uma, então um recorte central "cru" (50% 50%) deixava uma foto com o
// assunto grande e centralizado e outra com metade cortada fora.
// "zoom" compensa fotos onde o assunto (seringa, mãos, abraço, estetoscópio)
// aparece menor/mais distante na foto original, para que o "tamanho" do
// assunto pareça parecido nas quatro fotos mesmo com enquadramentos
// diferentes.
const heroPhotos = [
  {
    src: "/images/hero-enfermeira.jpg",
    alt: "Enfermeira preparando medicação para atendimento domiciliar",
    position: "50% 50%",
    zoom: 1,
  },
  { src: "/images/hero-detalhe-1.jpg", alt: "Cuidado com carinho no atendimento domiciliar", position: "50% 52%", zoom: 1 },
  { src: "/images/hero-detalhe-2.jpg", alt: "Acolhimento humanizado ao paciente", position: "50% 28%", zoom: 1.15 },
  { src: "/images/hero-detalhe-3.jpg", alt: "Planejamento do cuidado de enfermagem", position: "50% 58%", zoom: 1.55 },
];

function DetailPhoto({ photo, children }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <div className="relative aspect-square">
      <div className="h-full w-full overflow-hidden rounded-xl2 bg-teal-mist shadow-card">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: photo.position, transformOrigin: photo.position, transform: `scale(${photo.zoom})` }}
          className="h-full w-full object-cover"
          onError={() => setOk(false)}
        />
      </div>
      {children}
    </div>
  );
}

export default function Hero() {
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
          className="relative mx-auto w-full max-w-lg"
        >
          {/* mosaico 2×2 — as 4 fotos no mesmo tamanho, cada uma com a
              mesma moldura branca ornamentada */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <DetailPhoto photo={heroPhotos[0]}>
              <LeafSprig className="pointer-events-none absolute -right-2 -top-5 h-9 w-9 rotate-[35deg] text-teal-soft/70 dark:text-teal-soft/35 sm:-right-3 sm:-top-6 sm:h-11 sm:w-11" />
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl2 bg-white px-4 py-3 shadow-card dark:bg-teal-nightSoft sm:block">
                <p className="font-display text-lg font-bold text-teal-deep dark:text-white">COREN</p>
                <p className="text-[11px] font-medium text-sand-stone dark:text-white/60">Registro ativo</p>
              </div>
            </DetailPhoto>
            {heroPhotos.slice(1).map((photo) => (
              <DetailPhoto key={photo.src} photo={photo} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
