import { Fragment } from "react";
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

  // Cada palavra vira um bloco "inline-block" com white-space:nowrap — as
  // letras dentro dela continuam animando uma a uma, mas a quebra de linha
  // só pode acontecer nos espaços entre palavras, nunca no meio de uma
  // (evita palavras cortadas tipo "Re-gião" quando o texto quebra linha).
  const words = text.split(" ");

  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="show"
      className="whitespace-normal break-words pb-5 pr-4 text-sm leading-relaxed text-sand-stone dark:text-white/65 sm:pr-10"
    >
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => (
              <motion.span key={ci} variants={letter} transition={{ duration: 0.25 }} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </motion.p>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="section-pad bg-white transition-colors duration-300 dark:bg-teal-night">
      <div className="container-page">
        <div className="grid gap-7 sm:gap-8 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-teal-deep dark:text-white sm:mt-4 xs:text-3xl md:text-4xl">
              Perguntas que recebemos com frequência
            </h2>
          </div>

          <div className="md:col-span-3">
            <Accordion type="single" collapsible defaultValue="item-0">
              {faqs.map((item, i) => (
                <AccordionItem key={item.question} value={`item-${i}`} className="border-sand-line dark:border-white/10">
                  <AccordionTrigger className="text-sm text-teal-deep dark:text-white sm:text-base">
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
