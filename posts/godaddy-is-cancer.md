---
title: "Create an Interactive Image Gallery Treasure Map with Claude Code"
date: "2025-10-04"
excerpt: "Turn any image sequence into an interactive treasure map using Claude Code"
tags: ["claude code", "customer service", "cancer"]
slideshow: true
---

Claude Code can turn any sequence of related images into an interactive image gallery treasure map with minimal effort - complete with SVG path arrows, lightbox zoom, and responsive design. 

Here's how.

### Step 1: Gather some related images that tell a story. 

Yesterday I tried to cancel an auto-renewal of an old unused GoDaddy domain.  In doing this I learned that Godaddy has a very unique automated customer service flow for doing this.

So I took a series of screenshots to document the process; my failed attempt to traverse their amazing process.

### Step 2: Use Claude Code to create a treasure map layout

Once you have your images, use a prompt like this to generate the treasure map. You'll iterate a few times adjusting spacing and layout.

> Take the 5 images in the `/public/images/godaddy` directory and create a treasure map connecting image 1 to image 2, image 2 to image 3, and so on.  Use a dark background and red dashed lines with arrows to connect the images in order. Place a "Start Here" flag near image 1 and an "X Marks the Spot" near image 5.  Make sure the images are large enough to see details but arranged in a fun, winding path.  Add some subtle shadows and highlights to give it depth.  Include a lightbox effect so clicking on an image enlarges it.  Make it visually appealing and easy to follow.

### Step 3: The result

Note this 'treasure map' aesthetic only makes sense on desktop, since you want zig-zagging paths / arrows connecting images.  On mobile you can just stack the images vertically.

**[View standalone treasure map →](/treasure-maps/godaddy)** (easier to share!)


