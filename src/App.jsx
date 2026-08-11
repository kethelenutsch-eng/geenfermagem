import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import About from "./components/About";
import Differentials from "./components/Differentials";
import ServiceArea from "./components/ServiceArea";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfUse from "./components/TermsOfUse";
import CookieConsent from "./components/CookieConsent";

function HomePage() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-teal-night">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <HowItWorks />
        <About />
        <Differentials />
        <ServiceArea />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

// Roteamento bem simples, sem depender de react-router: o site tem só três
// URLs (home + duas páginas legais), então checar window.location.pathname
// direto evita adicionar uma biblioteca inteira só para isso. O vercel.json
// garante que essas URLs funcionem mesmo em acesso direto/atualização de
// página (não só navegando a partir da home).
const PAGES = {
  "/politica-de-privacidade": PrivacyPolicy,
  "/termos-de-uso": TermsOfUse,
};

export default function App() {
  const Page = PAGES[window.location.pathname] ?? HomePage;
  return (
    <>
      <Page />
      <CookieConsent />
    </>
  );
}
