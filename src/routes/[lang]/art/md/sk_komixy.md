---
title: Komixy
tags: ayu_animations
desc: Ukážkové stránky z mojej komiksovej knihy.
date: 2024-12-31
bg: default
---

<div class="gallery-container">
  <div class="thumbnails">
    <img src="img-ayu-comic/6_thumb.jpg" data-full="img-ayu-comic/6.jpg" onclick="openModal(this)" />
    <img src="img-ayu-comic/7_thumb.jpg" data-full="img-ayu-comic/7.jpg" onclick="openModal(this)" />
    <img src="img-ayu-comic/8_thumb.jpg" data-full="img-ayu-comic/8.jpg" onclick="openModal(this)" />
    <img src="img-ayu-comic/9_thumb.jpg" data-full="img-ayu-comic/9.jpg" onclick="openModal(this)" />
  </div>

  <div id="imageModal" class="modal">
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <button class="close" onclick="closeModal()">&times;</button>
      <button class="arrow prev" onclick="prevImage()">&larr;</button>
      <img id="featured" src="" />
      <button class="arrow next" onclick="nextImage()">&rarr;</button>
    </div>
  </div>
</div>


<style>
.gallery-container {
  max-width: 800px;
  margin: 0 auto;
  max-height: 100vh;
  overflow-y: auto;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  z-index: 1000;
}

.modal-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  z-index: 1001;
}

#featured {
  max-height: 90vh;
  max-width: 90vw;
  object-fit: contain;
  pointer-events: none;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 20px;
  transition: background 0.3s;
  z-index: 1;
}

.arrow:hover {
  background: rgba(0,0,0,0.8);
}

.close {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  transition: background 0.3s;
  z-index: 1002;
}

.close:hover {
  background: rgba(0,0,0,0.8);
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

.thumbnails {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  margin-bottom: 10px;
  border: 2px solid rgba(0, 0, 0, 0.1); 
  border-radius: 8px; 
  background: #f5f5f5;
}

.thumbnails img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.3s;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border: 1px solid #ddd;
}

.thumbnails img:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .thumbnails img {
    width: 80px;
    height: 80px;
  }

  .arrow {
    padding: 10px 15px;
    font-size: 16px;
  }
}
</style>

<script>
let lastTimeout = null;
const images = document.querySelectorAll('.thumbnails img');
const modal = document.getElementById('imageModal');
const modalBackdrop = document.querySelector('.modal-backdrop');

async function showImage(img) {
  let featured = document.getElementById('featured');
  featured.src = img.dataset.full || img.src;
  currentIndex = Array.from(images).indexOf(img);
}

function openModal(img) {
  modal.style.display = 'block';
  showImage(img);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(images[currentIndex]);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(images[currentIndex]);
}

modalBackdrop.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  } else if (modal.style.display === 'block') {
    if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  }
});
</script>
