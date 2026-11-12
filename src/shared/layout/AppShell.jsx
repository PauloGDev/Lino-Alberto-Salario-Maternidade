import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppLink } from "../ui/WhatsAppLink";
export function AppShell({children}) { return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header/><main id="conteudo" tabIndex="-1">{children}</main><Footer/><WhatsAppLink className="floating-whatsapp" floating /></>; }
