import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { cities } from "../data/content";

// Coordenadas em um sistema 0-800 x 0-460 — um mapa estilizado (não geograficamente exato),
// com Belo Horizonte como hub central e as demais cidades distribuídas ao redor.
const positions = {
  Vespasiano: { x: 190, y: 300 },
  "Belo Horizonte": { x: 360, y: 150 },
  "Santa Luzia": { x: 470, y: 210 },
  "São José da Lapa": { x: 430, y: 320 },
  "Lagoa Santa": { x: 580, y: 250 },
  Confins: { x: 690, y: 140 },
};

const HUB = "Vespasiano";
const HUB_COORDS = "19.6889° S, 43.9264° W";

export default function ServiceArea() {
  const hub = positions[HUB];
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-140, 140], [5, -5]);
  const rotateY = useTransform(mouseX, [-260, 260], [-5, 5]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section id="area-atendimento" className="section-pad bg-teal-deep text-white">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow text-teal-soft">Área de atendimento</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Cuidado que chega até você
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
            Atendimento domiciliar em toda a Região Metropolitana de Belo
            Horizonte, incluindo:
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
            {cities.map((city) => (
              <li key={city.name} className="flex items-center gap-2 text-sm font-medium text-white">
                <MapPin className="h-4 w-4 shrink-0 text-teal-soft" />
                {city.name}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/60">
            E cidades vizinhas. Consulte disponibilidade pelo WhatsApp.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative cursor-pointer select-none overflow-hidden rounded-xl3 border border-white/10 bg-white/5 p-4"
          style={{
            perspective: 1200,
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsExpanded((v) => !v)}
        >
          {/* selo "ao vivo" */}
          <motion.div
            className="absolute right-6 top-6 z-10 flex items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-1 backdrop-blur-sm"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-teal-soft"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[10px] font-medium uppercase tracking-wide text-white/80">
              Ao vivo
            </span>
          </motion.div>

          <div className="relative">
            <svg viewBox="0 0 800 460" className="h-full w-full">
              {Object.entries(positions).map(([name, pos]) => {
                if (name === HUB) return null;
                return (
                  <path
                    key={name}
                    d={`M${hub.x},${hub.y} Q${(hub.x + pos.x) / 2},${(hub.y + pos.y) / 2 - 40} ${pos.x},${pos.y}`}
                    fill="none"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                  />
                );
              })}

              {/* anéis de cobertura ao redor do hub */}
              <circle cx={hub.x} cy={hub.y} r="70" fill="none" stroke="rgba(127,191,168,0.3)" strokeWidth="1" />
              <circle cx={hub.x} cy={hub.y} r="110" fill="none" stroke="rgba(127,191,168,0.18)" strokeWidth="1" />

              {/* pulso contínuo no hub — o ponto de partida, sempre "ao vivo" */}
              <motion.circle
                cx={hub.x}
                cy={hub.y}
                r="9"
                fill="none"
                stroke="#7FBFA8"
                strokeWidth="1.5"
                style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
                animate={{ scale: [1, 2.6, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />

              {/* pulso animado no hub ao expandir */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.circle
                    cx={hub.x}
                    cy={hub.y}
                    r="12"
                    fill="none"
                    stroke="#7FBFA8"
                    strokeWidth="1.5"
                    style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}
                    initial={{ scale: 1, opacity: 0.9 }}
                    animate={{ scale: 11, opacity: 0 }}
                    exit={{ scale: 11, opacity: 0 }}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              {Object.entries(positions).map(([name, pos]) => {
                const isHub = name === HUB;
                return (
                  <circle
                    key={name}
                    cx={pos.x}
                    cy={pos.y}
                    r={isHub ? 9 : 6}
                    fill={isHub ? "#7FBFA8" : "#F4FAF8"}
                    stroke={isHub ? "#F4FAF8" : "#7FBFA8"}
                    strokeWidth="2"
                  />
                );
              })}
            </svg>

            {/* Rótulos em HTML (não em <text> do SVG) para que o tamanho da
                fonte fique legível em qualquer tela — texto em SVG encolhe
                junto com o viewBox e ficava minúsculo no mobile. */}
            <div className="pointer-events-none absolute inset-0">
              {Object.entries(positions).map(([name, pos]) => {
                const isHub = name === HUB;
                return (
                  <div
                    key={name}
                    className="absolute -translate-x-1/2"
                    style={{ left: `${(pos.x / 800) * 100}%`, top: `${(pos.y / 460) * 100}%` }}
                  >
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center font-display text-[#F4FAF8] ${
                        isHub
                          ? "-top-[40px] text-[15px] font-bold lg:-top-[34px] lg:text-[13px]"
                          : "-top-[32px] text-[12px] font-semibold lg:-top-[26px] lg:text-[10px]"
                      }`}
                    >
                      {name}
                    </span>
                    {isHub && (
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] text-[#BFE3DC] lg:text-[9px]"
                          >
                            {HUB_COORDS}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <motion.p
            className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered && !isExpanded ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            Clique para ver as coordenadas
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
