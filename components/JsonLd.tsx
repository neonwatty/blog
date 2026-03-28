interface JsonLdProps {
  data: Record<string, unknown>
}

// Safe: only used with hardcoded schema.org objects, never user input
export default function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
