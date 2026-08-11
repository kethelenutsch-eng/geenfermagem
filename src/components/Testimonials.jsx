import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageSquarePlus, Quote, X, Check } from "lucide-react";
import { getSupabase, supabaseEnabled } from "../lib/supabase";
import { whatsappLink } from "../lib/whatsapp";

const MAX_DOTS = 8;
const QUOTE_MAX = 500;
const AUTHOR_MAX = 80;
// Se a rede/Supabase ficar realmente fora do ar, o cliente pode ficar
// tentando de novo por um bom tempo antes de desistir. Isso garante que a
// seção nunca fique travada no "carregando" além desse limite.
const NETWORK_TIMEOUT_MS = 8000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const loadTestimonials = useCallback(async () => {
    if (!supabaseEnabled) {
      setLoading(false);
      return;
    }
    // Qualquer falha aqui (rede fora do ar, Supabase indisponível, etc.)
    // não pode deixar a seção travada no esqueleto de carregamento para
    // sempre — cai para a mensagem de "nenhum depoimento ainda".
    try {
      const supabase = await getSupabase();
      const { data, error } = await withTimeout(
        supabase
          .from("testimonials")
          .select("id, author, role, quote")
          .eq("approved", true)
          .order("created_at", { ascending: false })
          .limit(24),
        NETWORK_TIMEOUT_MS
      );
      if (!error && data) setTestimonials(data);
    } catch {
      // silencioso — a mensagem de fallback já cobre esse caso
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused || formOpen || testimonials.length <= 1) return;
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [paused, formOpen, next, testimonials.length]);

  // se a lista mudar (novo depoimento enviado) e o índice ficar fora do
  // alcance, volta pro início
  useEffect(() => {
    if (index >= testimonials.length) setIndex(0);
  }, [testimonials.length, index]);

  const t = testimonials[index];

  const handleSubmitted = (row) => {
    setTestimonials((prev) => [row, ...prev]);
    setIndex(0);
    setFormOpen(false);
  };

  return (
    <section className="section-pad bg-teal-mist/60 transition-colors duration-300 dark:bg-teal-nightSoft">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Depoimentos</span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-teal-deep dark:text-white sm:mt-4 xs:text-3xl md:text-4xl">
            Famílias que confiam no cuidado GE
          </h2>
        </div>

        <div
          className="relative mx-auto mt-9 max-w-3xl sm:mt-10 md:mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="mx-auto h-8 w-8 text-teal-soft sm:h-9 sm:w-9" strokeWidth={1.5} />

          <div className="relative mt-5 min-h-[180px] sm:mt-6 sm:min-h-[220px]">
            {loading ? (
              <div className="mx-auto max-w-2xl animate-pulse space-y-3 px-4">
                <div className="mx-auto h-5 w-5/6 rounded-full bg-sand-line dark:bg-white/10" />
                <div className="mx-auto h-5 w-2/3 rounded-full bg-sand-line dark:bg-white/10" />
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center">
                <p className="mx-auto max-w-md font-display text-lg font-medium leading-relaxed text-sand-stone dark:text-white/70">
                  Seja a primeira pessoa a contar como foi sua experiência com o cuidado GE.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {t && (
                  <motion.figure
                    key={t.id ?? index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center"
                  >
                    <blockquote className="mx-auto max-w-2xl font-display text-lg font-medium leading-relaxed text-sand-ink dark:text-white/90 xs:text-xl md:text-2xl">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-5 sm:mt-6">
                      <p className="text-sm font-semibold text-teal-deep dark:text-white">{t.author}</p>
                      {t.role && <p className="text-xs text-sand-stone dark:text-white/55">{t.role}</p>}
                    </figcaption>
                  </motion.figure>
                )}
              </AnimatePresence>
            )}
          </div>

          {testimonials.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8 sm:gap-6">
              <button
                onClick={prev}
                aria-label="Depoimento anterior"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sand-line bg-white text-teal-deep transition-colors hover:bg-teal-pale dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 lg:h-10 lg:w-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {testimonials.length > MAX_DOTS ? (
                <span className="text-xs font-medium text-sand-stone dark:text-white/55">
                  {index + 1} de {testimonials.length}
                </span>
              ) : (
                <div className="flex items-center gap-3 sm:gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Ir para depoimento ${i + 1}`}
                      className={`tap-area h-2 rounded-full transition-all ${
                        i === index ? "w-6 bg-teal-deep dark:bg-teal-soft" : "w-2 bg-sand-line hover:bg-teal-soft dark:bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={next}
                aria-label="Próximo depoimento"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-sand-line bg-white text-teal-deep transition-colors hover:bg-teal-pale dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 lg:h-10 lg:w-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}

          <div className="mt-7 flex justify-center sm:mt-10">
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-teal-deep/20 bg-white px-5 py-2.5 text-sm font-semibold text-teal-deep transition-colors hover:border-teal-deep/40 hover:bg-teal-pale dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10"
            >
              <MessageSquarePlus className="h-4 w-4" />
              Deixar meu depoimento
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {formOpen && <TestimonialFormModal onClose={() => setFormOpen(false)} onSubmitted={handleSubmitted} />}
      </AnimatePresence>
    </section>
  );
}

function TestimonialFormModal({ onClose, onSubmitted }) {
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [quote, setQuote] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | error | done
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && status !== "sending" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const quoteTooShort = quote.trim().length > 0 && quote.trim().length < 10;
  const canSubmit =
    author.trim().length >= 2 && quote.trim().length >= 10 && quote.length <= QUOTE_MAX && consent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // bot preencheu o campo invisível — ignora silenciosamente
    if (!canSubmit) return;

    if (!supabaseEnabled) {
      setStatus("error");
      setErrorMsg("O envio de depoimentos ainda está sendo configurado neste site.");
      return;
    }

    setStatus("sending");
    try {
      const supabase = await getSupabase();
      const { data, error } = await withTimeout(
        supabase
          .from("testimonials")
          .insert({ author: author.trim(), role: role.trim() || null, quote: quote.trim() })
          .select("id, author, role, quote")
          .single(),
        NETWORK_TIMEOUT_MS
      );

      if (error || !data) {
        setStatus("error");
        setErrorMsg("Não foi possível enviar agora. Você pode tentar de novo ou mandar pelo WhatsApp.");
        return;
      }

      setStatus("done");
      setTimeout(() => onSubmitted(data), 900);
    } catch {
      setStatus("error");
      setErrorMsg("Não foi possível enviar agora. Você pode tentar de novo ou mandar pelo WhatsApp.");
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Deixar um depoimento"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={() => status !== "sending" && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md rounded-xl3 bg-white p-6 shadow-lift dark:bg-teal-nightSoft sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={status === "sending"}
          aria-label="Fechar"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-sand-stone transition-colors hover:bg-teal-pale hover:text-teal-deep disabled:opacity-40 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {status === "done" ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-teal-pale text-teal-deep dark:bg-white/10 dark:text-teal-soft">
              <Check className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <p className="font-display text-lg font-bold text-teal-deep dark:text-white">Obrigada por compartilhar!</p>
            <p className="text-sm text-sand-stone dark:text-white/65">Seu depoimento já está no site.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="font-display text-xl font-bold text-teal-deep dark:text-white">Deixe seu depoimento</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-sand-stone dark:text-white/65">
              Conte como foi sua experiência com o cuidado GE. Seu depoimento aparece no site assim que você enviar.
            </p>

            {/* honeypot — invisível para pessoas, atrai bots simples */}
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="t-author" className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-mid dark:text-teal-soft">
                  Seu nome
                </label>
                <input
                  id="t-author"
                  type="text"
                  required
                  maxLength={AUTHOR_MAX}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Como quer ser identificado(a)"
                  className="mt-1.5 w-full rounded-xl2 border border-sand-line bg-white px-4 py-2.5 text-base text-sand-ink outline-none transition-colors focus:border-teal-mid dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                />
              </div>

              <div>
                <label htmlFor="t-role" className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-mid dark:text-teal-soft">
                  Sua relação (opcional)
                </label>
                <input
                  id="t-role"
                  type="text"
                  maxLength={AUTHOR_MAX}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex.: Familiar de paciente, Cuidador(a)..."
                  className="mt-1.5 w-full rounded-xl2 border border-sand-line bg-white px-4 py-2.5 text-base text-sand-ink outline-none transition-colors focus:border-teal-mid dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="t-quote" className="text-xs font-semibold uppercase tracking-[0.1em] text-teal-mid dark:text-teal-soft">
                    Seu depoimento
                  </label>
                  <span className="text-[11px] text-sand-stone dark:text-white/40">
                    {quote.length}/{QUOTE_MAX}
                  </span>
                </div>
                <textarea
                  id="t-quote"
                  required
                  rows={4}
                  maxLength={QUOTE_MAX}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Conte com suas palavras como foi o atendimento..."
                  className="mt-1.5 w-full resize-none rounded-xl2 border border-sand-line bg-white px-4 py-2.5 text-base leading-relaxed text-sand-ink outline-none transition-colors focus:border-teal-mid dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                />
                {quoteTooShort && (
                  <p className="mt-1 text-xs text-red-500 dark:text-red-400">Escreva um pouco mais (mínimo 10 caracteres).</p>
                )}
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-sand-stone dark:text-white/60">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-sand-line text-teal-deep focus:ring-teal-mid dark:border-white/20"
              />
              <span>
                Autorizo a publicação do meu depoimento neste site, conforme a{" "}
                <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Política de Privacidade
                </a>
                . Posso pedir a remoção a qualquer momento.
              </span>
            </label>

            {status === "error" && (
              <p className="mt-4 text-sm text-red-500 dark:text-red-400">
                {errorMsg}{" "}
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Falar no WhatsApp
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit || status === "sending"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-deep px-6 py-3 text-sm font-semibold text-white shadow-card transition-all hover:bg-teal disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "Enviando..." : "Enviar depoimento"}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
