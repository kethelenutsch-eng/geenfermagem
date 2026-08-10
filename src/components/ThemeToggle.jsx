import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Sem escolha salva no navegador, o padrão é sempre o modo claro — não
// segue a preferência de tema do sistema operacional de quem visita.
function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("ge-theme");
  return stored === "dark" ? "dark" : "light";
}

// Botão de alternância claro/escuro — mesmo espírito do switch com ícones
// de sol/lua, só que nas cores da marca: trilho escuro com o sol quando o
// site está claro, trilho claro com a lua quando o site está escuro.
export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    window.localStorage.setItem("ge-theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`tap-area relative inline-flex h-[28px] w-[52px] shrink-0 items-center rounded-full border transition-colors duration-300 ${
        isDark ? "border-teal-pale/40 bg-teal-pale" : "border-teal-deep bg-teal-deep"
      } ${className}`}
    >
      <span
        className={`absolute left-[3px] top-[3px] grid h-[20px] w-[20px] place-items-center rounded-full shadow-card transition-transform duration-300 ${
          isDark ? "translate-x-[24px] bg-teal-deep" : "translate-x-0 bg-white"
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-teal-soft" strokeWidth={2.25} />
        ) : (
          <Sun className="h-3 w-3 text-teal-mid" strokeWidth={2.25} />
        )}
      </span>
    </button>
  );
}
