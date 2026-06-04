import { useEffect, useCallback } from 'react';
import './LightboxModal.css';

const LightboxModal = ({ media, currentIndex, onClose, onPrev, onNext }) => {
  const item = media[currentIndex];

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape')     onClose();
    if (e.key === 'ArrowLeft')  onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  if (!item) return null;

  const isPDF   = item.format === 'pdf';
  const isVideo = item.isVideo;

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>

      <button
        className="lightbox-nav lightbox-prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >‹</button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>

        {/* ── PDF viewer ── */}
        {isPDF && (
          <div className="lightbox-pdf-wrapper">
            <iframe
              src={item.url}
              title={item.filename}
              className="lightbox-pdf"
              allow="fullscreen"
            />
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="lightbox-pdf-download"
              download
            >
              ⬇ Download PDF
            </a>
          </div>
        )}

        {/* ── YouTube embed ── */}
        {!isPDF && item.isYouTube && (
          <div className="lightbox-youtube-wrapper">
            <iframe
              src={`${item.embedUrl}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
              title={item.filename}
              className="lightbox-youtube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        )}

        {/* ── Video player ── */}
        {!isPDF && isVideo && !item.isYouTube && (
          <video
            src={item.url}
            controls
            autoPlay
            className="lightbox-media"
          />
        )}

        {/* ── Image ── */}
        {!isPDF && !isVideo && (
          <img
            src={item.url}
            alt={item.filename}
            className="lightbox-media"
          />
        )}

        <p className="lightbox-caption">
          {isPDF && <span className="lightbox-badge">PDF</span>}
          {item.filename} · {currentIndex + 1} / {media.length}
        </p>
      </div>

      <button
        className="lightbox-nav lightbox-next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >›</button>
    </div>
  );
};

export default LightboxModal;
