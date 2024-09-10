import fs from "fs";
import path from "path";

/**
 * @typedef {Object} FileInfo
 * @property {string} path
 * @property {string} type
 * @property {number} size
 * @property {Date} lastModified
 * @property {number} lineCount
 * @property {Object} imports
 * @property {number} imports.total
 * @property {number} imports.external
 * @property {number} imports.local
 * @property {number} exports
 * @property {number} components
 * @property {number} hooks
 * @property {boolean} isClientComponent
 * @property {number} zodSchemas
 * @property {number} nextImageUsage
 * @property {number} nextLinkUsage
 * @property {number} tailwindClasses
 * @property {boolean} isApiRoute
 * @property {boolean} isPage
 */

function analyzeFile(filePath) {
  const stats = fs.statSync(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const imports = analyzeImports(content);
  const exports = countExports(content);
  const components = countComponents(content);
  const hooks = countHooks(content);
  const isClientComponent = checkIsClientComponent(content);
  const zodSchemas = countZodSchemas(content);
  const nextImageUsage = countNextImageUsage(content);
  const nextLinkUsage = countNextLinkUsage(content);
  const tailwindClasses = countTailwindClasses(content);
  const isApiRoute = checkIsApiRoute(filePath);
  const isPage = checkIsPage(filePath);
  const stateManagement = analyzeStateManagement(content);  // Nowa linia
  const performanceAnalysis = analyzePerformance(content);
  const apiAnalysis = analyzeAPI(content);
  const routingAnalysis = analyzeRouting(content, filePath);
  const seoAnalysis = analyzeSEO(content, filePath);
  const typeScriptAnalysis = analyzeTypeScript(content, filePath);

  return {
    path: filePath,
    type: path.extname(filePath),
    size: stats.size,
    lastModified: stats.mtime,
    lineCount: lines.length,
    imports,
    exports,
    components,
    hooks,
    isClientComponent,
    zodSchemas,
    nextImageUsage,
    nextLinkUsage,
    tailwindClasses,
    isApiRoute,
    isPage,
    stateManagement,
    performance: performanceAnalysis,
    api: apiAnalysis,
    routing: routingAnalysis,
    seo: seoAnalysis,
    typeScript: typeScriptAnalysis,
  };
}

function shouldSkipDirectory(dirName) {
  const skipDirs = ['node_modules', '.git', '.next', 'out', 'build', 'dist'];
  return skipDirs.includes(dirName);
}

function scanProjectStructure(dir) {
  const fileList = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      if (!shouldSkipDirectory(file)) {
        fileList.push(...scanProjectStructure(filePath));
      }
    } else {
      fileList.push(analyzeFile(filePath));
    }
  });

  return fileList;
}

