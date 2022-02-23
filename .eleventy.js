const csso = require("csso");
const terser = require("terser");
const pluginCSS = require("eleventy-postcss-extension");

/** @param {import("@11ty/eleventy/src/UserConfig")} config */
module.exports = config => {
  // filters - - - -
  global.filters = config.javascriptFunctions;
  config.setPugOptions({
    globals: ["filters"],
  });
  // // minify css - - - -
  // config.addTemplateFormats("css");
  // config.addExtension("css", {
  //   outputFileExtension: "css",
  //   compile: async function (content, path) {
  //     const res = csso.minify(content);
  //     return data => {
  //       return res.css;
  //     };
  //   },
  // });
  // postcss plugin - - - -
  // config.addPlugin(pluginCSS);
  // minify js - - - -
  config.addTemplateFormats("js");
  config.addExtension("js", {
    outputFileExtension: "js",
    compile: async function (inputContent, inputPath) {
      const result = await terser.minify(inputContent);
      return data => {
        return result.code;
      };
    },
  });

  return {
    dir: {
      input: "src",
    },
  };
};
