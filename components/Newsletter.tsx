export default function Newsletter() {
  return (
    <div className="w-full transition-all duration-300">
      <script async src="https://subscribe-forms.beehiiv.com/embed.js"></script>

      <div className="max-w-2xl mx-auto text-center mb-6">
        <h3 className="text-2xl font-bold mb-3 transition-all duration-300"
            style={{
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em'
            }}>
          Subscribe for updates
        </h3>
        <p className="text-base transition-all duration-300"
           style={{ color: 'var(--color-text-secondary)' }}>
          Open Source releases, updates, and learnings
        </p>
      </div>

      <iframe
        src="https://subscribe-forms.beehiiv.com/f36aa878-a5f0-4ba2-bc2f-cd9b2c1894d8"
        className="beehiiv-embed"
        data-test-id="beehiiv-embed"
        frameBorder="0"
        scrolling="no"
        style={{
          display: 'block',
          margin: '0 auto',
          width: '560px',
          height: '200px',
          borderRadius: '0px',
          backgroundColor: 'transparent',
          maxWidth: '100%'
        }}
      />
    </div>
  )
}
