(function () {
  var grid = document.getElementById("latest-grid");
  var btn = document.getElementById("latest-load-more");
  if (!grid || !btn) return;

  var pageSize = parseInt(btn.getAttribute("data-page-size"), 10) || 6;
  var initial = parseInt(btn.getAttribute("data-initial"), 10) || 6;
  var showMore = btn.getAttribute("data-show-more") || "Show more articles";
  var showFewer = btn.getAttribute("data-show-fewer") || "Show fewer articles";
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hiddenCards() {
    return Array.prototype.slice.call(grid.querySelectorAll(".latest-card[hidden]"));
  }

  function allCards() {
    return Array.prototype.slice.call(grid.querySelectorAll(".latest-card"));
  }

  function syncLabel() {
    btn.textContent = hiddenCards().length > 0 ? showMore : showFewer;
  }

  function collapse() {
    allCards().forEach(function (card, index) {
      if (index >= initial) {
        card.hidden = true;
      }
    });
    btn.setAttribute("aria-expanded", "false");
    syncLabel();
  }

  btn.addEventListener("click", function () {
    var hidden = hiddenCards();
    if (hidden.length > 0) {
      var batch = hidden.slice(0, pageSize);
      batch.forEach(function (card) {
        card.hidden = false;
      });
      btn.setAttribute("aria-expanded", "true");
      if (batch[0]) {
        batch[0].scrollIntoView({
          block: "nearest",
          behavior: reducedMotion ? "auto" : "smooth",
        });
      }
      syncLabel();
    } else {
      collapse();
    }
  });

  syncLabel();
})();
