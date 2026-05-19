const fs = require('fs');
const path = require('path');

const srcComponents = path.join(__dirname, 'src', 'components');
const destComponents = path.join(__dirname, 'beyond-reach-audit', 'components');

const srcPages = path.join(__dirname, 'src', 'pages');
const destApp = path.join(__dirname, 'beyond-reach-audit', 'app');

const srcPublic = path.join(__dirname, 'public');
const destPublic = path.join(__dirname, 'beyond-reach-audit', 'public');

const srcIndexCss = path.join(__dirname, 'src', 'index.css');
const destGlobalsCss = path.join(__dirname, 'beyond-reach-audit', 'app', 'globals.css');

// Helper to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Copy public assets
console.log('Copying public assets...');
copyDir(srcPublic, destPublic);

// 2. Copy components
console.log('Copying components...');
copyDir(srcComponents, destComponents);

// 3. Process components for Next.js
console.log('Updating React Router links to Next.js in components...');
function processFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processFiles(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace React Router with Next.js Link
      content = content.replace(/import\s+\{([^}]*?)Link([^}]*?)\}\s+from\s+['"]react-router-dom['"];?/g, "import Link from 'next/link';");
      
      // Replace to= with href= in Link components
      content = content.replace(/<Link([^>]*)to=/g, "<Link$1href=");
      
      // Replace useLocation, useNavigate
      if (content.includes('useLocation') || content.includes('useNavigate')) {
        content = content.replace(/import\s+\{([^}]*)\}\s+from\s+['"]react-router-dom['"];?/g, (match, imports) => {
          let newImports = "import { " + imports.replace('useNavigate', 'useRouter').replace('useLocation', 'usePathname') + " } from 'next/navigation';";
          if (!content.includes("import Link from 'next/link'")) {
            newImports = "import Link from 'next/link';\n" + newImports;
          }
          return newImports;
        });
        content = content.replace(/useNavigate\(\)/g, "useRouter()");
        content = content.replace(/useLocation\(\)/g, "usePathname()");
      }
      
      // Fix image paths if necessary (remove /public in case)
      content = content.replace(/['"]\/public\//g, "'/");

      // Ensure "use client" on components that use hooks or framer-motion
      if (content.includes('useState') || content.includes('useEffect') || content.includes('useRouter') || content.includes('usePathname') || content.includes('framer-motion')) {
        if (!content.startsWith('"use client"')) {
          content = '"use client";\n' + content;
        }
      }

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}
processFiles(destComponents);

// 4. Create App Router Pages
console.log('Generating Next.js App Router Pages...');

// Home Page
const homeSrc = path.join(srcPages, 'Home.jsx');
if (fs.existsSync(homeSrc)) {
  let homeContent = fs.readFileSync(homeSrc, 'utf8');
  homeContent = homeContent.replace(/import\s+\{([^}]*?)Link([^}]*?)\}\s+from\s+['"]react-router-dom['"];?/g, "import Link from 'next/link';");
  homeContent = homeContent.replace(/<Link([^>]*)to=/g, "<Link$1href=");
  if (!homeContent.startsWith('"use client"')) homeContent = '"use client";\n' + homeContent;
  fs.writeFileSync(path.join(destApp, 'page.jsx'), homeContent);
}

// Resorts Page
const resortsSrc = path.join(srcPages, 'Resorts.jsx');
if (fs.existsSync(resortsSrc)) {
  const resortsDir = path.join(destApp, 'resorts');
  if (!fs.existsSync(resortsDir)) fs.mkdirSync(resortsDir);
  let resortsContent = fs.readFileSync(resortsSrc, 'utf8');
  resortsContent = resortsContent.replace(/import\s+\{([^}]*?)Link([^}]*?)\}\s+from\s+['"]react-router-dom['"];?/g, "import Link from 'next/link';");
  resortsContent = resortsContent.replace(/<Link([^>]*)to=/g, "<Link$1href=");
  if (!resortsContent.startsWith('"use client"')) resortsContent = '"use client";\n' + resortsContent;
  
  // Also copy its CSS module if exists
  const resortsCss = path.join(srcPages, 'Resorts.module.css');
  if (fs.existsSync(resortsCss)) {
    fs.copyFileSync(resortsCss, path.join(resortsDir, 'Resorts.module.css'));
    // Update import path
    resortsContent = resortsContent.replace(/['"]\.\/Resorts\.module\.css['"]/g, "'./Resorts.module.css'");
  }
  fs.writeFileSync(path.join(resortsDir, 'page.jsx'), resortsContent);
}

// Work Page
const workSrc = path.join(srcComponents, 'Work.jsx'); // Work is currently in components
if (fs.existsSync(workSrc)) {
  const workDir = path.join(destApp, 'work');
  if (!fs.existsSync(workDir)) fs.mkdirSync(workDir);
  let workContent = fs.readFileSync(workSrc, 'utf8');
  workContent = workContent.replace(/import\s+\{([^}]*?)Link([^}]*?)\}\s+from\s+['"]react-router-dom['"];?/g, "import Link from 'next/link';");
  workContent = workContent.replace(/<Link([^>]*)to=/g, "<Link$1href=");
  if (!workContent.startsWith('"use client"')) workContent = '"use client";\n' + workContent;
  
  // Work.jsx is already copied to components, we just create a page wrapper
  const pageContent = `"use client";\nimport Work from '@/components/Work';\n\nexport default function WorkPage() {\n  return <Work />;\n}`;
  fs.writeFileSync(path.join(workDir, 'page.jsx'), pageContent);
}

// 5. Append index.css to globals.css
console.log('Merging CSS...');
if (fs.existsSync(srcIndexCss) && fs.existsSync(destGlobalsCss)) {
  const indexCssContent = fs.readFileSync(srcIndexCss, 'utf8');
  let globalsCssContent = fs.readFileSync(destGlobalsCss, 'utf8');
  
  if (!globalsCssContent.includes('Formula Condensed')) {
    fs.appendFileSync(destGlobalsCss, '\n\n' + indexCssContent);
  }
}

// 6. Update Layout to include Navbar and Footer
console.log('Updating Root Layout...');
const layoutPath = path.join(destApp, 'layout.jsx');
if (fs.existsSync(layoutPath)) {
  let layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  if (!layoutContent.includes('Navbar')) {
    layoutContent = layoutContent.replace(
      "export default function RootLayout({ children }) {",
      "import Navbar from '@/components/Navbar';\nimport Footer from '@/components/Footer';\nimport Menu from '@/components/Menu';\n\nexport default function RootLayout({ children }) {"
    );
  }
}

// Create a ClientLayoutWrapper for Navbar state
const wrapperContent = `"use client";
import React, { useState } from 'react';
import Navbar from './Navbar';
import Menu from './Menu';
import Footer from './Footer';
import PageTransition from './PageTransition';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Navbar onMenuClick={() => setIsMenuOpen(true)} />
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>
          {children}
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  );
}`;
fs.writeFileSync(path.join(destComponents, 'ClientLayoutWrapper.jsx'), wrapperContent);

// Update layout.jsx to use ClientLayoutWrapper
let newLayoutContent = `import './globals.css'
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'

export const metadata = {
  title: 'Beyond Reach',
  description: 'Precision Engineering & Design',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
`;
fs.writeFileSync(layoutPath, newLayoutContent);

// Fix jsconfig.json to allow @/ alias
const jsconfigContent = `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}`;
fs.writeFileSync(path.join(__dirname, 'beyond-reach-audit', 'jsconfig.json'), jsconfigContent);

console.log('Migration to Next.js complete! 🎉');
