import "./lib/data-page";
if (location.pathname === "/") {
  import("./tree").then(module => {
    module.init()
  });
}
