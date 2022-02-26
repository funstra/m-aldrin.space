module.exports = () => {
  return {
    tags: "writings",
    layout: "layouts/writing",
    permalink: "| /writing/#{page.fileSlug}/"
  };
};
