import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const photos = [
  { src: "/images/trabalho-1.jpg", caption: "Suporte em ambiente hospitalar" },
  { src: "/images/trabalho-2.jpg", caption: "Ação de vacinação" },
  { src: "/images/trabalho-3.jpg", caption: "Ação de capacitação comunitária" },
  { src: "/images/trabalho-4.jpg", caption: "Rotina de atendimento" },
  { src: "/images/trabalho-5.jpg", caption: "Apresentação científica" },
];

// A trilha é composta duas vezes em sequência para permitir um laço
// perfeitamente contínuo: ao alcançar a marca da metade, a rolagem volta
// para o início sem nenhum salto visível (o conteúdo é idêntico ali).
const loopPhotos = [...photos, ...photos];

// px por frame a ~60fps — deslocamento suave e discreto, sem pressa.
const AUTO_SCROLL_SPEED = 0.45;
// Tempo que o carrossel aguarda antes de retomar o movimento automático
// depois de uma interação manual — dá espaço para a pessoa olhar com calma.
const RESUME_DELAY = 2200;

export default function WorkGallery() {
  const trackRef = useRef(null);
  const seamRef = useRef(null);
  const halfWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const [loaded, setLoaded] = useState({});
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      if (seamRef.current) {
        halfWidthRef.current =
          seamRef.current.getBoundingClientRect().left -
          track.getBoundingClientRect().left +
          track.scrollLeft;
      }
    };
    measure();

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    if (reduceMotion) {
      return () => window.removeEventListener("resize", onResize);
    }

    // Acumulador em ponto flutuante: track.scrollLeft é arredondado para
    // inteiro pelo navegador a cada leitura, então incrementos sub-pixel
    // lidos de volta do próprio scrollLeft nunca se acumulam (ficam sempre
    // truncados em 0). Guardamos a posição "real" à parte e só escrevemos
    // o valor arredondado no elemento.
    let position = track.scrollLeft;
    let raf;
    const step = () => {
      const half = halfWidthRef.current;
      if (!pausedRef.current && half > 0) {
        position += AUTO_SCROLL_SPEED;
        if (position >= half) position -= half;
        track.scrollLeft = position;
      } else {
        // mantém o acumulador sincronizado caso a pessoa role manualmente
        // enquanto o autoplay está pausado
        position = track.scrollLeft;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Esc fecha a foto expandida
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  const pause = () => {
    pausedRef.current = true;
    clearTimeout(resumeTimerRef.current);
  };

  const scheduleResume = () => {
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY);
  };

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    pause();
    const card = el.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 12 : 300;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
    scheduleResume();
  };

  const openLightbox = (photo) => {
    pause();
    setExpanded(photo);
  };

  const closeLightbox = () => {
    setExpanded(null);
    scheduleResume();
  };

  return (
    <section className="section-pad bg-white transition-colors duration-300 dark:bg-teal-night">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">No dia a dia</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-deep dark:text-white md:text-4xl">
              Cuidado que também é rotina, estudo e ação
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll(-1)}
              aria-label="Fotos anteriores"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sand-line bg-white text-teal-deep transition-colors hover:bg-teal-pale dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Próximas fotos"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sand-line bg-white text-teal-deep transition-colors hover:bg-teal-pale dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onTouchStart={pause}
          onTouchEnd={scheduleResume}
        >
          {loopPhotos.map((photo, i) => {
            const isDuplicate = i >= photos.length;
            const key = `${photo.src}-${i}`;
            return (
              <motion.figure
                key={key}
                ref={i === photos.length ? seamRef : undefined}
                data-card
                aria-hidden={isDuplicate || undefined}
                initial={isDuplicate ? false : { opacity: 0, y: 20 }}
                whileInView={isDuplicate ? undefined : { opacity: 1, y: 0 }}
                viewport={isDuplicate ? undefined : { once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % photos.length) * 0.07 }}
                className="shrink-0 rounded-xl2 bg-white p-2 shadow-card dark:bg-white/5"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(photo)}
                  tabIndex={isDuplicate ? -1 : undefined}
                  aria-label={`Ampliar foto: ${photo.caption}`}
                  className="group relative block aspect-[3/4] w-[170px] cursor-zoom-in overflow-hidden rounded-lg bg-teal-mist sm:w-[200px] lg:w-[220px]"
                >
                  <img
                    src={photo.src}
                    alt={isDuplicate ? "" : photo.caption}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onLoad={() => setLoaded((prev) => ({ ...prev, [key]: true }))}
                    className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.06] ${
                      loaded[key] ? "scale-100 opacity-100" : "scale-105 opacity-0"
                    }`}
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/15">
                    <Maximize2 className="h-6 w-6 scale-75 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" strokeWidth={1.75} />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-3 pb-3 pt-10 text-left font-serif text-base font-semibold leading-tight tracking-tight text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]">
                    {photo.caption}
                  </figcaption>
                </button>
              </motion.figure>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={expanded.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-full max-w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={expanded.src}
                alt={expanded.caption}
                className="max-h-[80vh] max-w-full rounded-xl2 object-contain shadow-lift"
              />
              <figcaption className="mt-4 text-center font-serif text-lg font-semibold text-white/90">
                {expanded.caption}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Fechar"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
