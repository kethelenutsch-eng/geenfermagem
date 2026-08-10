import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { whatsappLink } from "../lib/whatsapp";
import LogoMark from "./LogoMark";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#sobre", label: "Sobre" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#area-atendimento", label: "Área de atendimento" },
  { href: "#faq", label: "Dúvidas" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // guarda o link clicado no drawer para navegar até ele só depois que a
  // trava de scroll for liberada — evita a "briga" entre o pulo até a
  // seção e a restauração da posição antiga de rolagem
  const pendingNavRef = useRef(null);

  const closeAndNavigate = (href) => {
    pendingNavRef.current = href;
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll da página por trás enquanto o menu está aberto, e fecha
  // com Esc. Só usar "overflow: hidden" no body não é suficiente — no
  // Safari/iOS o scroll "vaza" por trás mesmo assim, o que faz um elemento
  // fixed (como o drawer) parecer tremer/sumir durante o gesto de rolar.
  // Fixar o body no lugar (guardando e restaurando a posição do scroll) é a
  // forma que funciona de verdade em todos os navegadores.
  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      window.removeEventListener("keydown", onKey);

      const pendingHref = pendingNavRef.current;
      pendingNavRef.current = null;
      if (pendingHref) {
        // fecho normal (X, Esc, clique fora): volta pro ponto exato de
        // onde a pessoa parou.
        // clique num link: só agora, com a página já destravada, pula
        // suavemente até a seção — sem isso os dois pulos brigavam entre
        // si e o menu parecia travar/demorar pra reagir.
        const target = document.querySelector(pendingHref);
        if (target) {
          requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
        }
        history.pushState(null, "", pendingHref);
      } else {
        window.scrollTo(0, scrollY);
      }
    };
  }, [open]);

  const header = (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 shadow-soft backdrop-blur-md dark:bg-teal-night/80"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between sm:h-20 md:h-24 lg:h-28">
        <a href="#topo" className="flex items-center gap-2 -ml-3 sm:-ml-4">
          {/* variante escura da logo (texto/traço em teal) para fundo claro,
              e variante clara para quando o modo escuro estiver ativo */}
          <LogoMark variant="dark" className="h-10 sm:h-12 md:h-14 lg:h-16 dark:hidden" />
          <LogoMark variant="light" className="hidden h-10 dark:block sm:h-12 md:h-14 lg:h-16" />
          <div className="text-[9px] font-medium uppercase tracking-[0.12em] text-sand-stone dark:text-white/50 sm:text-[10px] sm:tracking-[0.14em]">
            Enfermagem
            <br />
            Domiciliar
          </div>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-sand-ink/80 transition-colors hover:text-teal-deep dark:text-white/75 dark:hover:text-teal-soft"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-teal-deep px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:bg-teal hover:shadow-lift"
          >
            <MessageCircle className="h-4 w-4" />
            Agendar
          </a>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sand-ink dark:text-white"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </header>
  );

  // O drawer/overlay vai para um portal fora do <header> de propósito: o
  // header ganha "backdrop-blur" quando a página rola, e blur/filter num
  // ancestral vira "containing block" para elementos fixed dentro dele —
  // na prática, o menu ficava preso na altura pequena do header em vez de
  // cobrir a tela inteira. Renderizando direto no body, fica sempre
  // relativo à tela de verdade, não importa o que aconteça no header.
  return createPortal(
    <>
      {header}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/55 lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              className="fixed inset-y-0 right-0 z-50 flex w-[80%] max-w-[340px] flex-col bg-white shadow-lift dark:bg-teal-night lg:hidden"
            >
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-sand-line px-5 dark:border-white/10 sm:h-20">
                <span className="font-display text-sm font-bold text-teal-deep dark:text-white">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fechar menu"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sand-ink transition-colors hover:bg-teal-mist dark:text-white dark:hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ul className="flex-1 overflow-y-auto px-3 py-4">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        closeAndNavigate(l.href);
                      }}
                      className="block rounded-xl px-3.5 py-3.5 text-base font-medium text-sand-ink transition-colors hover:bg-teal-mist dark:text-white/90 dark:hover:bg-white/5"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="shrink-0 border-t border-sand-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-white/10">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-teal-deep px-5 py-3.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-teal"
                >
                  <MessageCircle className="h-4 w-4" />
                  Agendar pelo WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
