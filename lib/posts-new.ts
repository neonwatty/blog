// Simplified function to enhance HTML code blocks with custom styling
function enhanceCodeBlocks(html: string): string {
  // Handle the actual structure we found: <pre class="language-python"><code class="language-python code-highlight">
  return html.replace(
    /<pre[^>]*class="[^"]*language-(\w+)[^"]*"[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/g,
    (match, language, code) => {
      // Extract plain text for copy functionality
      const plainText = code
        .replace(/<span[^>]*>/g, '')
        .replace(/<\/span>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
        .trim()
      
      return `<div class="code-block-container">
        <div class="code-block-header">
          <div class="flex items-center gap-2">
            <div class="flex gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="language-badge">${language.toUpperCase()}</span>
            <button class="copy-button" title="Copy code to clipboard" onclick="copyCode(this)" data-code="${encodeURIComponent(plainText)}">
              <svg class="w-4 h-4 copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="code-block-content">
          <pre class="code-pre"><code class="language-${language}">${code}</code></pre>
        </div>
      </div>`
    }
  )
}