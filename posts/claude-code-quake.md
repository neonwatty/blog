---
title: "Claude Code Helped Me Bring Quake to the Browser with HTTPS and Multiplayer"
date: "2025-11-29"
excerpt: "How AI pair programming helped me finally ship a stalled project"
tags: ["Claude Code", "AI", "DevOps", "Kamal", "Docker"]
featured: true
author: "Jeremy Watt"
image: "https://github.com/jermwatt/readme_gifs/blob/main/kamal-quake-demo.webp?raw=true"
seoTitle: "Claude Code Helped Me Bring Quake to the Browser with HTTPS and Multiplayer"
metaDescription: "How AI pair programming with Claude Code helped finish a year-old project deploying Quake 3 to the browser with HTTPS and multiplayer support."
---

I started this project almost a year ago and it sat 90% finished in my repo, collecting dust. The goal was simple: get [QuakeJS](https://github.com/inolen/quakejs) - the classic browser game port of Quake 3 Arena - running with HTTPS and working multiplayer using WebSocket Secure (WSS).

![Quake 3 in the browser](https://github.com/jermwatt/readme_gifs/blob/main/kamal-quake-demo.webp?raw=true)

## The Problem

The original QuakeJS works great over HTTP, but modern browsers require HTTPS. And once you add HTTPS, the WebSocket connection for multiplayer breaks because it needs WSS (WebSocket Secure) instead of plain WS.

I had most of the pieces:
- A Docker container with the game server
- [Kamal 2](https://kamal-deploy.org/) for deployment with automatic SSL via Let's Encrypt
- A working game over HTTP

But the WSS proxy configuration was a mess. The entrypoint script wasn't finding config files, environment variables weren't propagating correctly, and I couldn't figure out why the secure WebSocket connections kept failing.

## Claude Code to the Rescue

I described the problem to [Claude Code](https://claude.ai/claude-code) and within a session we:

1. **Fixed the entrypoint script** - The wssproxy config path was relative when it needed to be absolute
2. **Debugged the WSS proxy** - Configured it to properly handle secure WebSocket connections through Kamal's proxy
3. **Got environment variables working** - The game port wasn't being passed through correctly
4. **Deployed with Kamal 2** - Set up the full deploy.yml with proper port mappings and SSL configuration

The back-and-forth debugging with Claude Code was exactly what this project needed. Instead of context-switching between docs, Stack Overflow, and trial-and-error deploys, I had a pair programmer who could hold the entire problem in context.

## The Result

[kamal-quake.xyz](https://kamal-quake.xyz) - Quake 3 Arena running in your browser with HTTPS and working multiplayer. No plugins, no downloads, just classic arena FPS action.

## Links

- [kamal-quake](https://github.com/neonwatty/kamal-quake) - Kamal 2 deployment configuration
- [quakejs-https-docker](https://github.com/neonwatty/quakejs-https-docker) - Docker container with HTTPS/WSS support
- [Live Demo](https://kamal-quake.xyz)
