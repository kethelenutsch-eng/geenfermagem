import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { faqs } from "../data/content";

function BlurredStagger({ text }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.008 } },
  };
  const letter = {
    hidden: { opacity: 0, filter: "blur(8px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  };

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="show"
      className="whitespace-normal break-words pb-5 pr-4 text-sm leading-relaxed text-sand-stone dark:text-white/65 sm:pr-10"
    >
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={letter} transition={{ duration: 0.25 }} className="inline-block">
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </motion.p>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-pad bg-white transition-colors duration-300 dark:bg-teal-night">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-deep dark:text-white md:text-4xl">
              Perguntas que recebemos com frequência
            </h2>
          </div>

          <div className="md:col-span-3">
            <Accordion type="single" collapsible defaultValue="item-0">
              {faqs.map((item, i) => (
                <AccordionItem key={item.question} value={`item-${i}`} className="border-sand-line dark:border-white/10">
                  <AccordionTrigger className="text-base text-teal-deep dark:text-white">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <BlurredStagger text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
