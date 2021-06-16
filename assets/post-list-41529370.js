// We assume that the global variable "numPosts" has been filled with
// the number of posts.

const POSTS_PER_PAGE = 24;
const numPages = Math.ceil(numPosts / POSTS_PER_PAGE);
let currentPage = 1;

window.addEventListener("popstate", function(evt) {
  loadPage(evt.state, false);
});

document.body.addEventListener("click", handle_click);
p = parseInt((new URLSearchParams(window.location.search)).get("p"));
if (isNaN(p)) p = 1;
loadPage(p, false);

function prev() {
  loadPage(currentPage - 1, true);
}

function next() {
  loadPage(currentPage + 1, true);
}

function loadPage(p, nav) {
  let postList = clearContents('#post-list');
  
  if (p > numPages || p < 1) {
    p = 1;
  }
  
  currentPage = p;
  
  let numDisplayedPosts = p * POSTS_PER_PAGE <= numPosts ? POSTS_PER_PAGE : (numPosts % POSTS_PER_PAGE)
  
  // New max width
  document.querySelector('#post-list-container').style.maxWidth = (334 * numDisplayedPosts + 24) + "px";
  
  // Dummy contents
  for (var i = 0; i < numDisplayedPosts; i++) {
    var a = document.createElement("a");
    a.classList.add("thumbnail-link");
    var pic = document.createElement("picture");
    pic.classList.add("post-ratio");
    var div = document.createElement("div"); // To take the place of the <img>
    div.classList.add("dummy-img");
    
    pic.appendChild(div);
    a.appendChild(pic);
    postList.appendChild(a);
  }
  
  // Load new contents
  fetch(p + ".html")
    .then(response => response.text())
    .then(function(text) {
      postList.innerHTML = text;
    });
  
  // Update page links
  let pageLinks = document.createElement("span");
  
  // Add a link to page 1 if not in neighbors
  if (1 < p - 1) {
    pageLinks.appendChild(createAnchor(1));
  }
  
  // Ellipsis should never represent a single page
  if (p == 4) {
    pageLinks.appendChild(createAnchor(2));
  }
  
  // Add an ellipsis as necessary
  if (3 < p - 1) {
    pageLinks.appendChild(ellipsis());
  }
  
  // Add neighbors
  for (q = Math.max(1, p - 1); q <= Math.min(numPages, p + 1); q++) {
    if (p == q) {
      ob = document.createElement("span");
      ob.innerHTML = q;
      ob.classList.add("post-list-page-number");
      ob.classList.add("post-list-current-page-number");
    } else {
      ob = createAnchor(q);
    }
    pageLinks.appendChild(ob);
  }
  
  // Add an ellipsis as necessary
  if (p + 2 < numPages - 1) {
    pageLinks.appendChild(ellipsis());
  }
  
  // Again, ellipsis should never represent a single page
  if (p == numPages - 3) {
    pageLinks.appendChild(createAnchor(numPages - 1));
  }
  
  // Add link to last page if it's not already there
  if (p + 1 < numPages) {
    pageLinks.appendChild(createAnchor(numPages));
  }
  
  const pageLinksContainerTop = clearContents('#page-links-container-top');
  const pageLinksContainerBottom = clearContents('#page-links-container-bottom');
  pageLinksContainerTop.appendChild(pageLinks);
  pageLinksContainerBottom.appendChild(pageLinks.cloneNode(true));
  
  const prevLinks = document.getElementsByClassName('post-list-prev-page');
  const nextLinks = document.getElementsByClassName('post-list-next-page');
  
  for (i = 0; i < prevLinks.length; i++) {
    if (p > 1) {
      prevLinks[i].style.display = '';
      prevLinks[i].href = "./?p=" + (p - 1);
      prevLinks[i].dataset.p = p - 1;
    } else {
      prevLinks[i].style.display = 'none';
    }
  }
  
  for (i = 0; i < nextLinks.length; i++) {
    if (p < numPages) {
      nextLinks[i].style.display = '';
      nextLinks[i].href = "./?p=" + (p + 1);
      nextLinks[i].dataset.p = p + 1;
    } else {
      nextLinks[i].style.display = 'none';
    }
  }
  
  if (nav) {
    // Add new state to history
    window.history.pushState(p, p, "./?p=" + p);
    // TODO: Record the navigation in goatcounter
    // Scroll up if necessary
    const desc = document.querySelector("#post-list-description");
    const idealScrollPosition = desc.offsetTop + desc.offsetHeight - document.querySelector('nav').offsetHeight;
    const currentScrollPosition = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    if (currentScrollPosition > idealScrollPosition) {
      document.documentElement.scrollTop = idealScrollPosition;
      document.body.scrollTop = idealScrollPosition;
    }
  } else {
    // Tag history state with query string for back/forward navigation
    window.history.replaceState(p, p);
  }
}

function ellipsis() {
  ret = document.createElement("span");
  ret.classList.add("post-list-page-ellipsis");
  ret.innerHTML = "&bull;&bull;&bull;";
  
  return ret;
}

function createAnchor(p) {
  const ret = document.createElement('a');
  ret.href="./?p=" + p;
  ret.dataset.p = p;
  ret.classList.add("post-list-page-number");
  ret.innerHTML = p;
  ret.title = "Page " + p;
  return ret;
}

function handle_click(evt) {
  const tag = evt.target;
  if (tag.tagName == "A" && tag.dataset.p != undefined && evt.button == 0) {
    evt.preventDefault();
    loadPage(parseInt(tag.dataset.p), true);
  }
}