function generateProjectStructureReport() {
  const rootDir = path.join(process.cwd());
  const allFiles = scanProjectStructure(rootDir);

  let report = `Aktualna struktura projektu (${allFiles.length} plików)\n\n`;

  // Dodajmy statystyki projektu
  const stats = calculateProjectStats(allFiles);
  report += `Statystyki projektu:\n`;
  report += `Całkowity rozmiar: ${(stats.totalSize / 1024 / 1024).toFixed(2)} MB\n`;
  report += `Całkowita liczba linii kodu: ${stats.totalLines}\n`;
  report += `Typy plików: ${JSON.stringify(stats.fileTypes)}\n\n`;

  // Generowanie struktury plików
  report += `Struktura plików projektu:\n`;
  report += generateFileStructure(rootDir, allFiles);
  report += '\n';

  // Szczegółowe informacje o każdym pliku
  report += `Szczegółowe informacje o plikach:\n\n`;
  allFiles.forEach((file) => {
    report += `Plik: ${file.path}\n`;
    report += `  Typ: ${file.type}\n`;
    report += `  Rozmiar: ${(file.size / 1024).toFixed(2)} KB\n`;
    report += `  Liczba linii: ${file.lineCount}\n`;
    report += `  Ostatnia modyfikacja: ${file.lastModified.toISOString()}\n`;
    report += `  Importy: ${file.imports.total} (zewnętrzne: ${file.imports.external}, lokalne: ${file.imports.local})\n`;
    report += `  Eksporty: ${file.exports}\n`;
    report += `  Komponenty: ${file.components}\n`;
    report += `  Hooki: ${file.hooks}\n`;
    report += `  Komponent kliencki: ${file.isClientComponent ? 'Tak' : 'Nie'}\n`;
    report += `  Schematy Zod: ${file.zodSchemas}\n`;
    report += `  Użycie Next Image: ${file.nextImageUsage}\n`;
    report += `  Użycie Next Link: ${file.nextLinkUsage}\n`;
    report += `  Klasy Tailwind: ${file.tailwindClasses}\n`;
    report += `  Trasa API: ${file.isApiRoute ? 'Tak' : 'Nie'}\n`;
    report += `  Strona: ${file.isPage ? 'Tak' : 'Nie'}\n\n`;
    report += `  Zarządzanie stanem:\n`;
    report += `    useState: ${file.stateManagement.useState}\n`;
    report += `    useReducer: ${file.stateManagement.useReducer}\n`;
    report += `    Redux: ${file.stateManagement.redux}\n`;
    report += `    MobX: ${file.stateManagement.mobx}\n`;
    report += `    Recoil: ${file.stateManagement.recoil}\n`;
    report += `    Zustand: ${file.stateManagement.zustand}\n\n`;
    report += `  Analiza wydajności:\n`;
    report += `    useMemo: ${file.performance.useMemo}\n`;
    report += `    useCallback: ${file.performance.useCallback}\n`;
    report += `    React.memo: ${file.performance.reactMemo}\n`;
    report += `    Potencjalne duże listy: ${file.performance.potentialPerformanceIssues.largeLists}\n`;
    report += `    Brak wirtualizacji: ${file.performance.potentialPerformanceIssues.missingVirtualization ? 'Tak' : 'Nie'}\n`;
    if (file.performance.optimizationHints.length > 0) {
      report += `    Wskazówki optymalizacyjne:\n`;
      file.performance.optimizationHints.forEach(hint => {
        report += `      - ${hint}\n`;
      });
    }
    report += '\n';
    report += `  Analiza API:\n`;
    report += `    Metody HTTP:\n`;
    Object.entries(file.api.httpMethods).forEach(([method, count]) => {
      report += `      ${method}: ${count}\n`;
    });
    report += `    Struktury danych:\n`;
    report += `      Ciała zapytań: ${file.api.dataStructures.requestBodies.length}\n`;
    report += `      Struktury odpowiedzi: ${file.api.dataStructures.responseStructures.length}\n`;
    report += `    Frameworki API:\n`;
    Object.entries(file.api.apiFrameworks).forEach(([framework, used]) => {
      report += `      ${framework}: ${used ? 'Tak' : 'Nie'}\n`;
    });
    report += `    Obsługa błędów: ${file.api.errorHandling}\n`;
    report += '\n';
    report += `  Analiza routingu:\n`;
    report += `    Biblioteka routingu: ${file.routing.routingLibrary}\n`;
    report += `    Trasy statyczne: ${file.routing.staticRoutes}\n`;
    report += `    Trasy dynamiczne: ${file.routing.dynamicRoutes}\n`;
    report += `    Trasy stron Next.js: ${file.routing.nextjsPageRoutes}\n`;
    report += `    Trasy Express.js: ${file.routing.expressRoutes}\n`;
    report += `    Trasy React Router: ${file.routing.reactRouterRoutes}\n`;
    report += `    Łączna liczba tras: ${file.routing.totalRoutes}\n`;
    report += '\n';
    report += `  Analiza SEO:\n`;
    report += `    Metadane:\n`;
    Object.entries(file.seo.metadata).forEach(([key, value]) => {
      report += `      ${key}: ${value}\n`;
    });
    report += `    Strukturyzowane dane:\n`;
    Object.entries(file.seo.structuredData).forEach(([key, value]) => {
      report += `      ${key}: ${value}\n`;
    });
    report += `    Nagłówki:\n`;
    Object.entries(file.seo.headings).forEach(([key, value]) => {
      report += `      ${key}: ${value}\n`;
    });
    report += `    Obrazy: ${file.seo.images.total} (z atrybutem alt: ${file.seo.images.withAlt})\n`;
    report += `    Linki: wewnętrzne - ${file.seo.links.internal}, zewnętrzne - ${file.seo.links.external}\n`;
    report += `    URL kanoniczny: ${file.seo.canonicalUrl}\n`;
    report += `    Meta robots: ${file.seo.robotsMeta}\n`;
    if (file.seo.nextJsSeo) {
      report += `    Next.js SEO:\n`;
      Object.entries(file.seo.nextJsSeo).forEach(([key, value]) => {
        report += `      ${key}: ${value}\n`;
      });
    }
    report += '\n';
    if (file.typeScript) {
      report += `  Analiza TypeScript:\n`;
      report += `    Adnotacje typów: ${file.typeScript.typeAnnotations}\n`;
      report += `    Interfejsy: ${file.typeScript.interfaces}\n`;
      report += `    Typy: ${file.typeScript.types}\n`;
      report += `    Generyki: ${file.typeScript.generics}\n`;
      report += `    Asercje typów: ${file.typeScript.typeAssertions}\n`;
      report += `    Złożone typy:\n`;
      Object.entries(file.typeScript.complexTypes).forEach(([key, value]) => {
        report += `      ${key}: ${value}\n`;
      });
      report += `    Funkcje TypeScript:\n`;
      Object.entries(file.typeScript.typeScriptFeatures).forEach(([key, value]) => {
        report += `      ${key}: ${value}\n`;
      });
    }
    report += '\n';
  });

  const { dependencies, devDependencies } = analyzeDependencies();
  report += `Zależności: ${dependencies}\n`;
  report += `Zależności deweloperskie: ${devDependencies}\n\n`;

  const typeScriptStats = calculateTypeScriptStats(allFiles);
  report += `Statystyki TypeScript:\n`;
  report += `  Wykorzystanie TypeScript: ${typeScriptStats.typeScriptUsage.toFixed(2)}%\n`;
  report += `  Średnia liczba adnotacji typów na plik: ${typeScriptStats.averageTypeAnnotations.toFixed(2)}\n`;
  report += `  Całkowita liczba interfejsów: ${typeScriptStats.totalInterfaces}\n`;
  report += `  Całkowita liczba typów: ${typeScriptStats.totalTypes}\n`;
  report += `  Średnia liczba złożonych typów na plik: ${typeScriptStats.averageComplexTypes.toFixed(2)}\n`;
  report += '\n';

  const reportPath = path.join(process.cwd(), "project-structure-report.txt");
  fs.writeFileSync(reportPath, report, "utf-8");

  console.log(`Raport został zapisany w pliku: ${reportPath}`);

  return report;
}

