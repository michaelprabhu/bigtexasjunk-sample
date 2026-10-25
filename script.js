(function () {
  "use strict";

  var items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showAll() {
    for (var i = 0; i < items.length; i++) items[i].classList.add("is-in");
  }

  if (reduce || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  for (var j = 0; j < items.length; j++) io.observe(items[j]);

  // Safety net: never leave content hidden.
  window.addEventListener("load", function () {
    setTimeout(function () {
      for (var k = 0; k < items.length; k++) {
        var r = items[k].getBoundingClientRect();
        if (r.top < window.innerHeight && !items[k].classList.contains("is-in")) {
          items[k].classList.add("is-in");
        }
      }
    }, 400);
  });
})();
