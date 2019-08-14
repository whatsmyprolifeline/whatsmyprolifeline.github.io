// We assume that the global variable numVersions has been filled in.
let currentVersion = numVersions - 1;

function getPostLargeImage(v) {
  return document.querySelector("#post-large-image-" + v);
}

function add(deltaV) {
  if (currentVersion + deltaV >= 0 && currentVersion + deltaV < numVersions) {
    let oldImage = getPostLargeImage(currentVersion);
    
    // Hide the current image
    if (deltaV > 0) {
      oldImage.classList.add("hidden-left");
    } else {
      oldImage.classList.add("hidden-right");
    }
    
    currentVersion += deltaV;
    let newImage = getPostLargeImage(currentVersion);
    
    // Load. TODO: Support loading inline SVGs
    if (newImage.tagName.toLowerCase() == "picture") {
      for (let i = 0; i < newImage.childNodes.length; i++) {
        child = newImage.childNodes[i];
        // Child could be a <source> or an <img>
        if (child.srcset == "" && child.dataset.srcset != undefined) {
          child.srcset = child.dataset.srcset;
        }
        if (child.src == "" && child.dataset.src != undefined) {
          child.src = child.dataset.src;
        }
      }
    }
     
    // Show
    newImage.classList.remove("hidden-left");
    newImage.classList.remove("hidden-right");
    
    // Update buttons
    document.getElementById("post-prev").disabled = currentVersion == 0;
    document.getElementById("post-next").disabled = currentVersion == numVersions - 1;
  }
}
