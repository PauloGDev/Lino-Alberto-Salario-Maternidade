export function applyBrand(brand) {
  const root = document.documentElement;
  Object.entries(brand.colors).forEach(([name, value]) => root.style.setProperty(`--color-${name}`, value));
  root.style.setProperty("--font-display", brand.fonts.display);
  root.style.setProperty("--font-body", brand.fonts.body);
  root.style.setProperty("--radius", brand.radius);
}
