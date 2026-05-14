import PhotoSwipeLightbox from "photoswipe/lightbox";
// PhotoSwipe's CSS is brought in via the SCSS pipeline (see Step 4 in plan.md);
// don't import it here or it'd be bundled into the JS output.

export function initGalleryLightbox() {
  document.querySelectorAll(".gallery-lightbox").forEach((root) => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: root,
      children: "a[data-pswp-src]",
      pswpModule: () => import("photoswipe"),
      // Match the project's Bootstrap-Icons + has-text-warning palette used by the
      // gallery card carousel controls.
      arrowPrevSVG: '<i class="bi bi-arrow-left-circle-fill"></i>',
      arrowNextSVG: '<i class="bi bi-arrow-right-circle-fill"></i>',
      closeSVG: '<i class="bi bi-x-circle-fill"></i>',
      zoomSVG: '<i class="bi bi-zoom-in"></i>',
    });
    lightbox.init();
  });
}

document.addEventListener("DOMContentLoaded", initGalleryLightbox);
