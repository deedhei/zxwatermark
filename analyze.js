const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
// const open = require("open");

function analyzeDependencies(packageJsonPath, depth, jsonFilePath) {
  const packageJson = require(packageJsonPath);
  const dependencies = packageJson.dependencies || {};
  const graph = {};

  function traverseDependencies(pkgName, pkgVersion, currentDepth) {
    if (currentDepth > depth) {
      return;
    }

    if (!graph[pkgName]) {
      graph[pkgName] = pkgVersion;
    } else if (graph[pkgName] !== pkgVersion) {
      graph[pkgName] = "multiple versions";
    }

    const pkgPath = path.dirname(
      require.resolve(`${pkgName}/package.json`, { paths: [process.cwd()] })
    );
    const pkgJsonPath = path.join(pkgPath, "package.json");
    const pkgJson = require(pkgJsonPath);
    const pkgDependencies = pkgJson.dependencies || {};

    for (const depName in pkgDependencies) {
      const depVersion = pkgDependencies[depName];
      const dep = `${depName}@${depVersion}`;

      if (!graph[depKey]) {
        graph[depKey] = {};
        traverseDependencies(depName, depVersion, currentDepth + 1);
      }
    }
  }
  console.log("[Log] packageJson-->", packageJson);
  traverseDependencies(packageJson.name, packageJson.version, 0);

  if (jsonFilePath) {
    fs.writeFileSync(jsonFilePath, JSON.stringify(graph, null, 2));
  } else {
    // Render dependency graph in a web page
    const htmlPath = path.join(__dirname, "index.html");
    fs.writeFileSync(htmlPath, generateHtml(graph));

    // open(htmlPath);
    console.log("[Log] htmlPath-->", htmlPath);
  }
}

function generateHtml(graph) {
  // Generate HTML code for rendering the dependency graph
  // You can use any library or template engine of your choice

  return `
    <html>
      <head>
        <title>Dependency Graph</title>
        <style>
          /* CSS styles for the graph visualization */
        </style>
     head>
      <body        <h1>Dependency Graph</h1>
        <pre>${JSON.stringify(graph, null, 2)}</pre>
      </body>
    </html>
  `;
}

// Parse command line arguments
const args = process.argv.slice(2);
const depthIndex = args.indexOf("--depth");
const jsonIndex = args.indexOf("--json");
console.log("[Log] process.cwd()-->", process.cwd());
const packageJsonPath = path.join(process.cwd(), "package.json");
const depth = depthIndex !== -1 ? parseInt(args[depthIndex + 1], 10) : Infinity;
console.log("[Log] packageJsonPath-->", packageJsonPath);
const jsonFilePath = jsonIndex !== -1 ? args[jsonIndex + 1] : null;

analyzeDependencies(packageJsonPath, depth, jsonFilePath);
