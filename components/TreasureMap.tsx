'use client';

import { useState } from 'react';

interface TreasureMapImage {
  src: string;
  alt: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    transform?: string;
  };
}

interface TreasureMapProps {
  images: TreasureMapImage[];
  paths: string[];
  title?: string;
}

export default function TreasureMap({ images, paths, title = "START HERE" }: TreasureMapProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const openLightbox = (src: string) => {
    setLightboxSrc(src);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="treasure-map-container" style={{
        position: 'relative',
        maxWidth: '900px',
        margin: '3rem auto',
        padding: '2rem 1rem',
        minHeight: '2100px',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        borderRadius: '16px',
        border: '2px solid #3a3a3a'
      }}>
        {/* SVG Path Overlay with Multiple Arrows */}
        <svg style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#ef4444" />
            </marker>
          </defs>
          {paths.map((d, idx) => (
            <path
              key={idx}
              d={d}
              stroke="#ef4444"
              strokeWidth="3"
              strokeDasharray="10,10"
              fill="none"
              markerEnd="url(#arrowhead)"
              opacity="0.7"
            />
          ))}
        </svg>

        {/* Start Flag */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '40px',
          color: '#ef4444',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          zIndex: 2
        }}>
          🚩 {title}
        </div>

        {/* Images */}
        {images.map((image, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              zIndex: 3,
              maxWidth: '420px',
              ...image.position
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '-15px',
                width: '45px',
                height: '45px',
                background: '#ef4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.3rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                zIndex: 1
              }}>
                {idx + 1}
              </div>
              <img
                src={image.src}
                alt={image.alt}
                onClick={() => openLightbox(image.src)}
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                  border: '3px solid #ef4444',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
              />
              {idx === images.length - 1 && (
                <div style={{
                  textAlign: 'center',
                  marginTop: '1rem',
                  color: '#ef4444',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}>
                  ☠️ THE END ☠️
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Styles */}
        <style jsx>{`
          .treasure-map-container img:hover {
            transform: scale(1.05);
          }

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
        `}</style>
      </div>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <div
          onClick={closeLightbox}
          onKeyDown={(e) => e.key === 'Escape' && closeLightbox()}
          style={{
            display: 'flex',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.95)',
            zIndex: 9999,
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src={lightboxSrc}
            alt="Enlarged view"
            style={{
              maxWidth: '95%',
              maxHeight: '95%',
              borderRadius: '8px',
              boxShadow: '0 0 50px rgba(239, 68, 68, 0.5)'
            }}
          />
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '30px',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            ✕
          </div>
        </div>
      )}
    </>
  );
}
