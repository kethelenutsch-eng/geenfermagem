import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "ge-cookie-consent";

// Aviso simples de cookies/armazenamento local, exigido pela LGPD/GDPR para
// transparência com quem visita o site — mesmo o site usando só
// localStorage (tema + este próprio aceite), sem cookies de rastreamento.
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage indisponível (modo privado restrito, etc.) — não
      // exibe o aviso para não travar a navegação por algo não essencial
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // segue sem salvar — o aviso pode reaparecer na próxima visita, sem problema
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-sand-line bg-white/95 px-4 py-4 shadow-lift backdrop-blur-sm dark:border-white/10 dark:bg-teal-nightSoft/95 sm:px-6"
    >
      <div className="container-page flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-6">
        <p className="flex items-start gap-2.5 text-center text-sm leading-relaxed text-sand-ink dark:text-white/80 sm:text-left">
          <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-teal-mid" />
          <span>
            Usamos apenas armazenamento local do navegador para lembrar sua preferência de tema e este
            aceite — sem cookies de rastreamento ou publicidade. Saiba mais na nossa{" "}
            <a
              href="/politica-de-privacidade"
              className="font-medium text-teal-mid underline underline-offset-2 hover:text-teal-deep dark:text-teal-soft dark:hover:text-white"
            >
              Política de Privacidade
            </a>
            .
          </span>
        </p>
        <button
          type="button"
          onClick={accept}
          className="tap-area shrink-0 rounded-full bg-teal-deep px-6 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-teal"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
