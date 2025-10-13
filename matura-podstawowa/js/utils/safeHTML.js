//sets the innerHTML of element to sanitized version of unsafeHTML field
function setSafeHTML(element, unsafeHTML) {
  const safe = DOMPurify.sanitize(unsafeHTML, {
    ALLOWED_TAGS: ["b", "i", "u", "span", "br", "sub", "sup"], // keep minimal
    ALLOWED_ATTR: []
  });
  element.innerHTML = safe;
}
