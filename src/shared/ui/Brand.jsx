import { templateConfig as site } from "../../config/template.config";
export function Brand() {
  return <a className="brand" href="#inicio" aria-label={`${site.displayName} — início`}><img className="brand-logo" src="./assets/lino-castro-logo.webp" width="640" height="441" alt="Lino Castro Advocacia" /></a>;
}
