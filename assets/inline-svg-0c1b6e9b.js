// s: an empty <svg> element with a data-src attribute
function loadInlineSVG(s) {
  fetch(s.dataset.src)
    .then(response => response.text())
    .then(function(text) {
      let domParser = new DOMParser();
      let svgDoc = domParser.parseFromString(text, "text/xml");
      let svgElement = svgDoc.getElementsByTagName("svg")[0];
      svgElement.removeAttribute("width");
      svgElement.removeAttribute("height");
      
      for (let i = 0; i < s.attributes.length; i++) {
        svgElement.setAttribute(s.attributes[i].name, s.attributes[i].value);
      }
      
      s.parentNode.replaceChild(svgElement, s);
    });
}

function loadInlineSVGs() {
  document.querySelectorAll("svg[data-ready]").forEach(loadInlineSVG);
}

loadInlineSVGs();
