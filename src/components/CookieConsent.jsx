import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "ge-cookie-consent";

// Aviso de cookies/armazenamento local, exigido pela LGPD/GDPR para
// transparência com quem visita o site — mesmo o site usando só
// localStorage (tema + este próprio aceite), sem cookies de rastreamento.
// Card pequeno, ancorado no canto inferior esquerdo, para não competir com
// o conteúdo da tela nem parecer um bloqueio de página inteira.
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

  // Fechar pelo X só esconde por esta visita — sem gravar o aceite, o
  // aviso volta a aparecer depois. Só o botão principal grava o "accepted".
  const dismiss = () => setVisible(false);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // segue sem salvar — o aviso pode reaparecer na próxima visita, sem problema
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Aviso de cookies"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-3 left-3 z-[70] w-[calc(100%-1.5rem)] max-w-[220px] rounded-xl2 border border-sand-line bg-white p-3 shadow-lift dark:border-white/10 dark:bg-teal-nightSoft sm:bottom-4 sm:left-4"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Fechar aviso"
            className="tap-area absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full text-sand-stone transition-colors hover:bg-teal-pale hover:text-teal-deep dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-3 w-3" />
          </button>

          <div className="flex items-center gap-1.5 pr-4">
            <div className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal-pale text-teal-deep dark:bg-white/10 dark:text-teal-soft">
              <Cookie className="h-3 w-3" strokeWidth={2} />
            </div>
            <p className="font-display text-[11.5px] font-bold text-teal-deep dark:text-white">
              Sua privacidade
            </p>
          </div>

          <p className="mt-1.5 text-[10.5px] leading-snug text-sand-stone dark:text-white/65">
            Usamos armazenamento local só para lembrar suas preferências, sem cookies de rastreamento.{" "}
            <a
              href="/politica-de-privacidade"
              className="font-medium text-teal-mid underline underline-offset-2 hover:text-teal-deep dark:text-teal-soft dark:hover:text-white"
            >
              Saiba mais
            </a>
            .
          </p>

          <button
            type="button"
            onClick={accept}
            className="tap-area mt-2 w-full rounded-full bg-teal-deep px-3 py-1.5 text-[11px] font-semibold text-white shadow-card transition-colors hover:bg-teal"
          >
            Entendi e aceito
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
