import { defaultBrand } from "./brand.config";
import { projectData } from "./project.data";
export const appConfig={name:projectData.project.displayName,description:projectData.seo.description,brand:defaultBrand,features:{catalog:false,account:false,admin:false},navigation:[{label:"Atuação",to:"#atuacao"},{label:"Como funciona",to:"#como-funciona"},{label:"O advogado",to:"#escritorio"},{label:"Dúvidas",to:"#faq"}]};