function calculateProjectStats(files) {
  let totalSize = 0;
  let totalLines = 0;
  let fileTypes = {};

  files.forEach(file => {
    totalSize += file.size;
    totalLines += file.lineCount;
    fileTypes[file.type] = (fileTypes[file.type] || 0) + 1;
  });

  return { totalSize, totalLines, fileTypes };
}

export { generateProjectStructureReport };

function analyzeImports(content) {
  const importLines = content.match(/import .+ from .+/g) || [];
  const externalImports = importLines.filter(line => !line.includes('./') && !line.includes('../')).length;
  return {
    total: importLines.length,
    external: externalImports,
    local: importLines.length - externalImports
  };
}

function countExports(content) {
  return (content.match(/export /g) || []).length;
}

function countComponents(content) {
  const functionComponents = (content.match(/function \w+\(.*\).*{/g) || []).length;
  const arrowComponents = (content.match(/const \w+ = (\(.*\))?\s*=>/g) || []).length;
  return functionComponents + arrowComponents;
}

function countHooks(content) {
  return (content.match(/use[A-Z]\w+/g) || []).length;
}

function checkIsClientComponent(content) {
  return content.includes('"use client"');
}

function countZodSchemas(content) {
  return (content.match(/z\.\w+\(/g) || []).length;
}

function countNextImageUsage(content) {
  return (content.match(/<Image/g) || []).length;
}

function countNextLinkUsage(content) {
  return (content.match(/<Link/g) || []).length;
}

function countTailwindClasses(content) {
  const classNames = content.match(/className="[^"]+"/g) || [];
  return classNames.reduce((count, className) => count + className.split(' ').length, 0);
}

function checkIsApiRoute(filePath) {
  return filePath.includes('/api/');
}

function checkIsPage(filePath) {
  return filePath.includes('/pages/') || filePath.endsWith('page.tsx');
}

function analyzeDependencies() {
  const packagePath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    const dependencies = Object.keys(packageJson.dependencies || {}).length;
    const devDependencies = Object.keys(packageJson.devDependencies || {}).length;
    return { dependencies, devDependencies };
  }
  return { dependencies: 0, devDependencies: 0 };
}

function generateFileStructure(rootDir, allFiles, indent = '') {
  let structure = '';
  const dirContent = fs.readdirSync(rootDir);

  dirContent.forEach((item, index) => {
    const itemPath = path.join(rootDir, item);
    const isLast = index === dirContent.length - 1;
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory() && !shouldSkipDirectory(item)) {
      structure += `${indent}${isLast ? '└── ' : '├── '}${item}/\n`;
      structure += generateFileStructure(itemPath, allFiles, indent + (isLast ? '    ' : '│   '));
    } else if (stats.isFile()) {
      const fileInfo = allFiles.find(f => f.path === itemPath);
      if (fileInfo) {
        structure += `${indent}${isLast ? '└── ' : '├── '}${item} (${fileInfo.type}, ${(fileInfo.size / 1024).toFixed(2)} KB)\n`;
      }
    }
  });

  return structure;
}

