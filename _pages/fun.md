---
layout: single
title: "Fun"
permalink: /fun/
nav_order: 4   # optional, controls tab order
---

Here's a list of fun facts about me in no particular order:

- my favorite fragrance note is myrrh
- the last three concerts I visited were by *OG Keemo*, *Godspeed You! Black Emperor*, and some jazz ensemble whose name I forgot
- I can (probably still) do a heelflip on a skateboard
- I love rewriting the lyrics to German rap songs and remaking them with Suno AI
- my favorite book is *Le petit prince* by Antoine de Saint-Exupéry
- I beat Elden Ring (twice)
- neovim > Zed > cursor > VS Code, change my mind.

--- 

<!-- image gallery -->
<div class="fun-frame">
  <img id="fun-random-img" alt="Something fun">
  <div id="fun-caption" class="fun-caption"></div>
</div>

<!-- Lightbox overlay (once per page) -->
<div id="fun-lightbox" class="fun-lightbox" hidden>
  <div class="fun-lightbox__backdrop" data-fun-lightbox-close></div>

  <figure class="fun-lightbox__content" role="dialog" aria-modal="true" aria-label="Fun photo">
    <img id="fun-lightbox-img" alt="">
    <figcaption id="fun-lightbox-caption" class="fun-lightbox__caption"></figcaption>
  </figure>
</div>

<script>
  const funImages = [
    { src: "/images/chart.png", caption: "some of the music that I hold dearly" },
  ];

  const pick = funImages[Math.floor(Math.random() * funImages.length)];
  const img = document.getElementById("fun-random-img");
  const cap = document.getElementById("fun-caption");

  img.src = pick.src;
  cap.textContent = pick.caption || "";

  (function () {
    const sourceImg = document.getElementById("fun-random-img");
    const sourceCap = document.getElementById("fun-caption");

    const lb = document.getElementById("fun-lightbox");
    const lbImg = document.getElementById("fun-lightbox-img");
    const lbCap = document.getElementById("fun-lightbox-caption");

    if (!sourceImg || !lb || !lbImg) return;

    function openLightbox() {
      lbImg.src = sourceImg.currentSrc || sourceImg.src;
      lbImg.alt = sourceImg.alt || "Fun photo";
      lbCap.textContent = sourceCap ? sourceCap.textContent : "";
      lb.hidden = false;
      document.documentElement.classList.add("fun-lightbox-open");
    }

    function closeLightbox() {
      lb.hidden = true;
      document.documentElement.classList.remove("fun-lightbox-open");
      lbImg.src = "";
    }

    sourceImg.style.cursor = "zoom-in";
    sourceImg.addEventListener("click", openLightbox);

    lb.addEventListener("click", (e) => {
      if (e.target && e.target.hasAttribute("data-fun-lightbox-close")) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lb.hidden && e.key === "Escape") closeLightbox();
    });
  })();
</script>
