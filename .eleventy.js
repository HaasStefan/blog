const pluginRev = require("eleventy-plugin-rev");
const eleventySass = require("eleventy-sass");
const esbuild = require("esbuild");
const inspect = require("util").inspect;

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget('./tailwind.config.js')
  eleventyConfig.addWatchTarget('./css/tailwind.css')
  eleventyConfig.addWatchTarget("./src/js/");

  eleventyConfig.on("eleventy.before", async () => {
    await esbuild.build({
      entryPoints: [
        "src/js/index.js",
        "src/js/paginator.js",
        "src/js/typing.js",
        "src/js/share.js"
      ],
      bundle: true,
      sourcemap: false,
      outdir: "dist/js",
    });
  });

  eleventyConfig.addFilter("date", (date) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(date))
  });

  eleventyConfig.addFilter("threeOrMore", (n) => {
    return n >= 3;
  });

  eleventyConfig.addFilter("truncate", (str) => {
    let prepared = str.replace("<p>", "").replace("</p>");
    return prepared.length > 220 ? prepared.slice(0, 220) + "..." : prepared
  });

  eleventyConfig.addFilter("debug", (content) => `<pre>${inspect(content)}</pre>`);



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
    markdownTemplateEngine: 'njk',
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
