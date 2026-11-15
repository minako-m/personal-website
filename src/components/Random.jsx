import SpriteLoop from './SpriteLoop'

// Icons cropped from art/random_icons.png: five sets of three frames, each set
// on one shared cell (centred, on a common floor line) so they loop in place
const sprites = import.meta.glob('../assets/random-icons/*.png', {
  eager: true,
  import: 'default',
})
const frames = name => [1, 2, 3].map(i => sprites[`../assets/random-icons/${name}-${i}.png`])

// One small shelf per icon, left to right, with `label` written under it. `cell` is the set's [width, height]
// in px; `frameMs` how long each frame shows; `drop` nudges the shelf down
// (px) so the row looks hand-hung; `opens` is the page clicking it opens.
const SHELVES = [
  { name: 'computer', label: 'competitive programming', cell: [258, 219], frameMs: 500, drop: 0, opens: 'cp' },
  { name: 'matcha', label: 'matcha', cell: [209, 246], frameMs: 450, drop: 36 },
  { name: 'flag', label: 'my hometown', cell: [279, 210], frameMs: 260, drop: 8, opens: 'hometown' },
  { name: 'sneaker', label: 'running', cell: [220, 204], frameMs: 220, drop: 44 },
  { name: 'hands', label: 'student clubs', cell: [292, 259], frameMs: 420, drop: 16 },
]

// The computer opens the Competitive Programming page, the flag My Hometown
export default function Random({ onOpen }) {
  return (
    <section id="random" className="section">
      <div className="container">
        <p className="section-eyebrow">Random</p>
        <h2 className="section-heading">Beyond the code</h2>
        <div className="icon-shelves">
          {SHELVES.map(shelf => {
            const icon = (
              <SpriteLoop
                frames={frames(shelf.name)}
                frameMs={shelf.frameMs}
                className="shelf-icon"
              />
            )
            return (
              <div
                key={shelf.name}
                className="icon-shelf"
                style={{
                  marginTop: shelf.drop,
                  '--cell-w': shelf.cell[0],
                  '--cell-h': shelf.cell[1],
                }}
              >
                {shelf.opens ? (
                  <button
                    type="button"
                    className="shelf-icon-slot shelf-icon-link"
                    onClick={() => onOpen(shelf.opens)}
                    aria-label={shelf.label}
                  >
                    {icon}
                  </button>
                ) : (
                  <div className="shelf-icon-slot">{icon}</div>
                )}
                <div className="shelf" />
                <span className="shelf-label" aria-hidden={!!shelf.opens}>{shelf.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
