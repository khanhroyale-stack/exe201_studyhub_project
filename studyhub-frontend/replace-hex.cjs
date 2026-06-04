const fs = require('fs');
const path = require('path');

const colorMap = {
  '#003d9b': 'primary',
  '#c4d2ff': 'on-primary-container',
  '#00687b': 'secondary',
  '#afecff': 'secondary-fixed',
  '#191c1e': 'on-surface',
  '#434654': 'on-surface-variant',
  '#c3c6d6': 'outline-variant',
  '#f8f9fb': 'surface',
  '#f3f4f6': 'surface-container-low',
  '#edeef0': 'surface-container',
  '#e7e8ea': 'surface-container-high',
  '#dae2ff': 'primary-fixed',
  '#001848': 'on-primary-fixed',
  '#ffb950': 'tertiary-fixed-dim',
  '#ffca81': 'on-tertiary-container',
  '#7d5200': 'tertiary-container',
  '#624000': 'on-tertiary-fixed-variant',
  '#0052cc': 'primary-container',
  '#ba1a1a': 'error',
  '#ffdad6': 'error-container'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  for (const [hex, token] of Object.entries(colorMap)) {
    // Replace hex codes in square brackets like bg-[#003d9b] -> bg-primary
    const regex1 = new RegExp(`\\\\[${hex}\\\\]`, 'gi');
    if (regex1.test(content)) {
      content = content.replace(regex1, token);
      changed = true;
    }
    // Also remove any literal token strings that now have brackets around them
    // wait, if we replaced `[#003d9b]` with `primary` it will become `bg-primary`, which is correct because the brackets are replaced too!
    // Wait, the regex `\\[#003d9b\\]` matches `[#003d9b]`.
    // Replacing it with `primary` makes `bg-[#003d9b]` into `bg-primary`. This is perfectly correct!
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated: ' + filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir('./src');
console.log('Done replacement phase 1');
