import { useCallback, useEffect, useRef, useState } from 'react'
import hands from '../assets/random-icons/hands-1.png'
import boardWide from '../assets/clubs/board-wide.webp'
import boardTall from '../assets/clubs/board-tall.webp'
import msuLogo from '../assets/clubs/msu-logo.webp'
import casaLogo from '../assets/clubs/casa-logo.webp'

// One club per big polaroid on the cork board, in board order. `label` is
// written on the polaroid's bottom strip. `photoBg` is the polaroid's photo
// behind the logo (the MSU logo is pale, so it sits on deep plum; the CASA one
// has a white background, blended into the cream). `role`/`when` show under
// the name when it opens, then `note`; `links` are the buttons at the bottom.
const MSU_SITE = 'https://msu.stanford.edu'

const CLUBS = [
  {
    id: 'msu',
    name: 'Stanford Muslim Student Union',
    label: 'Muslim Student Union',
    logo: msuLogo,
    photoBg: '#4A3560',
    role: 'Spiritual Co-director',
    when: '2024 – 2026',
    note: <>I built the <a href={MSU_SITE} target="_blank" rel="noreferrer">MSU website</a>.</>,
    links: [{ label: 'msu.stanford.edu', href: MSU_SITE }],
  },
  {
    id: 'casa',
    name: 'Stanford Central Asian Student Association',
    label: 'Central Asian Student Association',
    logo: casaLogo,
    photoBg: '#FCEEE5',
    blendLogo: true,
    role: 'Outreach Lead',
    when: 'Current',
    links: [{ label: 'Instagram', href: 'https://www.instagram.com/stanford.casa/' }],
  },
]

// Where each big polaroid's photo area sits on each board, measured from
// art/clubs/board-*.png: centre (`x`, `y`, % of the board), size (`w`, `h`,
// % of the board's width, so cqw) and tilt (`rot`, degrees). The wide board
// shows above 700px, the tall one at or below (NARROW).
const SLOTS = {
  wide: [
    { x: 37.67, y: 44.14, w: 20.36, h: 18.85, rot: -6, pin: 'green' },
    { x: 62.05, y: 51.46, w: 20.59, h: 19.67, rot: 8, pin: 'purple' },
  ],
  tall: [
    { x: 34.46, y: 31.58, w: 31.77, h: 30.04, rot: -10.5, pin: 'green' },
    { x: 59.76, y: 59.45, w: 34.75, h: 29.44, rot: 11.9, pin: 'purple' },
  ],
}
const NARROW = '(max-width: 700px)'
const EXPAND_MS = 400   // matches the .club-card transitions in App.css

function useNarrow() {
  const query = typeof window !== 'undefined' && window.matchMedia?.(NARROW)
  const [narrow, setNarrow] = useState(() => !!query?.matches)
  useEffect(() => {
    if (!query) return
    const onChange = e => setNarrow(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [query])
  return narrow
}

const slotStyle = slot => ({
  '--x': `${slot.x}%`,
  '--y': `${slot.y}%`,
  '--w': `${slot.w}cqw`,
  '--h': `${slot.h}cqw`,
  '--rot': `${slot.rot}deg`,
})

// The logo in the polaroid's photo, and the club's name on the strip below
function ClubPhoto({ club }) {
  return (
    <>
      <div className="club-photo" style={{ background: club.photoBg }}>
        <img
          src={club.logo}
          alt=""
          draggable={false}
          className={`club-logo${club.blendLogo ? ' is-blended' : ''}`}
        />
      </div>
      <span className="club-label">{club.label}</span>
    </>
  )
}

// A club's polaroid, lifted off the board: it starts exactly over the one in
// the art, then straightens and stretches sideways to show the details.
function ClubCard({ club, slot, expanded, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => { if (expanded) closeRef.current?.focus() }, [expanded])
  return (
    <div
      className={`club-card${expanded ? ' is-expanded' : ''}`}
      style={slotStyle(slot)}
      role="dialog"
      aria-label={club.name}
    >
      <span className={`club-pin is-${slot.pin}`} />
      <ClubPhoto club={club} />
      <div className="club-details">
        <h3 className="club-name">{club.name}</h3>
        <p className="club-role">
          {club.role} <span className="club-when">{club.when}</span>
        </p>
        {club.note && <p>{club.note}</p>}
        <div className="club-links">
          {club.links.map(link => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>
      <button ref={closeRef} type="button" className="club-close" aria-label="Close" onClick={onClose}>
        ✕
      </button>
    </div>
  )
}

// Opened by clicking the hands on the Random tab's shelves. Clicking a club's
// polaroid opens it; the ✕, Escape or a click elsewhere on the board closes it.
export default function StudentClubs({ onBack }) {
  const narrow = useNarrow()
  const slots = SLOTS[narrow ? 'tall' : 'wide']
  // { index, phase }: 'mounting' (the card sits over the polaroid), 'open'
  // (stretched out), 'closing' (shrinking back, then removed)
  const [open, setOpen] = useState(null)
  const phase = open?.phase

  // mount the card over the polaroid first, then expand it on the next frame
  useEffect(() => {
    if (phase !== 'mounting') return
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setOpen(o => o && { ...o, phase: 'open' }))
    })
    return () => cancelAnimationFrame(id)
  }, [phase])

  // once it has shrunk back over the polaroid, take it away
  useEffect(() => {
    if (phase !== 'closing') return
    const id = setTimeout(() => setOpen(null), EXPAND_MS)
    return () => clearTimeout(id)
  }, [phase])

  const close = useCallback(() => setOpen(o => o && o.phase !== 'closing' ? { ...o, phase: 'closing' } : o), [])

  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <section id="student-clubs" className="section">
      <div className="container">
        <button type="button" className="back-link" onClick={onBack}>
          ← back to Random
        </button>
        <div className="cp-heading">
          <img src={hands} alt="" className="cp-heading-icon" draggable={false} />
          <h2 className="section-heading">Student Clubs</h2>
        </div>

        <div className={`clubs-board${narrow ? ' is-tall' : ''}`}>
          <img src={narrow ? boardTall : boardWide} alt="" className="clubs-board-img" draggable={false} />
          {CLUBS.map((club, i) => (
            <button
              key={club.id}
              type="button"
              className={`club-slot${open?.index === i ? ' is-open' : ''}`}
              style={slotStyle(slots[i])}
              aria-label={`${club.name}: show details`}
              onClick={() => setOpen({ index: i, phase: 'mounting' })}
            >
              <ClubPhoto club={club} />
            </button>
          ))}
          {open && (
            <>
              <div className="clubs-backdrop" onClick={close} />
              <ClubCard
                club={CLUBS[open.index]}
                slot={slots[open.index]}
                expanded={phase === 'open'}
                onClose={close}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
