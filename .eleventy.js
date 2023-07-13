const pluginRev = require("eleventy-plugin-rev");
const eleventySass = require("eleventy-sass");
const esbuild = require("esbuild");
const inspect = require("util").inspect;
const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./tailwind.config.js");
  eleventyConfig.addWatchTarget("./css/tailwind.css");
  eleventyConfig.addWatchTarget("./src/js/");

  eleventyConfig.on("eleventy.before", async () => {
    await esbuild.build({
      entryPoints: [
        "src/js/index.js",
        "src/js/paginator.js",
        "src/js/typing.js",
        "src/js/share.js",
        "src/js/repo.js",
        "src/js/subscribe.js",
        "src/js/main.js"
      ],
      bundle: true,
      sourcemap: false,
      outdir: "_site/js",
    });
  });

  eleventyConfig.addFilter("date", (date) => {
    return new Intl.DateTimeFormat("en-US").format(new Date(date));
  });

  eleventyConfig.addFilter("shuffle", function (items, count, excludeTitle) {
    const shuffledItems = items
      .sort((a, b) => 0.5 - Math.random())
      .filter((item) => item.data.title !== excludeTitle);

    return shuffledItems.slice(0, count);
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter("threeOrMore", (n) => {
    return n >= 3;
  });

  eleventyConfig.addFilter("truncate", (str) => {
    let prepared = str.replace("<p>", "").replace("</p>");
    return prepared.length > 220 ? prepared.slice(0, 220) + "..." : prepared;
  });

  eleventyConfig.addFilter(
    "debug",
    (content) => `<pre>${inspect(content)}</pre>`
  );

  eleventyConfig.addPlugin(pluginRss);

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

  eleventyConfig.addPassthroughCopy({
    "node_modules/primeng/resources/themes/bootstrap4-light-blue/theme.css": "primeng/resources/themes/bootstrap4-light-blue/theme.css",
    "node_modules/primeng/resources/primeng.css": "primeng/resources/primeng.css",
    "node_modules/primeng/resources/primeng.min.css": "primeng/resources/primeng.min.css",
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
    },
  };
};
