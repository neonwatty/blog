import Link from 'next/link';
import TreasureMap from '@/components/TreasureMap';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GoDaddy Customer Service Treasure Map | Interactive Journey',
  description: 'Follow the treasure map through GoDaddy\'s customer service cancellation flow - an interactive visual journey',
  openGraph: {
    title: 'GoDaddy Customer Service Treasure Map',
    description: 'Follow the treasure map through GoDaddy\'s customer service cancellation flow',
    images: ['/images/godaddy/treasure-map-preview.png'],
  },
};

const godaddyImages = [
  {
    src: '/images/godaddy/godaddy-1.png',
    alt: 'Step 1',
    position: { top: '50px', left: '40px' }
  },
  {
    src: '/images/godaddy/godaddy-2.png',
    alt: 'Step 2',
    position: { top: '350px', right: '50px' }
  },
  {
    src: '/images/godaddy/godaddy-3.png',
    alt: 'Step 3',
    position: { top: '750px', left: '80px' }
  },
  {
    src: '/images/godaddy/godaddy-4.png',
    alt: 'Step 4',
    position: { top: '1250px', right: '70px' }
  },
  {
    src: '/images/godaddy/godaddy-5.png',
    alt: 'Step 5 - The End',
    position: { top: '1650px', left: '50%', transform: 'translateX(-50%)' }
  }
];

const svgPaths = [
  'M 200 100 Q 475 225, 750 350',
  'M 750 350 Q 500 550, 250 750',
  'M 250 750 Q 500 1000, 750 1250',
  'M 750 1250 Q 650 1450, 550 1650'
];

export default function GoDaddyTreasureMap() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Link
          href="/posts/godaddy-is-cancer"
          className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to full blog post
        </Link>
      </div>

      {/* Treasure Map */}
      <div className="max-w-4xl mx-auto px-4">
        <TreasureMap
          images={godaddyImages}
          paths={svgPaths}
          title="START HERE"
        />
      </div>

      {/* Footer note */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
        <p>Interactive treasure map created with Claude Code</p>
        <Link
          href="/posts/godaddy-is-cancer"
          className="text-red-400 hover:text-red-300 transition-colors mt-2 inline-block"
        >
          Read the full story →
        </Link>
      </div>
    </main>
  );
}
