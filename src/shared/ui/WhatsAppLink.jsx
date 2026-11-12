import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "../../config/template.config";
export function WhatsAppLink({ children = "Conversar pelo WhatsApp", className = "light-button", floating = false }) { return <a className={className} href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label={floating ? "Conversar com Dr. Lino Castro pelo WhatsApp (abre em nova aba)" : undefined}>{floating ? <MessageCircle /> : <>{children}<ArrowUpRight aria-hidden="true" /></>}</a>; }
