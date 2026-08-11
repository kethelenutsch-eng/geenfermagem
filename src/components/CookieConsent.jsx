import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "ge-cookie-consent";

// Aviso de cookies/armazenamento local, exigido pela LGPD/GDPR para
// transparência com quem visita o site — mesmo o site usando só
// localStorage (tema + este próprio aceite), sem cookies de rastreamento.
// Formato de card flutuante (não barra ocupando a largura toda) para
// combinar com o resto do site — mesma linguagem visual dos cards e do
// modal de depoimentos (cantos arredondados, sombra "lift", selo circular).
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
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-sm rounded-xl3 border border-sand-line bg-white p-5 shadow-lift dark:border-white/10 dark:bg-teal-nightSoft sm:inset-x-auto sm:bottom-6 sm:right-6 sm:p-6"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Fechar aviso"
            className="tap-area absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-sand-stone transition-colors hover:bg-teal-pale hover:text-teal-deep dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid h-10 w-10 place-items-center rounded-full bg-teal-pale text-teal-deep dark:bg-white/10 dark:text-teal-soft">
            <Cookie className="h-5 w-5" strokeWidth={1.75} />
          </div>

          <p className="mt-3.5 pr-4 font-display text-[15px] font-bold text-teal-deep dark:text-white">
            Sua privacidade
          </p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-sand-stone dark:text-white/65">
            Usamos apenas armazenamento local do navegador para lembrar sua preferência de tema e este
            aceite — sem cookies de rastreamento ou publicidade. Saiba mais na{" "}
            <a
              href="/politica-de-privacidade"
              className="font-medium text-teal-mid underline underline-offset-2 hover:text-teal-deep dark:text-teal-soft dark:hover:text-white"
            >
              Política de Privacidade
            </a>
            .
          </p>

          <button
            type="button"
            onClick={accept}
            className="tap-area mt-4 w-full rounded-full bg-teal-deep px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-colors hover:bg-teal"
          >
            Entendi e aceito
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
