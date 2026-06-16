(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var button = document.querySelector("[data-back-to-top]");
  var prose = document.querySelector("[data-article-prose]");
  var target = document.getElementById("main-content");
  if (!button || !prose || !target) return;

  var minScrollRange = Math.max(1200, window.innerHeight * 2);
  var showAfter = 400;
  var ticking = false;

  function proseScrollRange() {
    var rect = prose.getBoundingClientRect();
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var start = scrollY + rect.top;
    var end = start + rect.height;
    return end - window.innerHeight - start;
  }

  function updateVisibility() {
    var range = proseScrollRange();
    if (range < minScrollRange) {
      button.classList.remove("is-visible");
      button.hidden = true;
      ticking = false;
      return;
    }

    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var rect = prose.getBoundingClientRect();
    var proseTop = scrollY + rect.top;
    var scrolledIntoProse = scrollY - proseTop;
    var visible = scrolledIntoProse >= showAfter;
    button.classList.toggle("is-visible", visible);
    button.hidden = !visible;
    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateVisibility);
  }

  button.addEventListener("click", function () {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.focus({ preventScroll: true });
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(requestUpdate).observe(prose);
  }

  updateVisibility();
})();
