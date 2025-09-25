import { rmSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const outDir = join(process.cwd(), "dist", "spa");

try {
  if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>DBT Salud — Deploy OK</title>
  <style>
    :root { color-scheme: light dark; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; background: #f9fafb; color: #111827; }
    main { text-align: center; }
    h1 { font-size: 2rem; margin: 0 0 .25rem; }
    p { margin: 0; color: #374151; }
  </style>
</head>
<body>
  <main>
    <h1>Deploy OK</h1>
    <p>Versión en blanco temporal</p>
  </main>
</body>
</html>`;

  writeFileSync(join(outDir, "index.html"), html);
  writeFileSync(join(outDir, "200.html"), html);
  console.log("Blank build created at", outDir);
} catch (err) {
  console.error("Failed to create blank build:", err);
  process.exit(1);
}
