import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UserRound } from "lucide-react";

export default function About() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="sobre" className="section-pad bg-teal-mist/60 transition-colors duration-300 dark:bg-teal-nightSoft">
      <div className="container-page grid items-center gap-9 sm:gap-11 md:gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="aspect-[4/5] w-full overflow-hidden rounded-xl3 shadow-lift">
            {imgOk ? (
              <img
                src="/images/sobre-gabriella.jpg"
                alt="Gabriella Elen, enfermeira responsável pela GE Enfermagem Domiciliar"
                className="h-full w-full object-cover"
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-teal-pale to-teal-soft/40 p-8 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white/70">
                  <UserRound className="h-9 w-9 text-teal-deep" strokeWidth={1.5} />
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-teal-deep/70">
                  Substitua por uma foto em
                  <br />
                  <code className="rounded bg-white/60 px-1">/public/images/sobre-gabriella.jpg</code>
                </p>
              </div>
            )}
          </div>
          <div className="absolute -right-5 -top-5 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-card dark:bg-teal-nightSoft">
            <ShieldCheck className="h-4 w-4 text-teal-mid dark:text-teal-soft" />
            <span className="text-xs font-semibold text-teal-deep dark:text-white">COREN ativo</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow">Sobre</span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-teal-deep dark:text-white sm:mt-4 xs:text-3xl md:text-4xl">
            Gabriella Elen
          </h2>
          <p className="mt-2 text-sm font-medium text-teal-mid dark:text-teal-soft">
            Enfermeira graduada e registrada no COREN
          </p>

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-sand-stone dark:text-white/65 sm:mt-6 sm:space-y-4 sm:text-base">
            <p>
              Atuo na assistência domiciliar com foco em um atendimento seguro,
              humanizado e individualizado, sempre atenta às particularidades
              de cada paciente e de cada família.
            </p>
            <p>
              Tenho experiência no cuidado de idosos e pacientes que necessitam
              de acompanhamento contínuo, oferecendo assistência técnica,
              orientação aos familiares e planejamento dos cuidados para
              promover mais qualidade de vida, conforto e segurança.
            </p>
          </div>

          <div className="mt-6 rounded-xl2 border border-sand-line bg-white p-5 dark:border-white/10 dark:bg-white/5 sm:mt-8 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-mid dark:text-teal-soft">
              Missão
            </p>
            <p className="mt-2 text-sm leading-relaxed text-sand-ink dark:text-white/80">
              Cuidar da saúde com segurança, dedicação e excelência, levando
              assistência de enfermagem ética e acolhedora ao lugar onde o
              paciente se sente mais confortável: a própria casa.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
