const pluginRev = require("eleventy-plugin-rev");
const eleventySass = require("eleventy-sass");

module.exports = function (eleventyConfig) {
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
  eleventyConfig.addPassthroughCopy("src/fonts");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
