import FrameGallery from './FrameGallery'

// Opened by clicking the flag on the Random tab's shelves
export default function Hometown({ onBack }) {
  return (
    <section id="hometown" className="section">
      <div className="container">
        <button type="button" className="back-link" onClick={onBack}>
          ← back to Random
        </button>
        <h2 className="section-heading">My Hometown</h2>
        <FrameGallery />
      </div>
    </section>
  )
}