function analyzeStateManagement(content) {
  return {
    useState: (content.match(/useState\(/g) || []).length,
    useReducer: (content.match(/useReducer\(/g) || []).length,
    redux: (content.match(/useSelector\(|useDispatch\(|createSlice\(|configureStore\(/g) || []).length,
    mobx: (content.match(/observer\(|observable\(|action\(/g) || []).length,
    recoil: (content.match(/useRecoilState\(|useRecoilValue\(|atom\(|selector\(/g) || []).length,
    zustand: (content.match(/create\(|useStore\(/g) || []).length,
  };
}

function analyzePerformance(content) {
  const useMemoCount = (content.match(/useMemo\(/g) || []).length;
  const useCallbackCount = (content.match(/useCallback\(/g) || []).length;
  const reactMemoCount = (content.match(/React\.memo\(/g) || []).length;
  
  // Wykrywanie dużych list
  const largeListPatterns = [
    /\.map\(\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}(?!\s*\)\s*\.\s*slice)/g,
    /\.forEach\(\s*\([^)]*\)\s*=>\s*\{[\s\S]*?\}/g,
    /for\s*\([^)]*\)\s*\{[\s\S]*?<[^>]+>[^<]*<\/[^>]+>/g
  ];
  
  const potentialLargeLists = largeListPatterns.reduce((count, pattern) => {
    const matches = content.match(pattern);
    return count + (matches ? matches.length : 0);
  }, 0);

  // Wykrywanie użycia wirtualizacji
  const virtualizationUsed = /react-window|react-virtualized/.test(content);

  return {
    useMemo: useMemoCount,
    useCallback: useCallbackCount,
    reactMemo: reactMemoCount,
    potentialPerformanceIssues: {
      largeLists: potentialLargeLists,
      missingVirtualization: potentialLargeLists > 0 && !virtualizationUsed
    },
    optimizationHints: generateOptimizationHints(useMemoCount, useCallbackCount, reactMemoCount, potentialLargeLists, virtualizationUsed)
  };
}

function generateOptimizationHints(useMemoCount, useCallbackCount, reactMemoCount, potentialLargeLists, virtualizationUsed) {
  const hints = [];

  if (useMemoCount === 0 && useCallbackCount === 0 && reactMemoCount === 0) {
    hints.push("Rozważ użycie useMemo, useCallback lub React.memo do optymalizacji renderowania.");
  }

  if (potentialLargeLists > 0 && !virtualizationUsed) {
    hints.push("Wykryto potencjalnie duże listy. Rozważ użycie wirtualizacji (np. react-window lub react-virtualized) dla lepszej wydajności.");
  }

  if (useMemoCount > 10 || useCallbackCount > 10) {
    hints.push("Duża liczba użyć useMemo/useCallback. Upewnij się, że są one rzeczywiście potrzebne i nie powodują nadmiernej optymalizacji.");
  }

  return hints;
}

function analyzeAPI(content) {
  const httpMethods = {
    GET: (content.match(/\.get\(|method:\s*['"]GET/g) || []).length,
    POST: (content.match(/\.post\(|method:\s*['"]POST/g) || []).length,
    PUT: (content.match(/\.put\(|method:\s*['"]PUT/g) || []).length,
    DELETE: (content.match(/\.delete\(|method:\s*['"]DELETE/g) || []).length,
    PATCH: (content.match(/\.patch\(|method:\s*['"]PATCH/g) || []).length,
  };

  const dataStructures = analyzeDataStructures(content);

  const apiFrameworks = {
    axios: content.includes('axios'),
    fetch: content.includes('fetch('),
    superagent: content.includes('superagent'),
    graphql: content.includes('graphql'),
  };

  const errorHandling = (content.match(/\.catch\(|try\s*{[\s\S]*?}\s*catch/g) || []).length;

  return {
    httpMethods,
    dataStructures,
    apiFrameworks,
    errorHandling,
  };
}

function analyzeDataStructures(content) {
  const structures = {
    requestBodies: [],
    responseStructures: [],
  };

  // Analiza ciał zapytań
  const requestBodyMatches = content.match(/body:\s*{[\s\S]*?}/g) || [];
  requestBodyMatches.forEach(match => {
    const fields = match.match(/\w+:/g) || [];
    structures.requestBodies.push(fields.map(f => f.replace(':', '')));
  });

  // Analiza struktur odpowiedzi
  const responseStructureMatches = content.match(/\.then\(\s*(?:function\s*\([^)]*\)|[^)]*=>\s*{)[\s\S]*?}\)/g) || [];
  responseStructureMatches.forEach(match => {
    const fields = match.match(/data\.(\w+)/g) || [];
    structures.responseStructures.push(fields.map(f => f.replace('data.', '')));
  });

  return structures;
}

function analyzeRouting(content, filePath) {
  const isRoutingFile = /routes?|pages?/i.test(filePath);
  
  const staticRoutes = (content.match(/['"]\/[^'"]+['"]/g) || []).length;
  const dynamicRoutes = (content.match(/\[.*?\]/g) || []).length;
  
  const nextjsPageRoutes = isRoutingFile ? 1 : 0;
  
  const expressRoutes = (content.match(/app\.(get|post|put|delete|patch)\s*\(/g) || []).length;
  
  const reactRouterRoutes = (content.match(/<Route/g) || []).length;
  
  const totalRoutes = staticRoutes + dynamicRoutes + nextjsPageRoutes + expressRoutes + reactRouterRoutes;

  const routingLibrary = detectRoutingLibrary(content);

  return {
    staticRoutes,
    dynamicRoutes,
    nextjsPageRoutes,
    expressRoutes,
    reactRouterRoutes,
    totalRoutes,
    routingLibrary,
  };
}

function detectRoutingLibrary(content) {
  if (content.includes('next/router') || content.includes('next/navigation')) {
    return 'Next.js';
  } else if (content.includes('react-router-dom')) {
    return 'React Router';
  } else if (content.includes('express')) {
    return 'Express.js';
  } else {
    return 'Nieznana';
  }
}

function analyzeSEO(content, filePath) {
  const metadata = {
    title: (content.match(/<title>.*?<\/title>/g) || []).length + (content.match(/name="title"/g) || []).length,
    description: (content.match(/name="description"/g) || []).length,
    keywords: (content.match(/name="keywords"/g) || []).length,
    ogTags: (content.match(/property="og:/g) || []).length,
    twitterTags: (content.match(/name="twitter:/g) || []).length,
  };

  const structuredData = {
    jsonLd: (content.match(/<script type="application\/ld\+json">/g) || []).length,
    microdata: (content.match(/itemtype="http:\/\/schema.org\//g) || []).length,
  };

  const headings = {
    h1: (content.match(/<h1/g) || []).length,
    h2: (content.match(/<h2/g) || []).length,
    h3: (content.match(/<h3/g) || []).length,
  };

  const images = {
    total: (content.match(/<img/g) || []).length,
    withAlt: (content.match(/<img[^>]+alt=["'][^"']+["']/g) || []).length,
  };

  const links = {
    internal: (content.match(/href=["']\/[^"']+["']/g) || []).length,
    external: (content.match(/href=["']https?:\/\/[^"']+["']/g) || []).length,
  };

  const canonicalUrl = (content.match(/<link rel="canonical"/g) || []).length;

  const robotsMeta = (content.match(/name="robots"/g) || []).length;

  const isNextJs = filePath.includes('pages') || filePath.includes('app');
  const nextJsSeo = isNextJs ? analyzeNextJsSeo(content) : null;

  return {
    metadata,
    structuredData,
    headings,
    images,
    links,
    canonicalUrl,
    robotsMeta,
    nextJsSeo,
  };
}

function analyzeNextJsSeo(content) {
  return {
    nextSeo: (content.match(/import.*?next-seo/g) || []).length > 0,
    head: (content.match(/<Head>/g) || []).length,
    metaTags: (content.match(/<meta/g) || []).length,
  };
}

function analyzeTypeScript(content, filePath) {
  const isTypeScriptFile = filePath.endsWith('.ts') || filePath.endsWith('.tsx');
  
  if (!isTypeScriptFile) {
    return null;
  }

  const typeAnnotations = (content.match(/:\s*[A-Za-z<>[\](){}|&]+/g) || []).length;
  const interfaces = (content.match(/interface\s+\w+/g) || []).length;
  const types = (content.match(/type\s+\w+\s*=/g) || []).length;
  const generics = (content.match(/<[A-Za-z,\s]+>/g) || []).length;
  const typeAssertions = (content.match(/as\s+[A-Za-z<>[\](){}|&]+/g) || []).length;

  const complexTypes = analyzeComplexTypes(content);

  return {
    typeAnnotations,
    interfaces,
    types,
    generics,
    typeAssertions,
    complexTypes,
    typeScriptFeatures: analyzeTypeScriptFeatures(content),
  };
}

function analyzeComplexTypes(content) {
  const unionTypes = (content.match(/[A-Za-z]+(\s*\|\s*[A-Za-z]+)+/g) || []).length;
  const intersectionTypes = (content.match(/[A-Za-z]+(\s*&\s*[A-Za-z]+)+/g) || []).length;
  const mappedTypes = (content.match(/{\s*\[\w+\s+in\s+[A-Za-z]+\]:/g) || []).length;
  const conditionalTypes = (content.match(/[A-Za-z]+\s+extends\s+[A-Za-z]+\s*\?\s*[A-Za-z]+\s*:\s*[A-Za-z]+/g) || []).length;

  return {
    unionTypes,
    intersectionTypes,
    mappedTypes,
    conditionalTypes,
  };
}

function analyzeTypeScriptFeatures(content) {
  return {
    nullishCoalescing: (content.match(/\?\?/g) || []).length,
    optionalChaining: (content.match(/\?\./) || []).length,
    nonNullAssertion: (content.match(/!\./g) || []).length,
    enumUsage: (content.match(/enum\s+\w+/g) || []).length,
  };
}

// Dodaj tę funkcję na końcu pliku, aby obliczyć ogólne statystyki TypeScript dla projektu
function calculateTypeScriptStats(allFiles) {
  const typeScriptFiles = allFiles.filter(file => file.typeScript);
  const totalFiles = allFiles.length;
  const typeScriptFileCount = typeScriptFiles.length;

  const totalStats = typeScriptFiles.reduce((acc, file) => {
    Object.entries(file.typeScript).forEach(([key, value]) => {
      if (typeof value === 'number') {
        acc[key] = (acc[key] || 0) + value;
      } else if (typeof value === 'object') {
        acc[key] = acc[key] || {};
        Object.entries(value).forEach(([subKey, subValue]) => {
          acc[key][subKey] = (acc[key][subKey] || 0) + subValue;
        });
      }
    });
    return acc;
  }, {});

  return {
    typeScriptUsage: (typeScriptFileCount / totalFiles) * 100,
    averageTypeAnnotations: totalStats.typeAnnotations / typeScriptFileCount,
    totalInterfaces: totalStats.interfaces,
    totalTypes: totalStats.types,
    averageComplexTypes: (
      totalStats.complexTypes.unionTypes +
      totalStats.complexTypes.intersectionTypes +
      totalStats.complexTypes.mappedTypes +
      totalStats.complexTypes.conditionalTypes
    ) / typeScriptFileCount,
    // Dodaj więcej statystyk według potrzeb
  };
}
