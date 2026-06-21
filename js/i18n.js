(function (global) {
  "use strict";

  const STORAGE_KEY = "artistike-lang";

  const translations = {
    fr: {
      meta: {
        title: "Catalogue artistikE studio",
        description: "Catalogue d'œuvres d'art artistikE studio. Tableaux, vases et créations artisanales.",
      },
      lang: {
        label: "Langue",
        fr: "Français",
        en: "English",
      },
      cover: {
        title: "Collection",
        lead: "Créations artisanales uniques. Explorez matières, textures et finitions.",
        discover: "Découvrir",
        discoverAria: "Découvrir la collection",
      },
      nav: {
        discover: "Découvrir",
        artworks: "Œuvres",
        plaster: "Tableau plâtré",
        rope: "Tableau cordage",
        papier: "Papier mâché",
        vases: "Vases cordages",
        menu: "Menu",
      },
      discover: {
        title: "Découvrir",
        lead: "Parcourez les quatre univers de la collection",
        prev: "Collections précédentes",
        next: "Collections suivantes",
      },
      artworks: {
        title: "Œuvres",
        lead: "Toutes les pièces du catalogue",
      },
      collection: {
        "tableau-moderne": {
          title: "Tableau moderne plâtré",
          erosionCaption: "Erosion - tableau sculptural",
          tagline: "La rencontre entre l'art et la matière",
          p1: "Façonné à la main en plâtre sculpté, sublimé par une finition effet bronze vieilli. Ses reliefs profonds et organiques captent la lumière et créent un jeu de reflets chaleureux.",
          p2: "Véritable sculpture murale, il habille l'espace avec élégance en chambre, salon ou bureau. Chaque pièce est unique.",
          value: "<strong>Valeur ajoutée :</strong> artisanat, relief et finition haut de gamme pour un intérieur sophistiqué et original.",
        },
        "tableau-cordage": {
          title: "Tableau texturé à cordage minitieux",
          tagline: "Élégance organique et chaleur contemporaine",
          p1: "Réalisées à la main, ces œuvres marient cordage texturé et teintes crème, sable et ocre doré. Leurs reliefs fluides, inspirés de la nature, apportent profondeur et sérénité.",
          p2: "Pièces signatures qui attirent le regard sans dominer la pièce, parfaites pour un salon, une entrée ou un espace de détente.",
        },
        "vase-papier": {
          title: "Vase Papier mâché",
          tagline: "Authenticité minérale et élégance intemporelle",
          p1: "Texture inspirée de la pierre, lignes épurées et fini organique. Ce vase s'intègre aux intérieurs contemporains et minimalistes, seul ou avec des branches décoratives.",
          p2: "Il structure l'espace avec douceur et apporte texture et raffinement naturel sur une console, une table basse ou une étagère.",
        },
        "vases-cordages": {
          title: "Vases à cordages épurées",
          tagline: "L'élégance de la matière, la poésie du détail",
          p1: "Alliance du verre et du cordage textile, habillé à la main en entrelacs soignés. Compositions organiques qui jouent avec la lumière, la texture et le relief.",
          p2: "Présence artistique discrète, modernes et intemporels, idéaux sur console, table basse, étagère ou table à manger.",
          value: "<strong>Valeur ajoutée :</strong> décoration unique qui marie art, matière et travail artisanal.",
        },
      },
      footer: {
        text: "Créations artisanales uniques",
      },
      lightbox: {
        close: "Fermer",
        prev: "Précédent",
        next: "Suivant",
      },
      pieces: (n) => `${n} œuvre${Number(n) > 1 ? "s" : ""}`,
    },
    en: {
      meta: {
        title: "artistikE studio Catalogue",
        description: "artistikE studio art catalogue. Panels, vases and handcrafted creations.",
      },
      lang: {
        label: "Language",
        fr: "French",
        en: "English",
      },
      cover: {
        title: "Collection",
        lead: "Unique handcrafted creations. Explore materials, textures and finishes.",
        discover: "Discover",
        discoverAria: "Discover the collection",
      },
      nav: {
        discover: "Discover",
        artworks: "Artworks",
        plaster: "Plaster panel",
        rope: "Rope panel",
        papier: "Papier-mâché",
        vases: "Rope vases",
        menu: "Menu",
      },
      discover: {
        title: "Discover",
        lead: "Browse the four worlds of the collection",
        prev: "Previous collections",
        next: "Next collections",
      },
      artworks: {
        title: "Artworks",
        lead: "Every piece in the catalogue",
      },
      collection: {
        "tableau-moderne": {
          title: "Modern plaster panel",
          erosionCaption: "Erosion - sculptural panel",
          tagline: "Where art meets material",
          p1: "Hand-sculpted plaster, enhanced with an aged bronze effect finish. Its deep, organic reliefs catch the light and create a warm play of reflections.",
          p2: "A true wall sculpture that elegantly dresses a bedroom, living room or office. Each piece is unique.",
          value: "<strong>Added value:</strong> craftsmanship, relief and a premium finish for a sophisticated, original interior.",
        },
        "tableau-cordage": {
          title: "Meticulous rope textured panel",
          tagline: "Organic elegance and contemporary warmth",
          p1: "Handmade, these works combine textured rope with cream, sand and golden ochre tones. Their fluid reliefs, inspired by nature, bring depth and serenity.",
          p2: "Signature pieces that draw the eye without dominating the room, perfect for a living room, entryway or relaxation space.",
        },
        "vase-papier": {
          title: "Papier-mâché vase",
          tagline: "Mineral authenticity and timeless elegance",
          p1: "Stone-inspired texture, clean lines and an organic finish. This vase fits contemporary and minimalist interiors, alone or with decorative branches.",
          p2: "It gently structures the space and adds texture and natural refinement on a console, coffee table or shelf.",
        },
        "vases-cordages": {
          title: "Pure rope-wrapped vases",
          tagline: "The elegance of material, the poetry of detail",
          p1: "A pairing of glass and textile rope, hand-wrapped in careful interlacing. Organic compositions that play with light, texture and relief.",
          p2: "A discreet artistic presence, modern and timeless, ideal on a console, coffee table, shelf or dining table.",
          value: "<strong>Added value:</strong> a unique decoration that blends art, material and artisanal craft.",
        },
      },
      footer: {
        text: "Unique handcrafted creations",
      },
      lightbox: {
        close: "Close",
        prev: "Previous",
        next: "Next",
      },
      pieces: (n) => `${n} piece${Number(n) > 1 ? "s" : ""}`,
    },
  };

  function resolve(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
  }

  function t(key, lang) {
    const value = resolve(translations[lang], key);
    return value != null ? value : key;
  }

  function piecesLabel(count, lang) {
    return translations[lang].pieces(count);
  }

  function applyLanguage(lang) {
    if (!translations[lang]) lang = "fr";

    document.documentElement.lang = lang;
    document.title = t("meta.title", lang);

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t("meta.description", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = t(el.getAttribute("data-i18n"), lang);
      if (typeof value === "string") el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const value = t(el.getAttribute("data-i18n-html"), lang);
      if (typeof value === "string") el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"), lang));
    });

    document.querySelectorAll("[data-i18n-pieces]").forEach((el) => {
      el.textContent = piecesLabel(el.getAttribute("data-i18n-pieces"), lang);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      el.alt = t(el.getAttribute("data-i18n-alt"), lang);
    });

    document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
      const active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });

    const switcher = document.querySelector(".lang-switch");
    if (switcher) switcher.setAttribute("aria-label", t("lang.label", lang));

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {
      /* ignore */
    }

    document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
  }

  function initI18n() {
    let lang = "fr";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) lang = saved;
    } catch (_) {
      /* ignore */
    }

    document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        applyLanguage(btn.getAttribute("data-lang"));
      });
    });

    applyLanguage(lang);
  }

  global.ArtistikeI18n = { applyLanguage, t, initI18n };
})(window);
