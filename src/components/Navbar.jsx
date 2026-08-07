import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 shadow-soft backdrop-blur-md dark:bg-teal-night/80"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-20 items-center justify-between sm:h-24 lg:h-28">
        <a href="#topo" className="flex items-center gap-2 -ml-4">
          {/* variante escura da logo (texto/traço em teal) para fundo claro,
              e variante clara para quando o modo escuro estiver ativo */}
          <LogoMark variant="dark" className="h-12 sm:h-14 lg:h-16 dark:hidden" />
          <LogoMark variant="light" className="hidden h-12 dark:block sm:h-14 lg:h-16" />
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-sand-stone dark:text-white/50">
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

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sand-ink dark:text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-sand-line bg-white dark:border-white/10 dark:bg-teal-night lg:hidden">
          <ul className="container-page flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-sand-ink hover:bg-teal-mist dark:text-white/85 dark:hover:bg-white/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-teal-deep px-5 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Agendar pelo WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
