import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Brand } from "../ui/Brand";
export function Header() {
 const [open, setOpen] = useState(false);
 const close = () => setOpen(false);
 return <header className="site-header"><div className="container header-inner"><Brand /><button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="main-navigation">{open ? <X /> : <Menu />}</button><nav id="main-navigation" aria-label="Navegação principal" className={open ? "nav open" : "nav"} onKeyDown={e => { if(e.key === "Escape") { close(); e.currentTarget.previousElementSibling.focus(); } }}><a href="#atuacao" onClick={close}>Atuação</a><a href="#como-funciona" onClick={close}>Como funciona</a><a href="#escritorio" onClick={close}>O advogado</a><a href="#faq" onClick={close}>Dúvidas</a><a className="outline-button nav-button" href="#contato" onClick={close}>Fale com o advogado <ArrowUpRight aria-hidden="true" /></a></nav></div></header>;
}
