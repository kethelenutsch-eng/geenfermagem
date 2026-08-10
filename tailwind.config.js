/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        // breakpoint extra entre o padrão "base" (celulares bem pequenos,
        // ~320-479px) e "sm" (640px) — cobre a faixa de celulares maiores
        // (390-430px) sem afetar tablet/desktop, que já usam sm/md/lg.
        xs: "480px",
      },
      colors: {
        teal: {
          deep: "#0F4C46",
          DEFAULT: "#1B6F63",
          mid: "#3E8E82",
          soft: "#7FBFA8",
          pale: "#E7F2EE",
          mist: "#F4FAF8",
          // Fundos do modo escuro — mesma família de cor da marca, só que
          // bem escura, para o site continuar com a "cara" dele à noite.
          night: "#0A211D",
          nightSoft: "#0F2A25",
        },
        sand: {
          ink: "#22322E",
          stone: "#65746F",
          line: "#E4EAE7",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        // Serifada elegante usada na marca (LogoMark) e em legendas de destaque.
        serif: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
      },
      borderRadius: {
        xl2: "18px",
        xl3: "20px",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(15,76,70,0.08), 0 16px 40px -12px rgba(15,76,70,0.14)",
        card: "0 1px 2px rgba(15,76,70,0.06), 0 8px 24px -8px rgba(15,76,70,0.16)",
        lift: "0 12px 32px -8px rgba(15,76,70,0.28)",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(18px,-24px) scale(1.05)" },
          "66%": { transform: "translate(-14px,16px) scale(0.97)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        blob: "blob 14s ease-in-out infinite",
        "blob-slow": "blob 20s ease-in-out infinite reverse",
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
