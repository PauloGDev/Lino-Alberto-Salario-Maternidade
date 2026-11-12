import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { createElement } from "react";
const server = await createServer({ server: { middlewareMode: true }, appType: "custom" });
try {
 const { AppShell } = await server.ssrLoadModule("/src/shared/layout/AppShell.jsx");
 const { HomePage } = await server.ssrLoadModule("/src/modules/home/pages/HomePage.jsx");
 const markup = renderToString(createElement(AppShell, null, createElement(HomePage)));
 const html = await readFile("dist/index.html", "utf8");
 if (!html.includes('<div id="root"></div>')) throw new Error("Ponto de montagem não encontrado.");
 await writeFile("dist/index.html", html.replace('<div id="root"></div>', () => '<div id="root">' + markup + '</div>'));
 console.log("HTML pré-renderizado: conteúdo inicial e hidratação React preservados.");
} finally { await server.close(); }
