import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Load the handler module code to extract functions
const moduleCode = fs.readFileSync(path.join(__dirname, 'api/send-email.cjs'), 'utf8');

// Extract function definitions using regex
const sanitizeMatch = moduleCode.match(/function sanitize\(input\) \{[\s\S]*?return input\.replace[^}]*\}/);
const generateHTMLMatch = moduleCode.match(/function generateEmailHTML\(data\) \{[\s\S]*?return `[\s\S]*?`\.trim\(\);\s*\}/);
const generateTextMatch = moduleCode.match(/function generateEmailText\(data\) \{[\s\S]*?return `[\s\S]*?`\.trim\(\);\s*\}/);

if (!sanitizeMatch || !generateHTMLMatch || !generateTextMatch) {
  console.error('Could not extract email template functions from api/send-email.cjs');
  process.exit(1);
}

// Create the sanitize function
const sanitize = eval('(' + sanitizeMatch[0] + ')');

// Create template generator functions
const generateEmailHTML = new Function('data', 'sanitize', `
  ${sanitizeMatch[0]}
  ${generateHTMLMatch[0].substring(sanitizeMatch[0].length + 1)}
`);

const generateEmailText = new Function('data', `
  ${generateTextMatch[0]}
`);

// Test data
const testData = {
  name: 'Preview Test User',
  email: 'preview@example.com',
  phone: '+971 54 545 7770',
  service: 'Performance Marketing',
  message: 'This is a preview of how the email will look.\n\nWith multiple lines.\n\nAnd special characters: <>&"\'\n\nÉmojis: 🚀💡'
};

console.log('========================================');
console.log('Email Template Preview Generator');
console.log('========================================\n');

try {
  const htmlContent = generateEmailHTML(testData, sanitize);
  const textContent = generateEmailText(testData);

  // Save HTML preview
  const htmlPath = path.join(__dirname, 'email-preview.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log('✓ HTML preview saved to:', htmlPath);

  // Save text preview
  const textPath = path.join(__dirname, 'email-preview.txt');
  fs.writeFileSync(textPath, textContent);
  console.log('✓ Text preview saved to:', textPath);

  console.log('\nPreview Data:');
  console.log('- HTML size:', htmlContent.length, 'bytes');
  console.log('- Text size:', textContent.length, 'bytes');
  console.log('\nOpen email-preview.html in a browser to see the rendered email.');
  console.log('');
} catch (error) {
  console.error('Error generating email previews:', error.message);
  console.error(error.stack);
  process.exit(1);
}
