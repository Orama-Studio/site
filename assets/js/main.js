document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);

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
    const iframe = $el.querySelector("iframe");
    if (iframe) iframe.src = "";
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
      const videoUrl = $trigger.dataset.video;
      if (videoUrl) {
        const iframe = $target.querySelector("iframe");
        if (iframe) {
          const match = videoUrl.match(/[?&]v=([^&]+)/);
          iframe.src = match ? "https://www.youtube.com/embed/" + match[1] + "?autoplay=1" : videoUrl;
        }
      }
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
        const base = document.body.dataset.base || "/";
        window.location.href = base + "#" + targetId;
      }
    });
  });
});
const mediaElem = document.querySelector("video");
mediaElem.load();

function replay_video() {
  const v = document.getElementsByClassName("replayable-video")[0];
  if (typeof v !== "undefined") {
    v.currentTime = 0;
    v.play();
  }
}

function toggle_mute_icon() {
  const v = document.getElementsByClassName("mutable-video")[0];
  if (typeof v !== "undefined") {
    const b = document.getElementById("mute-button");
    const icon_on = '<i class="bi bi-volume-mute "></i>';
    const icon_off = '<i class="bi bi-volume-up"></i>';
    v.muted = !v.muted;
    b.innerHTML = v.muted ? icon_on : icon_off;
  }
}

function glitchVideos() {
  let activeCount = 0;
  const visibleVideos = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleVideos.add(entry.target);
        } else {
          visibleVideos.delete(entry.target);
          entry.target.pause();
        }
      });
    },
    { threshold: 0.25 },
  );

  document.querySelectorAll("video").forEach((video) => {
    observer.observe(video);
    const max_changes = 3;
    function randomAction() {
      if (!visibleVideos.has(video) || activeCount >= max_changes) {
        setTimeout(randomAction, Math.random() * 2000);
        // setTimeout(randomAction, 2000);
        return;
      }
      activeCount++;
      const seek = video.currentTime + Math.random() * 10;
      video.currentTime = seek >= video.duration ? seek - video.duration : seek;
      video.play();
      setTimeout(() => {
        video.pause();
        activeCount--;
      }, 5);

      const delay = Math.random() * 5000 + 2000;
      // const delay = 1500;
      setTimeout(randomAction, delay);
    }
    video.pause();
    randomAction();
  });
}

console.info("JS loaded");
