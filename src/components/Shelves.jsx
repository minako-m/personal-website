import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Matcha icons cropped from art/matcha_icons.png, numbered in sheet
// order (left to right, top to bottom). All exported at the same scale.
const icons = import.meta.glob('../assets/matcha/*.png', {
  eager: true,
  import: 'default',
})
const matcha = n => icons[`../assets/matcha/matcha-${n}.png`]

// Exported [width, height] in px; a typical cup is 104px tall, which displays at 1em
const MATCHA_SIZE = [
  [119, 96], [84, 143], [81, 144], [89, 145], [82, 149], [84, 142], [109, 99],
  [109, 95], [83, 126], [84, 118], [84, 115], [71, 132], [68, 108], [77, 121],
  [74, 120], [75, 114], [76, 116], [62, 119], [100, 99],
]
const CUP_H = 104

// Shelves beside the name. Positions are % of the shelf rack, deliberately
// uneven so they look hand-hung. `top` is where the plank sits; `items` are
// matcha icon numbers, left to right.
const shelves = [
  { top: '8%', left: '30%', width: '62%', items: [1, 5, 18] },
  { top: '24%', left: '0%', width: '80%', items: [3, 7, 14, 12] },
  { top: '40%', left: '40%', width: '60%', items: [13, 10, 6] },
  { top: '56%', left: '6%', width: '84%', items: [4, 8, 16, 2] },
  { top: '72%', left: '52%', width: '38%', items: [19, 11] },
  { top: '88%', left: '16%', width: '56%', items: [15, 9, 17] },
]

// On phones there's no room beside the name, so a shorter rack sits below it
const PHONE = '(max-width: 600px)'
const phoneShelves = [
  { top: '24%', left: '16%', width: '66%', items: [1, 5, 18, 12] },
  { top: '58%', left: '0%', width: '80%', items: [3, 7, 14, 6] },
  { top: '92%', left: '30%', width: '62%', items: [13, 10, 19] },
]

const SHELF_PAD = 0.06 // matches .shelf-items padding (each side, fraction of shelf width)
const ITEM_GAP = 4     // px, the least space left between two drinks

// How many of a shelf's drinks fit on it, keeping them in order
const fitting = (items, shelfPx, fontPx) => {
  const room = shelfPx * (1 - 2 * SHELF_PAD)
  let used = 0
  let count = 0
  for (const n of items) {
    used += MATCHA_SIZE[n - 1][0] / CUP_H * fontPx + (count ? ITEM_GAP : 0)
    if (used > room) break
    count++
  }
  return count
}

const HIT_PAD = 12     // px of slack around the character when dropping

const overlaps = (a, b) =>
  a.left < b.right + HIT_PAD && a.right > b.left - HIT_PAD &&
  a.top < b.bottom + HIT_PAD && a.bottom > b.top - HIT_PAD

// Dragging picks up a copy of the drink (the shelf keeps its own, so the
// supply never runs out). Dropped on the character it shrinks into her and
// calls onFeed; dropped anywhere else it floats back to its shelf.
export default function Shelves({ targetRef, onFeed }) {
  const rackRef = useRef(null)
  // Which layout is showing, and how many drinks fit on each of its shelves
  const [fit, setFit] = useState({ phone: false, counts: null })
  // The copy being carried: { src, w, h, x, y, phase: 'drag' | 'eaten' | 'return' }
  const [held, setHeld] = useState(null)
  // Fixed for the whole drag: where it was grabbed and where it came from
  const drag = useRef(null)
  const dragging = held?.phase === 'drag'

  const layout = fit.phone ? phoneShelves : shelves

  useLayoutEffect(() => {
    const measure = () => {
      const rack = rackRef.current
      const items = rack?.querySelector('.shelf-items')
      if (!rack || !items) return
      const phone = window.matchMedia(PHONE).matches
      const fontPx = parseFloat(getComputedStyle(items).fontSize)
      const counts = (phone ? phoneShelves : shelves).map(s =>
        fitting(s.items, rack.clientWidth * parseFloat(s.width) / 100, fontPx))
      setFit(f => (f.phone === phone && String(f.counts) === String(counts) ? f : { phone, counts }))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const pickUp = (e, n) => {
    if (e.button !== 0 || held) return
    e.preventDefault()
    const r = e.currentTarget.getBoundingClientRect()
    drag.current = {
      grab: { x: e.clientX - r.left, y: e.clientY - r.top },
      origin: { x: r.left, y: r.top },
      w: r.width,
      h: r.height,
    }
    setHeld({ src: matcha(n), w: r.width, h: r.height, x: r.left, y: r.top, phase: 'drag' })
  }

  useEffect(() => {
    if (!dragging) return

    const move = e => {
      const { grab } = drag.current
      setHeld(h => ({ ...h, x: e.clientX - grab.x, y: e.clientY - grab.y }))
    }

    const drop = e => {
      const { grab, origin, w, h } = drag.current
      const x = e.clientX - grab.x
      const y = e.clientY - grab.y
      const target = targetRef.current?.getBoundingClientRect()

      if (target && overlaps({ left: x, top: y, right: x + w, bottom: y + h }, target)) {
        // shrink into the middle of her
        onFeed()
        setHeld(held => ({
          ...held,
          phase: 'eaten',
          x: (target.left + target.right) / 2 - w / 2,
          y: (target.top + target.bottom) / 2 - h / 2,
        }))
      } else if (Math.hypot(x - origin.x, y - origin.y) < 2) {
        setHeld(null)   // barely moved: nothing to animate back
      } else {
        setHeld(held => ({ ...held, phase: 'return', x: origin.x, y: origin.y }))
      }
    }

    document.body.classList.add('matcha-dragging')
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', drop)
    window.addEventListener('pointercancel', drop)
    return () => {
      document.body.classList.remove('matcha-dragging')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', drop)
      window.removeEventListener('pointercancel', drop)
    }
  }, [dragging, targetRef, onFeed])

  return (
    <div className="hero-shelves" aria-hidden="true">
      <div className="hero-shelves-rack" ref={rackRef}>
        {layout.map(({ items, ...pos }, i) => fit.counts?.[i] !== 0 && (
          <div key={`${fit.phone}-${i}`} className="shelf-slot" style={pos}>
            <div className="shelf" />
            <div className="shelf-items">
              {items.slice(0, fit.counts?.[i] ?? items.length).map(n => (
                <img
                  key={n}
                  src={matcha(n)}
                  alt=""
                  draggable={false}
                  onPointerDown={e => pickUp(e, n)}
                  style={{ height: `${MATCHA_SIZE[n - 1][1] / CUP_H}em` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {held && (
        <img
          src={held.src}
          alt=""
          className={`matcha-held is-${held.phase}`}
          style={{ left: held.x, top: held.y, width: held.w, height: held.h }}
          onTransitionEnd={() => held.phase !== 'drag' && setHeld(null)}
        />
      )}
    </div>
  )
}
