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

export default function App() {
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
