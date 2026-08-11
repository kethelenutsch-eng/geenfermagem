import { MessageCircle } from "lucide-react";
import { whatsappLink } from "../lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-teal-deep pt-4">
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:gap-5 sm:py-10 sm:text-left">
          <div className="leading-tight">
            <p className="font-display text-sm font-bold text-white">
              GE Enfermagem Domiciliar
            </p>
            <p className="mt-1 text-xs text-white/60">
              Cuidando da sua saúde com segurança, dedicação e excelência.
            </p>
          </div>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-area inline-flex items-center gap-2 text-sm font-semibold text-teal-soft transition-colors hover:text-white"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            Fale conosco pelo WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center gap-2 py-6 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} GE Enfermagem Domiciliar. Todos os direitos reservados.
          </p>
          <nav className="flex items-center gap-4 text-xs text-white/50">
            <a href="/politica-de-privacidade" className="transition-colors hover:text-white">
              Política de Privacidade
            </a>
            <a href="/termos-de-uso" className="transition-colors hover:text-white">
              Termos de Uso
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
