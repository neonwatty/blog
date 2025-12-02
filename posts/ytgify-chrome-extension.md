---
title: "AI Logo Generator: Generative SVG Logo Design with Claude Code"
date: "2025-09-13"
excerpt: "Generate, evolve, and iterate on SVG logos using natural language and Claude Code."
tags: ["Claude Code", "Logo Design", "Chrome Extension"]
featured: true
author: "Jeremy Watt"
seoTitle: "AI Logo Generator: SVG Logo Maker with Claude Code"
metaDescription: "Generate, evolve, and iterate on SVG logos using natural language and Claude Code."
---

This morning I spent some time using Claude Code as an AI logo generator - creating SVG logos for a new Chrome extension I'm building called [ytgify](https://github.com/neonwatty/ytgify).  It's a simple YouTube to GIF converter that lets you create GIFs directly from YouTube videos with a simple in-player interface.  A quick demo video.

<div style="max-width: 800px; margin: 2rem auto;">
  <video controls width="100%" style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <source src="https://github.com/user-attachments/assets/dea017db-ec8d-41f7-9e9c-a1048cf5ae4c" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

Creating SVG logos with Claude Code is pretty fun - it's like having a generative AI logo design tool at your fingertips.  Since they're just XML, CC can bring pretty much any idea you have to life as an SVG.  You can work with this SVG logo maker to generate, modify, and iterate on designs through pure conversation.  You just describe what you want and watch it materialize as code.

Here's a short gallery of my favorites.  Ended up using the first (for reasons detailed below).

<div class="logo-carousel-container" style="position: relative; max-width: 600px; margin: 3rem auto; background: #1a1a1a; border-radius: 12px; padding: 2rem; overflow: hidden;">
  <div class="logo-carousel" style="display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: thin; scrollbar-color: #4a5568 #1a1a1a; gap: 2rem; padding: 1rem 0;">
    <div class="logo-slide" style="flex: 0 0 100%; scroll-snap-align: center; display: flex; flex-direction: column; align-items: center;">
      <img src="/ytgify-logos/ytgify-logo.svg" alt="ytgify Main Logo" style="width: 200px; height: 200px; object-fit: contain; margin-bottom: 1rem;">
      <p style="color: #a0a0a0; text-align: center; margin: 0;">ytgify Main Logo</p>
    </div>
    <div class="logo-slide" style="flex: 0 0 100%; scroll-snap-align: center; display: flex; flex-direction: column; align-items: center;">
      <img src="/ytgify-logos/logo-youtube-gif-hybrid-v7.svg" alt="YouTube-GIF Hybrid" style="width: 200px; height: 200px; object-fit: contain; margin-bottom: 1rem;">
      <p style="color: #a0a0a0; text-align: center; margin: 0;">YouTube-GIF Hybrid</p>
    </div>
    <div class="logo-slide" style="flex: 0 0 100%; scroll-snap-align: center; display: flex; flex-direction: column; align-items: center;">
      <img src="/ytgify-logos/logo-frame-sequence-v1-integrated-play-variation-2-layered-depth-black-1.svg" alt="Frame Sequence with Depth" style="width: 200px; height: 200px; object-fit: contain; margin-bottom: 1rem;">
      <p style="color: #a0a0a0; text-align: center; margin: 0;">Frame Sequence with Depth</p>
    </div>
    <div class="logo-slide" style="flex: 0 0 100%; scroll-snap-align: center; display: flex; flex-direction: column; align-items: center;">
      <img src="/ytgify-logos/logo-neon-accessible-mintviolet.svg" alt="Mint Violet Variation" style="width: 200px; height: 200px; object-fit: contain; margin-bottom: 1rem;">
      <p style="color: #a0a0a0; text-align: center; margin: 0;">Mint Violet Variation</p>
    </div>
    <div class="logo-slide" style="flex: 0 0 100%; scroll-snap-align: center; display: flex; flex-direction: column; align-items: center;">
      <img src="/ytgify-logos/logo-abstract-time-capture.svg" alt="Abstract Time Capture" style="width: 200px; height: 200px; object-fit: contain; margin-bottom: 1rem;">
      <p style="color: #a0a0a0; text-align: center; margin: 0;">Abstract Time Capture</p>
    </div>
  </div>
  <p style="color: #606060; text-align: center; margin-top: 1rem; font-size: 0.9rem;">← Scroll to see all designs →</p>
</div>

<style>
.logo-carousel::-webkit-scrollbar {
  height: 8px;
}
.logo-carousel::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}
.logo-carousel::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 4px;
}
.logo-carousel::-webkit-scrollbar-thumb:hover {
  background: #606060;
}
</style>

## Evolution as Design Strategy

I iterated in generations.  Evolving designs I liked, discarding the others.

### The Conversation Loop

My loop with CC went like this:

- **Me**: "Carefully analyze this app and create 5 SVG logo designs that capture its theme and target users"
- **Claude Code**: *Generates 5 SVG logos of various aesthetics given my abstract request*
- **Me**: "I like these two designs (X and Y) - show me 5 variations of each"
- **Claude Code**: *Generates 5 new variations of X and Y*
- **Me**: "I like the first two X variations, and the middle 3 Y variations.  Create different color themes / sizing / ..."
- **Claude Code**: *Generates new variations*

and so on and so forth.

### Generate, Curate, Cull

I treated the design cycle with Claude Code as an evolutionary process.  Generate, curate, cull, repeat.

Probably did about 15 rounds of this, and ended up with a nice array of interesting logo options.

### Design Themes That Emerged

We ended up creating a range of logos I liked.  Some are in the gallery above.

These ranged from "on the nose" logos (that literally said 'gif' or 'youtube'), to really playing out the theme of transforming a video into frames for a gif.  With the latter we tried various logos with frames, and simpler geometric patterns (e.g., a play button triangle sliced horizontally into strips).

### Why The Winner Won

I ended up going with the first option shown in the gallery.  I think it represents the concept of the app well (slicing / clipping youtube videos into GIFs, which generally have a range of uses), it's simple, and can be easily recognized when small (a requirement for a chrome extension, you need to be able to easily recognize the tiny version of the logo in the navbar).
