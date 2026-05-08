const hobbies = [
  { emoji: '🧗', name: 'Rock Climbing' },
  { emoji: '📷', name: 'Photography' },
  { emoji: '🍳', name: 'Cooking' },
  { emoji: '📚', name: 'Reading' },
  { emoji: '💻', name: 'Open Source' },
  { emoji: '♟️', name: 'Chess' },
]

export default function Hobbies() {
  return (
    <section id="hobbies" className="section section-alt">
      <div className="container">
        <p className="section-eyebrow">Hobbies</p>
        <h2 className="section-heading">Beyond the code</h2>
        <div className="hobbies-grid">
          {hobbies.map((hobby) => (
            <div key={hobby.name} className="hobby-card">
              <span className="hobby-emoji">{hobby.emoji}</span>
              <span className="hobby-name">{hobby.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
