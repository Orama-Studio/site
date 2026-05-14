import PhotoSwipeLightbox from "photoswipe/lightbox";
// PhotoSwipe's CSS is brought in via the SCSS pipeline (see Step 4 in plan.md);
// don't import it here or it'd be bundled into the JS output.

export function initGalleryLightbox() {
  document.querySelectorAll(".gallery-lightbox").forEach((root) => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: root,
      children: "a[data-pswp-src]",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
  });
}

document.addEventListener("DOMContentLoaded", initGalleryLightbox);
