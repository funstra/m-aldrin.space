/** @param {import("@11ty/eleventy/src/UserConfig")} config */
module.exports = config => {
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
