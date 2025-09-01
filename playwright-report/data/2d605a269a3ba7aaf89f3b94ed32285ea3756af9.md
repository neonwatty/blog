# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e3]:
    - navigation [ref=e4]:
      - generic [ref=e5]:
        - link "Back to Slideshows" [ref=e6] [cursor=pointer]:
          - /url: /slides/
          - img [ref=e7] [cursor=pointer]
          - generic [ref=e9] [cursor=pointer]: Back to Slideshows
        - generic [ref=e10]:
          - link "Read Original Post" [ref=e11] [cursor=pointer]:
            - /url: /posts/liars-dice-apple-watch-app/
          - generic [ref=e12]: 12 slides
    - generic [ref=e15]:
      - heading "Error Loading Slideshow" [level=2] [ref=e16]
      - paragraph [ref=e17]: Reveal.js not loaded or deck reference not available
    - paragraph [ref=e20]:
      - text: Use arrow keys or space to navigate • Press
      - generic [ref=e21]: ESC
      - text: for overview • Press
      - generic [ref=e22]: S
      - text: for speaker notes
  - generic [ref=e27] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e28] [cursor=pointer]:
      - img [ref=e29] [cursor=pointer]
    - generic [ref=e32] [cursor=pointer]:
      - button "Open issues overlay" [ref=e33] [cursor=pointer]:
        - generic [ref=e34] [cursor=pointer]:
          - generic [ref=e35] [cursor=pointer]: "0"
          - generic [ref=e36] [cursor=pointer]: "1"
        - generic [ref=e37] [cursor=pointer]: Issue
      - button "Collapse issues badge" [ref=e38] [cursor=pointer]:
        - img [ref=e39] [cursor=pointer]
  - alert [ref=e41]
```