/** @param {import("@11ty/eleventy/src/UserConfig")} config */
module.exports = config => {
  // config.addPassthroughCopy("src/**/")
  // config.addWatchTarget("./_site/*.css");
  // config.addWatchTarget("./_site/**/*.js");
  // config.addWatchTarget("src/index.css");
  // config.addWatchTarget("src/css/**/*.css");
  // filters - - - -
  global.filters = config.javascriptFunctions;
  config.setPugOptions({
    globals: ["filters"],
  });

  return {
    dir: {
      input: "src",
    },
  };
};
