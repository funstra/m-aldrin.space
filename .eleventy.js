const Image = require("@11ty/eleventy-img");

function image(name, alt, sizes, height) {
  const src = `./src/assets/${name}`;
  const opt = {
    widths: [256, 384, 512, 768, 1024, 1536, 2048, 3072],
    filenameFormat: function (id, src, width, format, options) {
      return `${src.slice(
        src.lastIndexOf("/") + 1,
        src.lastIndexOf(".")
      )}-${width}.${format}`;
    },
    urlPath: "/img/",
    outputDir: "./_site/img/",
  };

  Image(src, opt);

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };
  let metadata = Image.statsSync(src, opt);
  return Image.generateHTML(metadata, imageAttributes);
}
/** @param {import("@11ty/eleventy/src/UserConfig")} config */
module.exports = config => {
  config.addWatchTarget("src/assets");
  // config.addPassthroughCopy("src/assets");

  // filters - - - -
  global.filters = {
    image,
    ...config.javascriptFunctions,
  };
  config.setPugOptions({
    globals: ["filters"],
  });

  return {
    dir: {
      input: "src",
    },
  };
};
