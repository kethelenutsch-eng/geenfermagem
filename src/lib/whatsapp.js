// Número real do WhatsApp da clínica (+55 31 99119-6877).
export const WHATSAPP_NUMBER = "5531991196877";

export function whatsappLink(message) {
  const text = encodeURIComponent(
    message ||
      "Olá! Gostaria de agendar um atendimento de enfermagem domiciliar."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
