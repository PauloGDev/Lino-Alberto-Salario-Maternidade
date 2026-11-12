import { displayName, phoneLabel, projectData, projectWhatsappUrl, whatsappDigits } from "./project.data";

export const templateConfig = {
  ...projectData,
  contact: { ...projectData.contact, phone: whatsappDigits },
  displayName,
  phoneLabel,
};

export function whatsappUrl(message = projectData.contact.whatsappMessage) {
  return projectWhatsappUrl(message);
}
