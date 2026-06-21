(function () {
  "use strict";

  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav__toggle");
  const navLinks = document.querySelector(".nav__links");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox__img");
  const lightboxCaption = lightbox.querySelector(".lightbox__caption");
  const lightboxPrev = lightbox.querySelector(".lightbox__prev");
  const lightboxNext = lightbox.querySelector(".lightbox__next");

  let currentImages = [];
  let currentIndex = 0;

  /* Navigation sticky shadow */
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 80);
  });

  /* Mobile menu */
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll(".collection");
  const navAnchors = navLinks.querySelectorAll("a");

  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -40% 0px" }
  );

  sections.forEach((s) => observerNav.observe(s));

  /* Reveal on scroll */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".collection__header, .gallery__item").forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

  /* Lightbox — navigation limitée à la galerie de la section courante */
  function getGalleryImages(img) {
    const gallery = img.closest(".gallery");
    return gallery ? Array.from(gallery.querySelectorAll("img")) : [img];
  }

  function updateNavButtons() {
    const single = currentImages.length <= 1;
    lightboxPrev.hidden = single;
    lightboxNext.hidden = single;
  }

  function showImageAt(index) {
    const img = currentImages[index];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
  }

  function openLightbox(img) {
    currentImages = getGalleryImages(img);
    currentIndex = Math.max(0, currentImages.indexOf(img));
    showImageAt(currentIndex);
    updateNavButtons();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function showPrev() {
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImageAt(currentIndex);
  }

  function showNext() {
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImageAt(currentIndex);
  }

  document.querySelectorAll(".gallery").forEach((gallery) => {
    gallery.addEventListener("click", (e) => {
      const img = e.target.closest("img");
      if (!img || !gallery.contains(img)) return;
      e.stopPropagation();
      openLightbox(img);
    });
  });

  lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox__prev").addEventListener("click", showPrev);
  lightbox.querySelector(".lightbox__next").addEventListener("click", showNext);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });
})();
