import { useEffect, useRef, useState } from 'react'

import imgRlean from '../assets/hijabi_pixel_character/Hijabi-pinkmoss-smiley-Rlean.png'
import imgRside from '../assets/hijabi_pixel_character/Hijabi-pinkmoss-smiley-Rside.png'
import imgLlean from '../assets/hijabi_pixel_character/Hijabi-pinkmoss-smiley-Llean.png'
import imgLside from '../assets/hijabi_pixel_character/Hijabi-pinkmoss-smiley-Lside.png'
import imgRtilt from '../assets/hijabi_pixel_character/Hijabi-pinkmoss-smiley-Rtilt.png'
import imgLtilt from '../assets/hijabi_pixel_character/Hijabi-pinkmoss-smiley-Ltilt.png'
import imgFront from '../assets/hijabi_pixel_character/Hijabi-pinkmoss-smiley-front.png'

// Display dimensions (maintains natural 105:135 ratio)
const CHAR_W = 56
const CHAR_H = 72

const WALK_SPEED = 3   // px per tick
const TICK_MS = 50     // 20 fps
const WALK_ALT = 3     // ticks per walk-frame swap
const TURN_TICKS = 8   // ticks spent showing a turn frame
const JUMP_TICKS = 20  // ticks for the full jump arc
const JUMP_H = 34      // max jump height in px

// State machine:
// walkR → rturn1(Rtilt) → rjump(front) → rturn2(Ltilt) → walkL
// walkL → lturn1(Ltilt) → ljump(front) → lturn2(Rtilt) → walkR

export default function WalkingCharacter() {
  const containerRef = useRef(null)
  const containerW = useRef(0)

  const anim = useRef({
    phase: 'walkR',
    x: 0,
    phaseTick: 0,
    walkTick: 0,
    walkFrame: 0,
  })

  const [display, setDisplay] = useState({ x: 0, bottom: 0, img: imgRlean })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const updateW = () => { containerW.current = el.offsetWidth }
    updateW()

    const ro = new ResizeObserver(updateW)
    ro.observe(el)

    const interval = setInterval(() => {
      const a = anim.current
      const maxX = containerW.current - CHAR_W
      if (maxX <= 0) return

      a.phaseTick++

      switch (a.phase) {

        case 'walkR': {
          a.x = Math.min(a.x + WALK_SPEED, maxX)
          if (++a.walkTick >= WALK_ALT) { a.walkTick = 0; a.walkFrame ^= 1 }
          const img = a.walkFrame ? imgRside : imgRlean
          if (a.x >= maxX) {
            a.phase = 'rturn1'; a.phaseTick = 0
            setDisplay({ x: a.x, bottom: 0, img: imgRtilt })
          } else {
            setDisplay({ x: a.x, bottom: 0, img })
          }
          break
        }

        case 'rturn1':
          if (a.phaseTick >= TURN_TICKS) {
            a.phase = 'rjump'; a.phaseTick = 0
            setDisplay(d => ({ ...d, img: imgFront }))
          }
          break

        case 'rjump': {
          const t = a.phaseTick / JUMP_TICKS
          const bottom = t <= 1 ? JUMP_H * Math.sin(Math.PI * t) : 0
          if (a.phaseTick >= JUMP_TICKS) {
            a.phase = 'rturn2'; a.phaseTick = 0
            setDisplay(d => ({ ...d, bottom: 0, img: imgLtilt }))
          } else {
            setDisplay(d => ({ ...d, bottom, img: imgFront }))
          }
          break
        }

        case 'rturn2':
          if (a.phaseTick >= TURN_TICKS) {
            a.phase = 'walkL'; a.phaseTick = 0; a.walkFrame = 0; a.walkTick = 0
            setDisplay(d => ({ ...d, img: imgLlean }))
          }
          break

        case 'walkL': {
          a.x = Math.max(a.x - WALK_SPEED, 0)
          if (++a.walkTick >= WALK_ALT) { a.walkTick = 0; a.walkFrame ^= 1 }
          const img = a.walkFrame ? imgLside : imgLlean
          if (a.x <= 0) {
            a.phase = 'lturn1'; a.phaseTick = 0
            setDisplay({ x: 0, bottom: 0, img: imgLtilt })
          } else {
            setDisplay({ x: a.x, bottom: 0, img })
          }
          break
        }

        case 'lturn1':
          if (a.phaseTick >= TURN_TICKS) {
            a.phase = 'ljump'; a.phaseTick = 0
            setDisplay(d => ({ ...d, img: imgFront }))
          }
          break

        case 'ljump': {
          const t = a.phaseTick / JUMP_TICKS
          const bottom = t <= 1 ? JUMP_H * Math.sin(Math.PI * t) : 0
          if (a.phaseTick >= JUMP_TICKS) {
            a.phase = 'lturn2'; a.phaseTick = 0
            setDisplay(d => ({ ...d, bottom: 0, img: imgRtilt }))
          } else {
            setDisplay(d => ({ ...d, bottom, img: imgFront }))
          }
          break
        }

        case 'lturn2':
          if (a.phaseTick >= TURN_TICKS) {
            a.phase = 'walkR'; a.phaseTick = 0; a.walkFrame = 0; a.walkTick = 0
            setDisplay(d => ({ ...d, img: imgRlean }))
          }
          break

        default:
          break
      }
    }, TICK_MS)

    return () => {
      clearInterval(interval)
      ro.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="walker-track">
      <img
        src={display.img}
        alt=""
        draggable={false}
        className="walker-char"
        style={{
          left: display.x,
          bottom: display.bottom,
          width: CHAR_W,
          height: CHAR_H,
        }}
      />
    </div>
  )
}