<div class="treasure-map-container" style="position: relative; max-width: 1100px; margin: 3rem auto; padding: 2rem 1rem; min-height: 2100px; background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); border-radius: 16px; border: 2px solid #3a3a3a;">

  <!-- SVG Path Overlay with Multiple Arrows -->
  <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
      </marker>
    </defs>
    <!-- Path 1 to 2 -->
    <path d="M 200 100 Q 475 225, 750 350"
          stroke="#ef4444"
          stroke-width="3"
          stroke-dasharray="10,10"
          fill="none"
          marker-end="url(#arrowhead)"
          opacity="0.7"/>
    <!-- Path 2 to 3 -->
    <path d="M 750 350 Q 500 550, 250 750"
          stroke="#ef4444"
          stroke-width="3"
          stroke-dasharray="10,10"
          fill="none"
          marker-end="url(#arrowhead)"
          opacity="0.7"/>
    <!-- Path 3 to 4 -->
    <path d="M 250 750 Q 500 1000, 750 1250"
          stroke="#ef4444"
          stroke-width="3"
          stroke-dasharray="10,10"
          fill="none"
          marker-end="url(#arrowhead)"
          opacity="0.7"/>
    <!-- Path 4 to 5 -->
    <path d="M 750 1250 Q 650 1450, 550 1650"
          stroke="#ef4444"
          stroke-width="3"
          stroke-dasharray="10,10"
          fill="none"
          marker-end="url(#arrowhead)"
          opacity="0.7"/>
  </svg>

  <!-- Start Flag -->
  <div style="position: absolute; top: 15px; left: 40px; color: #ef4444; font-weight: bold; font-size: 0.9rem; z-index: 2;">
    🚩 START HERE
  </div>

  <!-- Image 1 - Top Left -->
  <div style="position: absolute; top: 50px; left: 40px; z-index: 3; max-width: 420px;">
    <div style="position: relative;">
      <div style="position: absolute; top: -15px; left: -15px; width: 45px; height: 45px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.3rem; box-shadow: 0 4px 6px rgba(0,0,0,0.3); z-index: 1;">1</div>
      <img src="/images/godaddy/godaddy-1.png" alt="Step 1" onclick="openLightbox('/images/godaddy/godaddy-1.png')" style="width: 100%; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.4); border: 3px solid #ef4444; cursor: pointer; transition: transform 0.2s;">
    </div>
  </div>

  <!-- Image 2 - Right Side -->
  <div style="position: absolute; top: 350px; right: 50px; z-index: 3; max-width: 420px;">
    <div style="position: relative;">
      <div style="position: absolute; top: -15px; left: -15px; width: 45px; height: 45px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.3rem; box-shadow: 0 4px 6px rgba(0,0,0,0.3); z-index: 1;">2</div>
      <img src="/images/godaddy/godaddy-2.png" alt="Step 2" onclick="openLightbox('/images/godaddy/godaddy-2.png')" style="width: 100%; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.4); border: 3px solid #ef4444; cursor: pointer; transition: transform 0.2s;">
    </div>
  </div>

  <!-- Image 3 - Left Side Middle -->
  <div style="position: absolute; top: 750px; left: 80px; z-index: 3; max-width: 420px;">
    <div style="position: relative;">
      <div style="position: absolute; top: -15px; left: -15px; width: 45px; height: 45px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.3rem; box-shadow: 0 4px 6px rgba(0,0,0,0.3); z-index: 1;">3</div>
      <img src="/images/godaddy/godaddy-3.png" alt="Step 3" onclick="openLightbox('/images/godaddy/godaddy-3.png')" style="width: 100%; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.4); border: 3px solid #ef4444; cursor: pointer; transition: transform 0.2s;">
    </div>
  </div>

  <!-- Image 4 - Right Side Lower -->
  <div style="position: absolute; top: 1250px; right: 70px; z-index: 3; max-width: 420px;">
    <div style="position: relative;">
      <div style="position: absolute; top: -15px; left: -15px; width: 45px; height: 45px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.3rem; box-shadow: 0 4px 6px rgba(0,0,0,0.3); z-index: 1;">4</div>
      <img src="/images/godaddy/godaddy-4.png" alt="Step 4" onclick="openLightbox('/images/godaddy/godaddy-4.png')" style="width: 100%; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.4); border: 3px solid #ef4444; cursor: pointer; transition: transform 0.2s;">
    </div>
  </div>

  <!-- Image 5 - Bottom Center (X Marks the Spot) -->
  <div style="position: absolute; top: 1650px; left: 50%; transform: translateX(-50%); z-index: 3; max-width: 420px;">
    <div style="position: relative;">
      <div style="position: absolute; top: -15px; left: -15px; width: 45px; height: 45px; background: #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.3rem; box-shadow: 0 4px 6px rgba(0,0,0,0.3); z-index: 1;">5</div>
      <img src="/images/godaddy/godaddy-5.png" alt="Step 5 - The End" onclick="openLightbox('/images/godaddy/godaddy-5.png')" style="width: 100%; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.4); border: 3px solid #ef4444; cursor: pointer; transition: transform 0.2s;">
      <div style="text-align: center; margin-top: 1rem; color: #ef4444; font-weight: bold; font-size: 1.5rem;">☠️ THE END ☠️</div>
    </div>
  </div>

  <!-- Hover effect for images -->
  <style>
    .treasure-map-container img:hover {
      transform: scale(1.05);
    }
  </style>

  <!-- Mobile Fallback: Stack vertically on small screens -->
  <style>
    @media (max-width: 768px) {
      .treasure-map-container {
        min-height: auto !important;
      }
      .treasure-map-container > div[style*="position: absolute"] {
        position: relative !important;
        left: 0 !important;
        right: 0 !important;
        top: auto !important;
        transform: none !important;
        margin: 2rem auto !important;
        max-width: 90% !important;
      }
      .treasure-map-container svg {
        display: none;
      }
    }
  </style>

</div>

<!-- Lightbox Modal -->
<div id="lightbox" onclick="closeLightbox()" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 9999; cursor: pointer; align-items: center; justify-content: center;">
  <img id="lightbox-img" src="" alt="Enlarged view" style="max-width: 95%; max-height: 95%; border-radius: 8px; box-shadow: 0 0 50px rgba(239, 68, 68, 0.5);">
  <div style="position: absolute; top: 20px; right: 30px; color: white; font-size: 2rem; font-weight: bold; cursor: pointer;">✕</div>
</div>

<script>
  function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Close lightbox with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
</script>
