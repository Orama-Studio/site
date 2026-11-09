document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const inner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");
    if (!inner || items.length === 0) return;

    let indicatorsContainer = carousel.querySelector(".carousel-indicators");
    if (!indicatorsContainer) {
      indicatorsContainer = document.createElement("div");
      indicatorsContainer.className = "carousel-indicators";
      carousel.appendChild(indicatorsContainer);
    }

    indicatorsContainer.innerHTML = "";
    items.forEach(() => {
      const btn = document.createElement("button");
      btn.type = "button";
      indicatorsContainer.appendChild(btn);
    });

    const indicators = indicatorsContainer.querySelectorAll("button");
    const prev = carousel.querySelector(".carousel-control.prev");
    const next = carousel.querySelector(".carousel-control.next");

    let current = 0;
    let timer = null;
    let touched = false;

    function goTo(index) {
      const newIndex = ((index % items.length) + items.length) % items.length;
      const instantChange = Math.abs(newIndex - current) > 1;

      if (instantChange) {
        inner.style.transition = "none";
      }

      current = newIndex;
      inner.style.transform = `translateX(-${current * 100}%)`;

      if (instantChange) {
        void inner.offsetWidth;
        inner.style.removeProperty("transition");
      }

      indicators.forEach((btn, i) => {
        btn.classList.toggle("is-active", i === current);
      });

      if (prev) prev.style.opacity = "1";
      if (next) next.style.opacity = "1";
    }

    function stopTimer() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    }

    const delay = parseInt(carousel.dataset.interval, 10) || 5000;

    function startTimer() {
      stopTimer();
      if (items.length < 2) return;

      timer = setInterval(() => {
        goTo(current + 1);
      }, delay);
    }

    if (prev) {
      prev.addEventListener("click", () => goTo(current - 1));
    }

    if (next) {
      next.addEventListener("click", () => goTo(current + 1));
    }

    indicators.forEach((btn, i) => {
      btn.addEventListener("click", () => goTo(i));
    });

    goTo(0);
    startTimer();

    carousel.addEventListener("mouseenter", stopTimer);

    carousel.addEventListener("mouseleave", () => {
      if (!touched) startTimer();
    });

    let touchStartX = 0;

    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        touched = true;
        stopTimer();
      },
      { passive: true },
    );

    carousel.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(current + (diff > 0 ? 1 : -1));
      }
    });
  });
});
