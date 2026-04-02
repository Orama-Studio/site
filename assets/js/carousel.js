document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const inner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");
    let indicatorsContainer = carousel.querySelector(".carousel-indicators");
    if (!indicatorsContainer) {
      indicatorsContainer = document.createElement("div");
      indicatorsContainer.className = "carousel-indicators";
      carousel.appendChild(indicatorsContainer);
    }
    indicatorsContainer.innerHTML = "";
    items.forEach(() => {
      const btn = document.createElement("button");
      indicatorsContainer.appendChild(btn);
    });
    const indicators = indicatorsContainer.querySelectorAll("button");
    let current = 0;

    function goTo(index) {
      current = (index + items.length) % items.length;
      inner.style.transform = `translateX(-${current * 100}%)`;
      indicators.forEach((btn, i) =>
        btn.classList.toggle("is-active", i === current),
      );
    }

    const prev = carousel.querySelector(".carousel-control.prev");
    const next = carousel.querySelector(".carousel-control.next");
    if (prev) prev.addEventListener("click", () => goTo(current - 1));
    if (next) next.addEventListener("click", () => goTo(current + 1));
    indicators.forEach((btn, i) =>
      btn.addEventListener("click", () => goTo(i)),
    );

    goTo(0);

    const delay = parseInt(carousel.dataset.interval) || 5000;
    let timer = setInterval(() => goTo(current + 1), delay);

    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", () => {
      timer = setInterval(() => goTo(current + 1), delay);
    });

    let touchStartX = 0;
    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      clearInterval(timer);
    }, { passive: true });
    carousel.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
      timer = setInterval(() => goTo(current + 1), delay);
    });
  });
});
