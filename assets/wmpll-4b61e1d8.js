let savedScrollPosition = 0;
const searchInputElement = document.querySelector("input[name='q']");
const searchPopup = document.querySelector("#search-popup");
const searchPopupForm = document.querySelector("#search-popup-form");
const hamburgerMenuPopup = document.querySelector("#hamburger-menu-popup");
const hamburgerMenuPopupBackground = document.querySelector("#hamburger-menu-popup-background");
const hamburgerMenu = document.querySelector("#hamburger-menu");
const main = document.querySelector("main");
const flow = document.querySelector("#flow");
const nav = document.querySelector("nav");
const navSentinel = document.querySelector("#nav-sentinel");
let searchPopupUp = false;

window.addEventListener("resize", resizeHandler);
document.addEventListener("keydown", keydownHandler);

if ("IntersectionObserver" in window) {
  let navSentinelObserver = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio < 1) {
      nav.classList.add("shadow");
    } else {
      nav.classList.remove("shadow");
    }
  }, {threshold: 1.0});

  navSentinelObserver.observe(navSentinel);
} else {
  // Fallback to scroll event for Safari. TODO: Delete.
  document.addEventListener("scroll", function() {
    if (getScrollPosition() > navSentinel.offsetTop) {
      nav.classList.add("shadow");
    } else {
      nav.classList.remove("shadow");
    }
  });
}
resizeHandler();

function a(pic) {
  pic.dataset.touched = true;
  pic.classList.remove("grow");
}

function b(pic) {
  pic.dataset.touched = false;
  setTimeout(function() {
    if (!pic.dataset.touched) {
      pic.classList.add("grow");
    }
  }, 500);
}

function getScrollPosition() {
  return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
}

function setScrollPosition(y) {
  document.documentElement.scrollTop = y;
  document.body.scrollTop = y;
}

// This function readies the webpage for the user to type a search query.
function presentSearch() {
  closeHamburgerMenuPopup();

  if (searchPopup != null) {
    // Show search popup if relevant
    savedScrollPosition = getScrollPosition();
    searchPopup.style.display = "grid";
    flow.style.display = "none";
    searchPopupUp = true;
    
    // Workaround for a Chrome bug. TODO: Delete next two lines
    searchPopupForm.style.margin = "0";
    searchPopupForm.style.margin = "auto";
  } else {
    // To deal with an Edge bug, on the search page, make sure to scroll all the way to the top of the page.
    // TODO: Find a better solution
    setScrollPosition(0);
  }
  
  // Focus and select
  searchInputElement.focus();
  searchInputElement.select();
}

// This function hides the search popup if it exists and is open, otherwise does nothing.
function closeSearchPopup() {
  if (searchPopupUp) {
    searchPopup.style.display = "none";
    flow.style.display = "";
    setScrollPosition(savedScrollPosition);
  }
}

function openHamburgerMenuPopup() {
  closeSearchPopup();
  
  hamburgerMenuPopup.style.visibility = "initial";
  hamburgerMenuPopupBackground.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  hamburgerMenu.style.left = "0px";
  setTimeout(function() {
    hamburgerMenu.focus();
  }, 300);
}

function closeHamburgerMenuPopup() {
  hamburgerMenuPopup.style.visibility = "";
  hamburgerMenuPopupBackground.style.backgroundColor = "";
  hamburgerMenu.style.left = "";
}

function keydownHandler(evt) {
  // Escape: Close hamburger menu / search popup
  if (evt.key == "Escape") {
    closeSearchPopup();
    closeHamburgerMenuPopup();
  }
  
  // Slash: Search
  if (evt.key == "/" && !(document.activeElement.tagName == "INPUT" && document.activeElement.type == "text")) {
    presentSearch();
    evt.preventDefault();
  }
}

function resizeHandler() {
  if (searchPopup != null) {
    // Now we need to resize the search bubble.
    // The natural dimensions of the search bubble (textbox and triangle)
    // are 1000 x (209 + 135) = 1000 x 344. When there's not enough room
    // for that: The width is 1000vw - 48px. The height is whichever is
    // smaller: (a) the height you get by scaling proportionately, and (b)
    // 100vh - 57px. (The 57px is for the nav bar and a little padding.)
    
    let verticalScaleFactor;
    
    if (document.body.clientHeight > 120) {
      const searchBubbleWidth = Math.min(1000, document.body.clientWidth - 48);
      const searchBubbleHeight = Math.min(searchBubbleWidth * 344 / 1000, document.body.clientHeight - 57);
      verticalScaleFactor = searchBubbleHeight / 344;
      document.querySelector("#search-popup-triangle-container").style.display = "";
      document.querySelector("#search-popup-form").style.top = "";
      document.querySelector("#search-popup-form").style.width = "";
    } else {
      verticalScaleFactor = 0.183;
      document.querySelector("#search-popup-triangle-container").style.display = "none";
      document.querySelector("#search-popup-form").style.top = "-45.28px";
      document.querySelector("#search-popup-form").style.width = "calc(100% - 106px)";
    }
    
    document.querySelector('#search-popup-input').style.fontSize = 96 * verticalScaleFactor + "px";
    document.querySelector('#search-popup-input').style.paddingTop = 48 * verticalScaleFactor + "px";
    document.querySelector('#search-popup-input').style.paddingBottom = 48 * verticalScaleFactor + "px";
    document.querySelector('#search-popup-input').style.paddingLeft = 136 * verticalScaleFactor + "px";
    document.querySelector('#search-popup-input').style.paddingRight = 136 * verticalScaleFactor + "px";
    document.querySelector('#search-popup-input').style.borderRadius = 40 * verticalScaleFactor + "px";
    document.querySelector('#search-submit').style.width = 72 * verticalScaleFactor + "px";
    document.querySelector('#search-submit').style.height = 72 * verticalScaleFactor + "px";
    document.querySelector('#search-submit').style.right = 40 * verticalScaleFactor + "px";
    document.querySelector('#search-popup-triangle').style.width = 253 * verticalScaleFactor + "px";
    document.querySelector('#search-popup-triangle').style.height = 131 * verticalScaleFactor + "px";
  }
}

function clearContents(s) {
  const o = document.querySelector(s);
  const n = o.cloneNode(false);
  o.parentNode.replaceChild(n, o);
  return n;
}
