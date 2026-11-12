import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { AppShell } from "./shared/layout/AppShell";
import { HomePage } from "./modules/home/pages/HomePage";
import "./styles/index.css";
const root = document.getElementById("root");
const app = <StrictMode><AppShell><HomePage/></AppShell></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, app); else createRoot(root).render(app);
