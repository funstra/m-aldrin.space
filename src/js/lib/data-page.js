import zip from "./zip.js";

const dynamicImport = (pathName, scriptName) => {
  if (location.pathname === pathName) {
    import(scriptName);
  }
};

// Fetch html string and return a new html document
/**
 * @param {string} href
 * @returns {Promise<{page: Document,title: string}>}
 */
const getHTML = async href => {
  const res = await fetch(href);
  const page = new DOMParser().parseFromString(await res.text(), "text/html");
  return { page, title: page.querySelector("title").innerHTML };
};

// Query [data-page] elements
/**
 * @param {Document} doc
 * @returns {{elm:HTMLElement,val:String}[]}
 */
const dataPageAttr = doc => {
  return Array.from(doc.querySelectorAll("[data-page]")).map(elm => ({
    elm,
    val: elm.getAttribute("data-page"),
  }));
};

// Get the diff between destination/source page
/**
 *  @param {Document} destination
 * @returns {Promise<[{elm:HTMLElement,val:String},{elm:HTMLElement,val:String}]>}
 */
const diffPage = async destination => {
  const [destDataPages, srcDataPages] = [destination, document].map(
    dataPageAttr
  );
  const zipedDataPages = zip(destDataPages, srcDataPages);
  for (const [dest, src] of zipedDataPages) {
    if (dest.val !== src.val) {
      return [dest, src];
    }
  }
  return [null, null];
};

// sets the page
/**
 * @param {object} o
 * @param {string} o.pathname
 * @param {string} o.href
 */
const setPage = async ({ pathname, href }) => {
  const destinationDocument = await getHTML(href);
  const [dest, src] = await diffPage(destinationDocument.page);

  // console.log(dest.val);
  if (
    dest.val.startsWith("layouts/writing") ||
    dest.val.startsWith("/writings/")
  ) {
    src.elm.parentElement.classList.add("f-col");
  } else {
    src.elm.parentElement.classList.remove("f-col");
  }

  // src.elm.style.height = "50%";
  // src.elm.style.opacity = "0";
  // src.elm.classList.add("slideOut");
  // dest.elm.classList.add("slideIn");
  document.documentElement.classList.add("time-out");
  src.elm.classList.add("slideOut");
  dest.elm.classList.add("slideIn");
  setTimeout(() => {
    src.elm.remove();
    dest.elm.classList.remove("slideIn");
    document.documentElement.classList.remove("time-out");
  }, 125);

  // dest.elm.style.opacity = "0";
  src.elm.parentElement.appendChild(dest.elm);
  document.querySelector("title").innerHTML = destinationDocument.title;
  //  compute DOM???
  // dest.elm.getBoundingClientRect();
  // dest.elm.style.opacity = "1";
  // dest.elm.scrollIntoView({
  //   behavior: "smooth",
  // });
  return true;
};

// listen for anchor clicks
document.addEventListener("click", async e => {
  const { target } = e;
  //if target is anchor and anchor origin is same as current webpage
  if (target.tagName === "A" && target.origin === location.origin) {
    e.preventDefault();
    if (target.pathname !== location.pathname) {
      // set page to target
      let loading = true;
      done = false;
      let timeOut = 50;
      document.documentElement.classList.add("time-out");
      setTimeout(() => {
        if (loading) {
          document.documentElement.classList.add("loading");
        }
      }, timeOut);
      e.target.parentElement
        .querySelector("a[aria-current]")
        ?.removeAttribute("aria-current");
      e.target.setAttribute("aria-current", "page");
      await setPage(target);
      loading = false;
      document.documentElement.classList.remove("loading");
      // push anchor pathname to history
      history.pushState({}, null, target.pathname);
      // dynamicImport("/", "../tree.js");
      if (location.pathname === "/") {
        console.log("hello?");
        import("../tree").then(module => {
          module.init();
        });
      }
    }
  }
});

// handle history change
onpopstate = e => {
  setPage(location);
  // dynamicImport("/", "../tree.js");
  if (location.pathname === "/") {
    import("../tree").then(module => {
      module.init();
    });
  }
};
