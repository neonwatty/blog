---
title: 'Claude Code App Icon Design: 20 SVG Iterations for a macOS Dictation App'
date: '2026-05-26'
excerpt: >-
  A real iteration log: designing a macOS app icon with Claude Code and the
  logo-designer-skill. 20 SVG iterations, 6 parallel subagents, and the
  surprisingly hard problem of curving a sound wave around a cylinder.
tags:
  - Claude Code
  - App Icon Design
  - Claude Code Skills
  - SVG
  - macOS App Icon
  - Logo Design
  - AI Design
featured: true
author: Jeremy Watt
seoTitle: 'Claude Code App Icon Design: 20 SVG Iterations (Real Case Study)'
metaDescription: >-
  Designing a macOS app icon with Claude Code and the logo-designer-skill. 20
  SVG iterations, 6 parallel subagents, and the surprising challenge of curving
  a sound wave around a cylinder. Real iteration log with assets.
relatedPosts:
  - logo-designer-skill-claude-code
  - ai-logo-generator-claude-code
  - claude-code-skills-guide
ogImage: /foil-icon-journey/final/iter-20.svg
---

I redesigned the macOS app icon for [Foil](https://github.com/mean-weasel/foil), a free dictation tool, using **Claude Code** and the [logo-designer-skill](https://github.com/neonwatty/logo-designer-skill). The brief: an abstract homage to Edison's 1877 tinfoil phonograph, no literal phonograph. Twenty SVG iterations later, this is where we landed:

<div style="display: flex; justify-content: center; margin: 2rem auto;">
  <img src="/foil-icon-journey/final/iter-20.svg" alt="Final Foil app icon" style="width: 280px; height: 280px; border-radius: 16px;">
</div>

Here are the major stops, and where Claude got stuck.

<style>
.mini-carousel-container { position: relative; max-width: 700px; margin: 1.5rem auto; background: #1a1a1a; border-radius: 12px; padding: 1.5rem; overflow: hidden; }
.mini-carousel { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: thin; scrollbar-color: #4a5568 #1a1a1a; gap: 1.25rem; padding: 0.5rem 0; }
.mini-slide { flex: 0 0 60%; scroll-snap-align: center; display: flex; flex-direction: column; align-items: center; }
.mini-slide img { width: 100%; max-width: 360px; height: auto; border-radius: 10px; background: transparent; }
.mini-slide p { color: #a0a0a0; text-align: center; margin: 0.6rem 0 0; font-size: 0.85rem; }
.mini-carousel::-webkit-scrollbar { height: 8px; }
.mini-carousel::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 4px; }
.mini-carousel::-webkit-scrollbar-thumb { background: #4a5568; border-radius: 4px; }
.scroll-hint { color: #606060; text-align: center; margin-top: 0.8rem; font-size: 0.85rem; }
</style>

## Round 1 — Generic Abstract (rejected)

Five parallel subagents, no Edison reference research. Rings, ribbons, recording grooves, an "F" letterform — competent, abstract, all wrong.

<div class="mini-carousel-container">
  <div class="mini-carousel">
    <div class="mini-slide"><img src="/foil-icon-journey/round1/concept-1.svg" alt="rings"><p>concept-1 — captured sound rings</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round1/concept-2.svg" alt="foil ribbon"><p>concept-2 — foil ribbon → waveform</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round1/concept-3.svg" alt="grooves and pulse"><p>concept-3 — grooves + capture pulse</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round1/concept-4.svg" alt="F letterform"><p>concept-4 — F from foil strips</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round1/concept-5.svg" alt="radial disc"><p>concept-5 — cross-section + pulse</p></div>
  </div>
  <p class="scroll-hint">← Scroll →</p>
</div>

## Round 2 — Edison-Grounded (closer)

Grounded in real research this time: a horizontal brass cylinder wrapped in tinfoil with a single helical groove at 10 threads per inch. Better, still not the answer.

<div class="mini-carousel-container">
  <div class="mini-carousel">
    <div class="mini-slide"><img src="/foil-icon-journey/round2/concept-1.svg" alt="3/4 cylinder"><p>3/4 cylinder + helix + indentations</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round2/concept-2.svg" alt="end-on spiral"><p>end-on continuous spiral</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round2/concept-3.svg" alt="minimal capsule"><p>minimal capsule + diagonal</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round2/concept-4.svg" alt="foil sheet with sound"><p>tinfoil sheet + sound indentations</p></div>
  </div>
  <p class="scroll-hint">← Scroll →</p>
</div>

## The Spiral Detour (twelve iterations)

I picked a direction and asked Claude to refine. The refinement turned into twelve iterations of *spiral* shapes — Archimedean spirals, spirals with bursts, denser spirals, sharper spirals. Structural problem: bend a periodic waveform into a closed curve and your brain reads it as a gear, never as audio.

<div class="mini-carousel-container">
  <div class="mini-carousel">
    <div class="mini-slide"><img src="/foil-icon-journey/spirals/iter-04.svg" alt="iter-4 spiral"><p>iter-4 — Archimedean + speech wiggle</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/spirals/iter-07.svg" alt="iter-7 denser"><p>iter-7 — denser 6-turn groove</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/spirals/iter-09.svg" alt="iter-9 sharper"><p>iter-9 — sharper mixed-frequency</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/spirals/iter-11.svg" alt="iter-11 bold"><p>iter-11 — bold clipped-sine</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/spirals/iter-12.svg" alt="iter-12 tamed"><p>iter-12 — tamed center</p></div>
  </div>
  <p class="scroll-hint">← Scroll →</p>
</div>

After iteration-12 I called it and restarted.

## Round 3 — Six Lenses (unlocked it)

Hard reset. Six parallel subagents, each with a *different* creative lens — minimalist, letterform, material, motion, vintage, experimental. Constraining each agent broke the convergence.

<div class="mini-carousel-container">
  <div class="mini-carousel">
    <div class="mini-slide"><img src="/foil-icon-journey/round3/concept-1.svg" alt="minimalist"><p>geometric minimalist</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round3/concept-2.svg" alt="letterform"><p>letterform F</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round3/concept-3.svg" alt="material"><p>material / foil sheen</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round3/concept-4.svg" alt="motion"><p>motion / capture in-progress</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round3/concept-5.svg" alt="vintage emblem"><p>vintage emblem (modern)</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/round3/concept-6.svg" alt="experimental"><p>experimental / off-axis</p></div>
  </div>
  <p class="scroll-hint">← Scroll →</p>
</div>

The winner wasn't a single concept — it was concepts 1 and 3 merged: a horizontal cylinder with a sound wave inside it.

## The Curvature Problem

This is where Claude got stuck. Once we had a cylinder, I asked Claude to "curve the sound waves along with the sheet." That instruction sounded clear when I typed it. It wasn't.

<div class="mini-carousel-container">
  <div class="mini-carousel">
    <div class="mini-slide"><img src="/foil-icon-journey/curvature/01-smile-arc-wrong.svg" alt="smile arc"><p>smile-arc — wrong: implies the center curves</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/curvature/02-right-only.svg" alt="right-only"><p>right-edge perspective only — correct geometry</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/curvature/03-curved-mild.svg" alt="mild curve"><p>curved bars c=14 — too subtle</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/curvature/04-curved-c50.svg" alt="curved 50"><p>c=50 — bars curve like longitude lines</p></div>
    <div class="mini-slide"><img src="/foil-icon-journey/curvature/05-curved-c80.svg" alt="curved 80"><p>c=80 — crescent moons (too much)</p></div>
  </div>
  <p class="scroll-hint">← Scroll →</p>
</div>

Claude's first interpretation was a smile-arc — bars bowing upward in the middle, like the wave was painted on a surface bulging toward the viewer. Geometrically wrong (the cylinder's center doesn't curve across its length, only the right edge does). I had to say "double check the curvature is not curved across the cylinder" before we got to right-edge-only perspective. Pushing further to actually *curve each bar's shape* worked at moderate intensity and looked silly at high intensity — and the curved version was technically more accurate but worse as an icon.

## The Final

Straight bars, shifted slightly right, subtle right-edge perspective. One last move: change the body from light grey to pure white, pushing luminance contrast past WCAG AAA for the 16px menu-bar size.

<div style="display: flex; gap: 1.5rem; justify-content: center; margin: 2rem auto; flex-wrap: wrap;">
  <figure style="text-align: center; margin: 0;">
    <img src="/foil-icon-journey/final/iter-19.svg" alt="iter-19" style="width: 240px; height: 240px; border-radius: 12px;">
    <figcaption style="color: #888; font-size: 0.85rem; margin-top: 0.5rem;">iter-19 — grey foil</figcaption>
  </figure>
  <figure style="text-align: center; margin: 0;">
    <img src="/foil-icon-journey/final/iter-20.svg" alt="iter-20" style="width: 240px; height: 240px; border-radius: 12px;">
    <figcaption style="color: #888; font-size: 0.85rem; margin-top: 0.5rem;">iter-20 — white foil (final)</figcaption>
  </figure>
</div>

## The Counts

- **20** named iterations
- **119** SVG files generated
- **~60** distinct visual variations across the whole journey
- **3** rounds of fresh concepts (5 + 4 + 6 = 15 starting points)
- **12** iterations on the spiral dead end before restarting
- **1** geometric misunderstanding that ate ~5 iterations to untangle

## What I Took Away

**Claude's capabilities on this kind of task are spiky.**

Some operations were nearly frictionless. Centering the sound wave on the cylinder, shifting it right, replacing the body color from grey to pure white, generating six distinct concepts in parallel — all landed in one or two attempts.

Other operations turned out to be surprisingly hard. The clearest example: getting Claude to *curve* the sound-wave bars along the cylinder's curvature. After we untangled the initial geometric misread (the smile-arc that implied the cylinder bows across its length), Claude could produce mathematically curved bars at any intensity I asked for — but none of them looked right:

<div style="display: flex; gap: 0.8rem; justify-content: center; margin: 1.5rem auto; flex-wrap: wrap;">
  <figure style="margin: 0; text-align: center;">
    <img src="/foil-icon-journey/curvature/01-smile-arc-wrong.svg" alt="smile-arc mistake" style="width: 200px; height: 200px; border-radius: 10px;">
    <figcaption style="color: #888; font-size: 0.75rem; margin-top: 0.4rem;">smile-arc (wrong geometry)</figcaption>
  </figure>
  <figure style="margin: 0; text-align: center;">
    <img src="/foil-icon-journey/curvature/04-curved-c50.svg" alt="curved bars c=50" style="width: 200px; height: 200px; border-radius: 10px;">
    <figcaption style="color: #888; font-size: 0.75rem; margin-top: 0.4rem;">curved bars c=50</figcaption>
  </figure>
  <figure style="margin: 0; text-align: center;">
    <img src="/foil-icon-journey/curvature/05-curved-c80.svg" alt="curved bars c=80" style="width: 200px; height: 200px; border-radius: 10px;">
    <figcaption style="color: #888; font-size: 0.75rem; margin-top: 0.4rem;">curved bars c=80 (crescent moons)</figcaption>
  </figure>
</div>

We reverted to straight bars in iteration-19. Geometric fidelity and icon legibility turned out to be different optimization targets, and Claude couldn't navigate the gap between them without explicit steering from me.

The skill ([logo-designer-skill](https://github.com/neonwatty/logo-designer-skill)) handles the structured flow — interview, parallel exploration, refinement, PNG export. Full walkthrough is [here](/posts/logo-designer-skill-claude-code/). And [Foil](https://github.com/mean-weasel/foil) is where the icon lives now.
