document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);
  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button",
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.navbar a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });

        // Close mobile menu if open
        const burger = document.querySelector(".navbar-burger");
        const menu = document.getElementById(burger?.dataset.target);
        if (burger?.classList.contains("is-active")) {
          burger.classList.remove("is-active");
          menu?.classList.remove("is-active");
        }
      } else {
        window.location.href = "/#" + targetId;
      }
    });
  });
});

// Animate "forma" with shapes on splash
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("forma-word");
  if (!el) return;

  elWidth = el.offsetWidth;
  el.style.maxWidth = elWidth;
  el.style.minWidth = elWidth;

  var timeout = 550;
  const s = 63;
  const shapes = [
    { svg: "" },
    {
      svg: `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><polygon points="${s / 2},2 ${s * 0.62},${s * 0.38} ${s - 2},${s * 0.38} ${s * 0.68},${s * 0.58} ${s * 0.78},${s - 2} ${s / 2},${s * 0.7} ${s * 0.22},${s - 2} ${s * 0.32},${s * 0.58} 2,${s * 0.38} ${s * 0.38},${s * 0.38}" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
    },
    {
      svg: `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2 - 2}" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
    },
    {
      svg: `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><rect x="2" y="2" width="${s - 4}" height="${s - 4}" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
    },
    {
      svg: `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><polygon points="${s / 2},2 ${s - 2},${s - 2} 2,${s - 2}" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
    },
    {
      svg: `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><rect x="2" y="2" width="${s - 4}" height="${s - 4}" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
    },
    {
      svg: `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><polygon points="${s / 2},2 ${s - 2},${s / 2} ${s / 2},${s - 2} 2,${s / 2}" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
    },
  ];
  let i = 0;

  var ival = setInterval(() => {
    i = (i + 1) % shapes.length;
    el.style.opacity = 0;
    let first_run = true;
    setTimeout(() => {
      if (first_run) {
        el.classList.remove("has-text-black");
        el.classList.add("has-text-grey-lighter");
        first_run = false;
      }
      el.innerHTML = shapes[i].svg || "Dai una forma alle tue visioni.";
      el.style.opacity = 1;
      shapes[i].svg == "" && clearInterval(ival);
    }, 280);
  }, timeout);
});

console.info("JS loaded!");
