const pluginRev = require("eleventy-plugin-rev");
const eleventySass = require("eleventy-sass");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRev);
  eleventyConfig.addPlugin(eleventySass, {
    sass: {
      style: "compressed",
      sourceMap: false
    },
    rev: true
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
