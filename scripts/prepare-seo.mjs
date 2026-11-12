import { readFile, writeFile } from "node:fs/promises";

const data = JSON.parse(await readFile("landing.data.json", "utf8"));
const siteUrl = data.project.siteUrl.trim().replace(/\/$/, "");
const ready = Boolean(data.approval.readyToPublish && data.professional.oab && siteUrl);
const robots = ready ? "index, follow, max-image-preview:large" : "noindex, follow, max-image-preview:large";
const escapeAttribute = value => String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const schemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      ...(siteUrl ? { "@id": `${siteUrl}/#website`, url: `${siteUrl}/` } : {}),
      name: data.project.displayName,
      inLanguage: "pt-BR",
    },
    {
      "@type": "LegalService",
      ...(siteUrl ? { "@id": `${siteUrl}/#escritorio`, url: `${siteUrl}/` } : { "@id": "#escritorio" }),
      name: data.project.displayName,
      telephone: `+${data.contact.whatsapp}`,
      ...(siteUrl ? { image: `${siteUrl}/assets/social.jpg` } : {}),
      ...(data.location.city ? { areaServed: { "@type": "City", name: data.location.city } } : {}),
      ...(data.contact.instagram ? { sameAs: [data.contact.instagram] } : {}),
      founder: { "@id": siteUrl ? `${siteUrl}/#profissional` : "#profissional" },
    },
    {
      "@type": "Person",
      "@id": siteUrl ? `${siteUrl}/#profissional` : "#profissional",
      name: data.professional.name,
      jobTitle: "Advogado",
      knowsAbout: ["Direito Previdenciário", "Salário-maternidade"],
      worksFor: { "@id": siteUrl ? `${siteUrl}/#escritorio` : "#escritorio" },
      ...(data.professional.oab ? { hasCredential: { "@type": "EducationalOccupationalCredential", name: data.professional.oab } } : {}),
    },
    {
      "@type": "FAQPage",
      ...(siteUrl ? { "@id": `${siteUrl}/#faq` } : {}),
      mainEntity: data.faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

const metaUrl = (property, content) => `<meta property="${property}" content="${escapeAttribute(content)}"/>`;
const canonical = siteUrl ? `<link rel="canonical" href="${siteUrl}/"/>` : "";
const socialMeta = siteUrl
  ? `${metaUrl("og:url", `${siteUrl}/`)}${metaUrl("og:image", `${siteUrl}/assets/social.jpg`)}<meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/><meta property="og:image:type" content="image/jpeg"/><meta property="og:image:alt" content="Gestante segurando uma imagem de ultrassom"/><meta name="twitter:card" content="summary_large_image"/>${metaUrl("twitter:image", `${siteUrl}/assets/social.jpg`)}<meta name="twitter:image:alt" content="Gestante segurando uma imagem de ultrassom"/>`
  : `<meta name="twitter:card" content="summary"/>`;

const html = `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${escapeAttribute(data.seo.title)}</title>
<meta name="description" content="${escapeAttribute(data.seo.description)}"/>
<meta name="author" content="${escapeAttribute(data.professional.name)}"/>
<meta name="theme-color" content="${data.theme.secondary}"/>
<meta name="robots" content="${robots}"/><meta name="googlebot" content="${robots}"/>
${canonical}<link rel="icon" type="image/svg+xml" href="./assets/favicon.svg"/><link rel="manifest" href="./site.webmanifest"/>
<meta property="og:type" content="website"/><meta property="og:locale" content="pt_BR"/>${metaUrl("og:site_name", data.project.displayName)}${metaUrl("og:title", data.seo.title)}${metaUrl("og:description", data.seo.description)}${socialMeta}
${metaUrl("twitter:title", data.seo.title)}${metaUrl("twitter:description", data.seo.description)}
<script type="application/ld+json">${JSON.stringify(schemas).replaceAll("<", "\\u003c")}</script>
</head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`;

await writeFile("index.html", html);
await writeFile("public/robots.txt", ready
  ? `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
  : "User-agent: *\nAllow: /\n# Prévia não indexável: configuração de publicação pendente.\n");
await writeFile("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${ready ? `<url><loc>${siteUrl}/</loc></url>` : ""}</urlset>\n`);
await writeFile("public/site.webmanifest", JSON.stringify({
  name: data.project.displayName,
  short_name: data.project.name,
  lang: "pt-BR",
  start_url: "./",
  display: "browser",
  background_color: "#ffffff",
  theme_color: data.theme.secondary,
  icons: [{ src: "./assets/favicon.svg", sizes: "any", type: "image/svg+xml" }],
}));
console.log(ready ? "SEO preparado para publicação." : "Prévia com noindex: configuração de publicação pendente.");
