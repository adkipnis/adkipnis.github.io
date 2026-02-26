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

<div class="fun-frame">
  <img id="fun-random-img" alt="Something fun">
  <div id="fun-caption" class="fun-caption"></div>
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
</script>

<!-- Lightbox overlay (once per page) -->
<div id="fun-lightbox" class="fun-lightbox" hidden>
  <div class="fun-lightbox__backdrop" data-fun-lightbox-close></div>

  <figure class="fun-lightbox__content" role="dialog" aria-modal="true" aria-label="Fun photo">
    <img id="fun-lightbox-img" alt="">
    <figcaption id="fun-lightbox-caption" class="fun-lightbox__caption"></figcaption>
  </figure>
</div>
