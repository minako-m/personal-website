import { useEffect } from 'react'

// Full-screen view of one photo, with buttons to step through the rest
// (wrapping round at the ends) and to close. Arrow keys step, Escape closes,
// and clicking the backdrop closes too.
export default function PhotoViewer({ photos, index, onChange, onClose }) {
  const step = d => onChange((index + d + photos.length) % photos.length)

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length)
      else if (e.key === 'ArrowRight') onChange((index + 1) % photos.length)
    }
    window.addEventListener('keydown', onKey)
    // stop the page scrolling behind the viewer
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [index, photos.length, onChange, onClose])

  return (
    <div
      className="photo-viewer"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <button type="button" className="photo-viewer-btn photo-viewer-close" aria-label="Close" onClick={onClose} autoFocus>
        ✕
      </button>
      <button type="button" className="photo-viewer-btn photo-viewer-prev" aria-label="Previous photo" onClick={() => step(-1)}>
        ‹
      </button>
      <img src={photos[index]} alt={`Astana, photo ${index + 1} of ${photos.length}`} className="photo-viewer-img" />
      <button type="button" className="photo-viewer-btn photo-viewer-next" aria-label="Next photo" onClick={() => step(1)}>
        ›
      </button>
      <p className="photo-viewer-count">{index + 1} / {photos.length}</p>
    </div>
  )
}
