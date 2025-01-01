---
title: Komixy
tags: ayu_animations
desc: Ukážkové stránky z mojej komiksovej knihy.
date: 2024-12-31
bg: default
---

<div class="gallery-container">
  <div class="thumbnails">
    <img src="img-ayu-comic/6_thumb.jpg" data-full="img-ayu-comic/6.jpg" onclick="window.galleryOpenModal(this)" />
    <img src="img-ayu-comic/7_thumb.jpg" data-full="img-ayu-comic/7.jpg" onclick="window.galleryOpenModal(this)" />
    <img src="img-ayu-comic/8_thumb.jpg" data-full="img-ayu-comic/8.jpg" onclick="window.galleryOpenModal(this)" />
    <img src="img-ayu-comic/9_thumb.jpg" data-full="img-ayu-comic/9.jpg" onclick="window.galleryOpenModal(this)" />
  </div>

  <div id="imageModal" class="modal">
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button class="close" onclick="window.galleryCloseModal()">&times;</button>
      <button class="arrow prev" onclick="window.galleryPrevImage()">&larr;</button>
      <img id="featured" src="" />
      <button class="arrow next" onclick="window.galleryNextImage()">&rarr;</button>
    </div>
  </div>
</div>
