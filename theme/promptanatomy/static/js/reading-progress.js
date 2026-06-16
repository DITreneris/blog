(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()")) return;

  var bar = document.querySelector("[data-reading-progress]");
  var prose = document.querySelector("[data-article-prose]");
  if (!bar || !prose) return;

  var ticking = false;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function progressForProse() {
    var rect = prose.getBoundingClientRect();
    var scrollY = window.scrollY || document.documentElement.scrollTop;
    var start = scrollY + rect.top;
    var end = start + rect.height;
    var range = end - window.innerHeight;
    if (range <= 0) return 1;
    return clamp((scrollY - start) / range, 0, 1);
  }

  function update() {
    bar.style.transform = "scaleX(" + progressForProse() + ")";
    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });

  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(requestUpdate).observe(prose);
  }

  update();
})();
