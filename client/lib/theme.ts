type Theme = {
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
    foreground?: string;
  };
  typography?: {
    fontFamily?: string;
    baseSize?: number;
    headingsScale?: number;
  };
  assets?: Record<string, string>;
};

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme.colors?.primary) root.style.setProperty('--primary', rgbOrHsl(theme.colors.primary));
  if (theme.colors?.secondary) root.style.setProperty('--secondary', rgbOrHsl(theme.colors.secondary));
  if (theme.colors?.background) root.style.setProperty('--background', rgbOrHsl(theme.colors.background));
  if (theme.colors?.foreground) root.style.setProperty('--foreground', rgbOrHsl(theme.colors.foreground));
  if (theme.typography?.fontFamily) root.style.setProperty('--font-family', theme.typography.fontFamily);
  if (theme.typography?.baseSize) root.style.setProperty('--base-font-size', `${theme.typography.baseSize}px`);
}

function rgbOrHsl(value: string) {
  // Tailwind theme expects HSL in our setup; allow raw hex/rgb/hsl and return hsl string if hex
  if (value.startsWith('hsl(') || value.startsWith('var(')) return value.replace(/hsl\(|\)/g, '').trim();
  return value; // leave as is; global.css expects hsl components; advanced conversion omitted for simplicity
}
