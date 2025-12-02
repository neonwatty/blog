---
title: "Create Video Storyboards with Claude Code and Playwright Screenshots"
date: "2025-10-05"
excerpt: "Automatically generate visual storyboards for demo videos using Claude Code and Playwright."
tags: ["Claude Code", "Playwright", "Testing", "Automation"]
featured: true
author: "Jeremy Watt"
seoTitle: "Create Video Storyboards with Claude Code and Playwright Screenshots"
metaDescription: "Use Claude Code and Playwright to automatically generate visual storyboards for demo videos."
---

Before creating demo videos for [ytgify](https://chromewebstore.google.com/detail/ytgify/dnljofakogbecppbkmnoffppkfdmpfje) - a Chrome extension that lets you clip GIFs right from YouTube - I wanted to map out the user flow with real screenshots.

I wondered if Claude Code could help me create a video storyboard generator using automated screenshots for demo video planning, so fed it this prompt:

> "I want to create a video walkthrough of this chrome extension app. But first, I want to create a storyboard with real images of it. Use playwright and run through the extension, taking screenshots of important moments in the standard user flow. Then create a storyboard from those screenshots. Each screenshot in the storyboard should be numbered, with a brief description of what each step is about."

I then followed up a few times, telling Claude that I wanted the storyboard in html, and adjusted some of the vocabulary.  Not bad!

Here's the resuling storyboard:

<div style="width: 100%; height: 800px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; margin: 2rem 0;">
  <iframe src="/ytgify-storyboard.html" style="width: 100%; height: 100%; border: none;" title="YTgify Storyboard"></iframe>
</div>

Claude Code used Playwright to navigate the extension, captured 11 screenshots of key moments, and generated a complete HTML storyboard with numbered steps, descriptions, visual flow summary, and navigation menu.

I ended up following most of this in the final video walkthrough - made creating the demo walkthrough a lot easier!

<div style="max-width: 800px; margin: 2rem auto;">
  <iframe width="100%" height="450" src="https://www.youtube.com/embed/hBBr8SluoQ8" title="ytgify Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"></iframe>
</div>