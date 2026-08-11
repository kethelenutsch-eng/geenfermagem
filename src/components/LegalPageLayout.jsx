import { ArrowLeft } from "lucide-react";
import LogoMark from "./LogoMark";
import Footer from "./Footer";

// Layout compartilhado pelas páginas legais (Política de Privacidade,
// Termos de Uso) — cabeçalho simples com volta para a home + rodapé igual
// ao resto do site, sem repetir a navbar cheia de âncoras que não fazem
// sentido fora da página principal.
export default function LegalPageLayout({ title, updatedAt, children }) {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-teal-night">
      <header className="border-b border-sand-line dark:border-white/10">
        <div className="container-page flex h-20 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <LogoMark variant="dark" className="h-10 dark:hidden" />
            <LogoMark variant="light" className="hidden h-10 dark:block" />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-deep transition-colors hover:text-teal dark:text-white/80 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao site
          </a>
        </div>
      </header>

      <main className="section-pad">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-3xl font-bold tracking-tight text-teal-deep dark:text-white sm:text-4xl">
              {title}
            </h1>
            {updatedAt && (
              <p className="mt-2 text-sm text-sand-stone dark:text-white/55">
                Última atualização: {updatedAt}
              </p>
            )}

            <div className="prose-legal mt-8 space-y-6 text-[15px] leading-relaxed text-sand-ink dark:text-white/80">
              {children}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
