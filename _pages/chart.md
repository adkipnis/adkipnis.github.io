---
layout: single
title: "/mu/"
permalink: /mu/
---

<!-- image gallery -->
<div class="fun-frame">
  <img id="fun-random-img" alt="Something fun">
  <div id="fun-caption" class="fun-caption"></div>
</div>

<div id="fun-lightbox" class="fun-lightbox" hidden>
  <div class="fun-lightbox__backdrop" id="fun-lightbox-nav"></div>
  <figure class="fun-lightbox__content" role="dialog" aria-modal="true" aria-label="Fun photo">
    <img id="fun-lightbox-img" alt="">
  </figure>
</div>


<script>
  const funImages = [
    { src: "/images/chart.webp", caption: "Some of the music I hold dearly (in no particular order)." },
  ];

  const pick = funImages[Math.floor(Math.random() * funImages.length)];
  const img = document.getElementById("fun-random-img");
  const cap = document.getElementById("fun-caption");

  img.src = pick.src;
  cap.textContent = pick.caption || ""; 

  (function () {
    const sourceImg = document.getElementById("fun-random-img");
    const lb = document.getElementById("fun-lightbox");
    const lbImg = document.getElementById("fun-lightbox-img");
    if (!sourceImg || !lb || !lbImg) return;

    function openLightbox() {
      lbImg.src = sourceImg.currentSrc || sourceImg.src;
      lbImg.alt = sourceImg.alt || "Fun photo";
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
    lb.addEventListener("click", () => closeLightbox());
    document.addEventListener("keydown", (e) => {
      if (!lb.hidden && e.key === "Escape") closeLightbox();
    });
  })();
</script>
