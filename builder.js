const { build } = require("esbuild");
const { dependencies, peerDependencies } = require("./package.json");
const { dtsPlugin } = require("esbuild-plugin-d.ts");

build({
  entryPoints: ["src/index.ts"],
  outfile: "./lib/index.js",
  bundle: true,
  minify: true,
  external: Object.keys(dependencies || {}).concat(
    Object.keys(peerDependencies || {}),
  ),
  platform: "node",
  plugins: [dtsPlugin()],
  format: "esm",
});
