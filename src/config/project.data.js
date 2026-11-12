import landingData from "../../landing.data.json";

export const whatsappDigits = String(landingData.contact.whatsapp || "").replace(/\D/g, "");
const nationalPhone = whatsappDigits.startsWith("55") ? whatsappDigits.slice(2) : whatsappDigits;

export const projectData = landingData;
export const displayName = landingData.project.displayName || landingData.professional.officeName || landingData.professional.name;
export const phoneLabel = nationalPhone.length === 11
  ? nationalPhone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
  : nationalPhone || "Informar depois";

export function projectWhatsappUrl(message = landingData.contact.whatsappMessage) {
  if (!/^\d{12,13}$/.test(whatsappDigits)) return "#contato";
  return `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(message)}`;
}
