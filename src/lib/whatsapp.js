// Número real do WhatsApp da clínica (+55 31 97235-4867).
export const WHATSAPP_NUMBER = "5531972354867";

export function whatsappLink(message) {
  const text = encodeURIComponent(
    message ||
      "Olá! Gostaria de agendar um atendimento de enfermagem domiciliar."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
