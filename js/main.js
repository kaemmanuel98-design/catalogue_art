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
  const discoverTrack = document.getElementById("discoverTrack");
  const discoverPrev = document.querySelector(".discover__arrow--prev");
  const discoverNext = document.querySelector(".discover__arrow--next");

  let currentImages = [];
  let currentIndex = 0;

  function closeMobileMenu() {
    navLinks.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function getImageCaption(img) {
    const figure = img.closest("figure");
    const caption = figure && figure.querySelector(".artwork__caption");
    return caption ? caption.textContent.trim() : "";
  }

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
    link.addEventListener("click", closeMobileMenu);
  });

  document.querySelectorAll(".discover-card").forEach((card) => {
    card.addEventListener("click", closeMobileMenu);
  });

  /* Carrousel Découvrir */
  if (discoverTrack && discoverPrev && discoverNext) {
    const scrollAmount = () => discoverTrack.clientWidth * 0.75;

    function updateDiscoverArrows() {
      const maxScroll = discoverTrack.scrollWidth - discoverTrack.clientWidth;
      discoverPrev.hidden = discoverTrack.scrollLeft <= 4;
      discoverNext.hidden = discoverTrack.scrollLeft >= maxScroll - 4;
    }

    discoverPrev.addEventListener("click", () => {
      discoverTrack.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });

    discoverNext.addEventListener("click", () => {
      discoverTrack.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });

    discoverTrack.addEventListener("scroll", () => {
      window.requestAnimationFrame(updateDiscoverArrows);
    }, { passive: true });

    window.addEventListener("resize", updateDiscoverArrows);
    updateDiscoverArrows();
  }

  /* Active nav link on scroll */
  const sections = document.querySelectorAll(".discover, .collection");
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

  document.querySelectorAll(".section-head, .discover-card, .collection__header, .gallery__item").forEach((el) => {
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
    const caption = getImageCaption(img);
    lightboxImg.src = img.src;
    lightboxImg.alt = caption || img.alt;
    lightboxCaption.textContent = caption;
    lightboxCaption.hidden = !caption;
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
      const frame = e.target.closest(".artwork__frame, .gallery__media");
      const img = e.target.closest("img") || (frame && frame.querySelector("img"));
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

  if (window.ArtistikeI18n) {
    ArtistikeI18n.initI18n();
    document.addEventListener("languagechange", () => {
      if (!lightbox.hidden && currentImages[currentIndex]) {
        showImageAt(currentIndex);
      }
    });
  }
})();
