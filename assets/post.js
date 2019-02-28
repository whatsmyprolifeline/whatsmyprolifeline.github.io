// We assume that the global variable numVersions has been filled in.
let currentVersion = numVersions - 1;
const pictureElements = [];

for (let i = 0; i < numVersions; i++) {
  pictureElements[i] = document.getElementById("post-large-image-" + i);
}

function add(deltaV) {
  if (currentVersion + deltaV >= 0 && currentVersion + deltaV < numVersions) {
    // Hide the current image
    if (deltaV > 0) {
      pictureElements[currentVersion].classList.add("hidden-left");
    } else {
      pictureElements[currentVersion].classList.add("hidden-right");
    }
    
    currentVersion += deltaV;
    
    // Load
    for (i = 0; i < pictureElements[currentVersion].childNodes.length; i++) {
      child = pictureElements[currentVersion].childNodes[i];
      // Child could be a <source> or an <img>
      if (child.srcset == "" && child.dataset.srcset != undefined) {
        child.srcset = child.dataset.srcset;
      }
      if (child.src == "" && child.dataset.src != undefined) {
        child.src = child.dataset.src;
      }
    }
     
    // Show
    pictureElements[currentVersion].classList.remove("hidden-left");
    pictureElements[currentVersion].classList.remove("hidden-right");
    
    // Update buttons
    document.getElementById("post-prev").disabled = currentVersion == 0;
    document.getElementById("post-next").disabled = currentVersion == numVersions - 1;
  }
}
