const fs = require("fs");
const path = require("path");

const prefix = "mf-header-footer-"; // Cambia según tu MFE
const dir = "./src";    // Carpeta base del MFE

// Regex para capturar clases dentro de class="..."
const classRegex = /class="([^"]+)"/g;

// Procesar todos los archivos recursivamente
function processDir(folder) {
  fs.readdirSync(folder).forEach(file => {
    const fullPath = path.join(folder, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith(".html") || file.endsWith(".ts")) {
      processFile(fullPath);
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  content = content.replace(classRegex, (match, classes) => {
    const updatedClasses = classes
      .split(/\s+/)
      .map(c => {
        // Si ya tiene prefijo o no es Tailwind, lo dejamos igual
        if (c.startsWith(prefix) || c === "" || c.startsWith("[") || c.startsWith("{")) {
          return c;
        }
        return prefix + c;
      })
      .join(" ");

    if (updatedClasses !== classes) {
      modified = true;
      return 'class="' + updatedClasses + '"';
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, "utf-8");
  }
}

processDir(dir);
console.log("🎉 Prefijo aplicado a todas las clases Tailwind");