(function () {
  var btn = document.getElementById("latest-load-more");
  var panel = document.getElementById("latest-more");
  if (!btn || !panel) return;

  btn.addEventListener("click", function () {
    var expanded = btn.getAttribute("aria-expanded") === "true";
    if (expanded) {
      panel.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = btn.getAttribute("data-label-default") || btn.textContent;
    } else {
      panel.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      if (!btn.getAttribute("data-label-default")) {
        btn.setAttribute("data-label-default", btn.textContent);
      }
      btn.textContent = "Show fewer articles";
    }
  });
})();
