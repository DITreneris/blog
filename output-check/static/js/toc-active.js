(function () {
  var root = document.querySelector("[data-toc]");
  var prose = document.querySelector("[data-article-prose]");
  if (!root || !prose) return;

  var list = root.querySelector("[data-toc-list]");
  var headings = prose.querySelectorAll("h2, h3");
  if (!headings.length) {
    root.hidden = true;
    return;
  }

  headings.forEach(function (heading, index) {
    if (!heading.id) {
      heading.id = "section-" + (index + 1);
    }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#" + heading.id;
    a.textContent = heading.textContent;
    if (heading.tagName === "H3") {
      a.classList.add("toc__link--h3");
    }
    li.appendChild(a);
    list.appendChild(li);
  });

  var links = list.querySelectorAll("a");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) {
            l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    },
    { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
  );

  headings.forEach(function (h) {
    observer.observe(h);
  });
})();
