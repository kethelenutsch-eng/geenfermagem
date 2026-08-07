import { useState } from "react";

// Mostra a sua logo real assim que o arquivo existir em public/images/.
// Até lá, mostra o ícone provisório (o "GE" desenhado) no lugar, sem quebrar o layout.
//
// Para usar a sua própria logo (o ícone "GE", SEM o texto "Enfermagem Domiciliar"
// embaixo — esse texto já é escrito pelo código ao lado do ícone):
//   1. Exporte só o ícone GE do Canva/Figma como PNG com fundo transparente.
//   2. Salve como:
//        public/images/logo.png         -> versão escura, usada na navbar (fundo claro)
//        public/images/logo-branco.png  -> versão clara/branca, usada no rodapé (fundo escuro)
//   3. Pronto — a troca é automática, não precisa mexer em nenhum código.

const FALLBACK = (
  <svg viewBox="0 55 480 295" className="h-full w-auto" aria-hidden="true">
    <defs>
      <linearGradient id="logoMarkGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="currentColor" stopOpacity="1" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0.45" />
      </linearGradient>
    </defs>
    <text x="240" y="330" textAnchor="middle" fontFamily="'Playfair Display','Bodoni MT','Georgia','Times New Roman',serif" fontSize="300" fontWeight="700" letterSpacing="-32" fill="currentColor">GE</text>
    <path d="M110,222 C160,228 210,240 250,252 C275,232 295,212 320,200 C345,192 365,193 388,196 L388,212 C365,209 345,208 320,216 C295,228 275,248 250,268 C210,256 160,244 110,238 Z" fill="url(#logoMarkGrad)" />
  </svg>
);

export default function LogoMark({ variant = "dark", className = "h-14" }) {
  const [ok, setOk] = useState(true);
  const src = variant === "light" ? "/images/logo-branco.png" : "/images/logo.png";
  const colorClass = variant === "light" ? "text-white" : "text-teal-deep";

  if (!ok) {
    return <span className={`inline-block ${className} ${colorClass}`}>{FALLBACK}</span>;
  }

  return (
    <img
      src={src}
      alt="GE Enfermagem Domiciliar"
      className={`${className} w-auto object-contain`}
      onError={() => setOk(false)}
    />
  );
}
