import {
  Droplet,
  HeartPulse,
  Syringe,
  Stethoscope,
  NotebookPen,
  ShieldCheck,
  HeartHandshake,
  Users,
  GraduationCap,
  PhoneCall,
  ClipboardCheck,
  HomeIcon,
  CalendarCheck2,
} from "lucide-react";

export const services = [
  {
    icon: Droplet,
    title: "Cateteres e Sondas",
    items: [
      "Cateterismo vesical de demora",
      "Cateterismo vesical de alívio",
      "Troca de sonda nasoenteral (SNE)",
      "Troca de sonda nasogástrica (SNG)",
      "Cuidados com gastrostomia (GTT)",
    ],
  },
  {
    icon: HeartPulse,
    title: "Curativos Especializados",
    items: [
      "Curativos simples e complexos",
      "Feridas cirúrgicas",
      "Lesões por pressão",
      "Queimaduras",
      "Curativo de PICC",
      "Retirada de pontos",
    ],
  },
  {
    icon: Syringe,
    title: "Administração de Medicamentos",
    items: [
      "Via intramuscular (IM)",
      "Via intravenosa (EV)",
      "Via subcutânea (SC)",
      "Via intradérmica (ID)",
    ],
  },
  {
    icon: Stethoscope,
    title: "Consulta de Enfermagem",
    items: [
      "Avaliação clínica completa",
      "Plano de cuidados individualizado",
      "Organização e acompanhamento da medicação",
      "Acompanhamento de pacientes acamados e crônicos",
      "Avaliação e prevenção de lesões por pressão",
      "Educação em saúde e orientação a cuidadores",
    ],
  },
  {
    icon: NotebookPen,
    title: "Caderno de Evolução Personalizado",
    description:
      "Um caderno de evolução exclusivo para cada paciente, construído conforme as necessidades clínicas e a rotina de cuidados, para registrar o dia a dia, padronizar as informações e orientar cuidadores e familiares com mais segurança.",
  },
];

export const trustPoints = [
  { icon: ShieldCheck, label: "Registro ativo no COREN" },
  { icon: HomeIcon, label: "Atendimento 100% domiciliar" },
  { icon: ClipboardCheck, label: "Plano de cuidados individualizado" },
  { icon: HeartHandshake, label: "Atendimento humanizado" },
];

export const timeline = [
  {
    icon: PhoneCall,
    title: "Contato",
    description:
      "Você fala com a gente pelo WhatsApp e conta um pouco sobre a necessidade do paciente.",
  },
  {
    icon: ClipboardCheck,
    title: "Avaliação",
    description:
      "Realizamos uma avaliação clínica completa para entender o quadro e montar o plano de cuidados.",
  },
  {
    icon: HomeIcon,
    title: "Atendimento em domicílio",
    description:
      "O cuidado acontece no conforto da casa do paciente, com técnica, ética e atenção aos detalhes.",
  },
  {
    icon: CalendarCheck2,
    title: "Acompanhamento",
    description:
      "Evolução registrada, família orientada e cuidados ajustados sempre que necessário.",
  },
];

export const differentials = [
  {
    icon: HeartHandshake,
    title: "Atendimento personalizado",
    description: "Cada plano de cuidados é pensado para a rotina e as necessidades reais do paciente.",
  },
  {
    icon: ShieldCheck,
    title: "Registro ativo no COREN",
    description: "Enfermeira graduada, com registro ativo no Conselho Regional de Enfermagem.",
  },
  {
    icon: GraduationCap,
    title: "Base científica",
    description: "Assistência fundamentada nas melhores práticas e evidências da enfermagem.",
  },
  {
    icon: Users,
    title: "Orientação à família",
    description: "Cuidadores e familiares acompanhados de perto, com orientação clara em cada etapa.",
  },
  {
    icon: HeartHandshake,
    title: "Ética e responsabilidade",
    description: "Compromisso com a qualidade da assistência em cada visita, do início ao fim.",
  },
];

export const cities = [
  { name: "Belo Horizonte", hub: true },
  { name: "Vespasiano" },
  { name: "Lagoa Santa" },
  { name: "São José da Lapa" },
  { name: "Santa Luzia" },
  { name: "Confins" },
];

// Depoimentos de exemplo — substitua pelos relatos reais de pacientes/famílias atendidos.
export const testimonials = [
  {
    quote:
      "O cuidado com minha mãe foi além do que eu esperava. Além da parte técnica, sempre explicaram cada passo com muita paciência para toda a família.",
    author: "Depoimento de exemplo",
    role: "Familiar de paciente atendido",
  },
  {
    quote:
      "Ter um plano de cuidados organizado e um caderno de evolução fez toda a diferença no dia a dia dos cuidadores.",
    author: "Depoimento de exemplo",
    role: "Cuidadora familiar",
  },
  {
    quote:
      "Atendimento pontual, humano e muito profissional. Me senti segura em cada visita.",
    author: "Depoimento de exemplo",
    role: "Paciente atendida",
  },
];

export const faqs = [
  {
    question: "Quais regiões vocês atendem?",
    answer:
      "Atendemos Belo Horizonte e toda a Região Metropolitana, incluindo Vespasiano, Lagoa Santa, São José da Lapa, Santa Luzia, Confins e cidades vizinhas.",
  },
  {
    question: "Como funciona o agendamento?",
    answer:
      "O primeiro passo é o contato pelo WhatsApp. A partir daí, fazemos uma avaliação inicial, montamos o plano de cuidados e agendamos o atendimento no domicílio.",
  },
  {
    question: "Quem realiza os atendimentos?",
    answer:
      "A assistência é prestada pela enfermeira Gabriella Elen, graduada e com registro ativo no COREN, com experiência em cuidado domiciliar de idosos e pacientes em acompanhamento contínuo.",
  },
  {
    question: "É preciso ter equipamentos ou materiais em casa?",
    answer:
      "Cada caso é avaliado individualmente. Durante a avaliação, você recebe orientação clara sobre o que é necessário providenciar para o atendimento.",
  },
  {
    question: "O que é o caderno de evolução personalizado?",
    answer:
      "É um material exclusivo, elaborado para cada paciente, que padroniza o registro diário dos cuidados e orienta cuidadores e familiares, tornando o acompanhamento mais seguro e organizado.",
  },
];
