import { templateConfig as site } from "../../config/template.config";
export function Brand() { return <a className="brand" href="#inicio" aria-label={`${site.displayName} — início`}><span className="brand-mark" aria-hidden="true">LA</span><span className="brand-name">Lino Alberto<small>ADVOCACIA</small></span></a>; }
