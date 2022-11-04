const pluginRev = require("eleventy-plugin-rev");
const eleventySass = require("eleventy-sass");
const esbuild = require("esbuild");


module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./tailwind.config.js')
  eleventyConfig.addWatchTarget('./css/tailwind.css')
  eleventyConfig.addWatchTarget("./src/js/");

  eleventyConfig.on("eleventy.before", async () => {
    await esbuild.build({
      entryPoints: [
        "src/js/index.js",
        // "src/js/copy.js"
      ],
      bundle: true,
      sourcemap: false,
      outdir: "dist/js",
    });
  });


  eleventyConfig.addPlugin(pluginRev);
  eleventyConfig.addPlugin(eleventySass, {
    compileOptions: {
      permalink: function (permalinkString, inputPath) {
        return (data) => {
          return data.page.filePathStem.replace(/^\/scss\//, "/css/") + ".css";
        };
      },
    },
    sass: {
      style: "compressed",
      sourceMap: false,
    },
    rev: true,
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  // eleventyConfig.addPassthroughCopy("src/styles");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
