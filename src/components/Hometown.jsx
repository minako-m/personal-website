// Opened by clicking the flag girl in the pink frame on the Random tab
export default function Hometown({ onBack }) {
  return (
    <section id="hometown" className="section">
      <div className="container">
        <button type="button" className="back-link" onClick={onBack}>
          ← back to Random
        </button>
        <h2 className="section-heading">My Hometown</h2>
      </div>
    </section>
  )
}
