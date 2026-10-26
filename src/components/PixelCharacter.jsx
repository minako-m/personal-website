import { useEffect, useRef, useState } from 'react'

// Frames cropped from art/character_sheet.png, all on the same
// 220x308 cell with a shared ground line, so they can be swapped freely.
const sprites = import.meta.glob('../assets/character/*.png', {
  eager: true,
  import: 'default',
})
const frames = (name, count) =>
  Array.from({ length: count }, (_, i) =>
    sprites[`../assets/character/${name}-${i + 1}.png`])

const JUMP = frames('jump', 9)
const IDLE = frames('idle', 4)
// drink-* come from art/character_drinking.png, scaled to match the idle frames
const DRINK = frames('drink', 8)

// Heart burst cropped from art/heart_burst.png: 5 frames on the same square
// cell, all centred on the same point, growing outwards
const hearts = import.meta.glob('../assets/heart-burst/*.png', {
  eager: true,
  import: 'default',
})
const HEARTS = Array.from({ length: 5 }, (_, i) => hearts[`../assets/heart-burst/hearts-${i + 1}.png`])

// Sleeping frames from art/character_sleeping.png on one 240x260 cell: her back
// is on the same vertical line in every frame (8.3% in from the left), so she
// stays leaning on the last letter of "Amira" while she dozes
const sleeping = import.meta.glob('../assets/character-sleeping/*.png', {
  eager: true,
  import: 'default',
})
const SLEEP = Array.from({ length: 8 }, (_, i) => sleeping[`../assets/character-sleeping/sleep-${i + 1}.png`])

// Display dimensions in em, so she scales with the heading font size.
// The heading is clamp(4rem, 10vw, 8rem), so she's ~80px tall on phones,
// ~113px at a 900px-wide window and ~160px on wide desktops.
const CHAR_H = 1.25
const CHAR_W = CHAR_H * 220 / 308
const GAP = 0.1        // em between the end of the first name and her

// Asleep she sits instead of standing. Sized so her head matches the standing
// sprite's; the cell's floor is 98.5% down and her back 8.3% in from its left.
const SLEEP_H = 1.187
const SLEEP_W = SLEEP_H * 240 / 260
const LEAN = 0.1                     // em her backpack overlaps the "a", so she's clearly resting on it
const SLEEP_LEFT = -0.083 * SLEEP_W - LEAN
const SLEEP_BOTTOM = -0.015 * SLEEP_H + 0.15 // her seat level with the bottom of the "a" (its baseline sits 0.15em above the track)

const TICK_MS = 50     // 20 fps
// Ticks to hold each idle frame: rest, glance, blink, look around
const IDLE_TICKS = [30, 14, 4, 18]
// Ticks to hold each drink frame: hold cup, raise, sip (eyes closed), lower, happy
const DRINK_TICKS = [4, 4, 4, 7, 7, 4, 4, 8]
// Ticks to hold each jump frame: wind-up, quick in the air, settle
const JUMP_TICKS = [3, 3, 2, 2, 3, 2, 3, 3, 4]
const AIR_START = 2    // jump frames AIR_START..AIR_END are airborne
const AIR_END = 5
const JUMP_H = 0.17    // extra lift in em on top of the sprite's own arc

// Ticks per sleep frame; the 8 frames loop as the zzz's come and go
const SLEEP_TICKS = 12

// She sleeps from 10pm to 6am in the visitor's own time zone (or always with
// ?night in the URL, for testing). She dozes off soon after the page loads,
// and again after a minute without being clicked or fed.
const isNight = () => {
  if (new URLSearchParams(window.location.search).has('night')) return true
  const h = new Date().getHours()
  return h >= 22 || h < 6
}
const DOZE_FIRST = 30   // ticks (1.5s) after the page loads
const DOZE_AGAIN = 1200 // ticks (60s) after she's woken up

const BURST_SIZE = 2.4 // em, the heart burst's square (its last frame fills it)
// Ticks per burst frame, and how opaque each one is (the last ones fade out)
const BURST_TICKS = [2, 2, 3, 3, 4]
const BURST_OPACITY = [1, 1, 1, 0.85, 0.5]

// State machine: idle loop (rest, glance, blink, look around) → drink → jump → idle …
// At night, idle → sleep after a while; clicking her wakes her to idle,
// feeding her wakes her straight into drink → jump.
// She only drinks and jumps when `feedCount` goes up (a matcha was dropped
// on her). A drop while she's drinking or jumping queues one more round.
// Each jump sets off a heart burst as she leaves the ground; it plays on its
// own clock, so it can keep fading while she lands.

export default function PixelCharacter({ imgRef, feedCount = 0 }) {
  const anim = useRef({
    phase: 'idle',
    tick: 0,
    frame: 0,
    fed: false,         // a matcha arrived; drink + jump on the next idle tick
    woken: false,       // she was clicked while asleep
    awake: 0,           // ticks spent awake since the last doze
    dozeAfter: DOZE_FIRST,
    burst: -1,         // heart burst frame, -1 when not showing
    burstTick: 0,
  })

  const [display, setDisplay] = useState({ bottom: 0, img: IDLE[0], asleep: false })
  const [burst, setBurst] = useState(-1)

  useEffect(() => {
    if (feedCount > 0) anim.current.fed = true
  }, [feedCount])

  useEffect(() => {
    // Warm the cache so frame swaps never flash
    for (const src of [...JUMP, ...IDLE, ...DRINK, ...HEARTS, ...SLEEP]) new Image().src = src

    const interval = setInterval(() => {
      const a = anim.current
      a.tick++

      if (a.burst >= 0 && ++a.burstTick >= BURST_TICKS[a.burst]) {
        a.burstTick = 0
        a.burst = a.burst + 1 < HEARTS.length ? a.burst + 1 : -1
        setBurst(a.burst)
      }

      switch (a.phase) {

        case 'idle':
          if (a.fed) a.awake = 0
          if (!a.fed && ++a.awake >= a.dozeAfter && isNight()) {
            a.phase = 'sleep'; a.tick = 0; a.frame = 0
            setDisplay({ bottom: 0, img: SLEEP[0], asleep: true })
            break
          }
          if (a.fed) {
            a.fed = false
            a.phase = 'drink'; a.tick = 0; a.frame = 0
            setDisplay({ bottom: 0, img: DRINK[0] })
            break
          }
          if (a.tick >= IDLE_TICKS[a.frame]) {
            a.tick = 0
            a.frame = (a.frame + 1) % IDLE.length
            setDisplay({ bottom: 0, img: IDLE[a.frame] })
          }
          break

        case 'drink':
          if (a.tick >= DRINK_TICKS[a.frame]) {
            a.tick = 0
            if (++a.frame >= DRINK.length) {
              a.phase = 'jump'; a.frame = 0
              setDisplay({ bottom: 0, img: JUMP[0] })
              break
            }
            setDisplay({ bottom: 0, img: DRINK[a.frame] })
          }
          break

        case 'jump': {
          if (a.tick >= JUMP_TICKS[a.frame]) {
            a.tick = 0
            if (++a.frame >= JUMP.length) {
              a.phase = 'idle'; a.frame = 0
              setDisplay({ bottom: 0, img: IDLE[0] })
              break
            }
            if (a.frame === AIR_START) {
              a.burst = 0; a.burstTick = 0
              setBurst(0)
            }
          }
          let bottom = 0
          if (a.frame >= AIR_START && a.frame <= AIR_END) {
            const airTicks = JUMP_TICKS.slice(AIR_START, AIR_END + 1).reduce((s, t) => s + t, 0)
            const elapsed = JUMP_TICKS.slice(AIR_START, a.frame).reduce((s, t) => s + t, 0) + a.tick
            bottom = JUMP_H * Math.sin(Math.PI * elapsed / airTicks)
          }
          setDisplay({ bottom, img: JUMP[a.frame] })
          break
        }

        case 'sleep': {
          if (a.fed || a.woken) {
            a.woken = false
            a.awake = 0; a.dozeAfter = DOZE_AGAIN
            a.phase = 'idle'; a.tick = 0; a.frame = 0   // a pending feed starts drinking from idle
            setDisplay({ bottom: 0, img: IDLE[0], asleep: false })
            break
          }
          if (a.tick >= SLEEP_TICKS) {
            a.tick = 0
            a.frame = (a.frame + 1) % SLEEP.length
            setDisplay({ bottom: 0, img: SLEEP[a.frame], asleep: true })
          }
          break
        }

        default:
          break
      }
    }, TICK_MS)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="character-track">
      {burst >= 0 && (
        <img
          src={HEARTS[burst]}
          alt=""
          draggable={false}
          className="heart-burst"
          style={{
            // centred on her (her box starts GAP from the track's left edge)
            left: `${GAP + CHAR_W / 2 - BURST_SIZE / 2}em`,
            bottom: `${CHAR_H / 2 - BURST_SIZE / 2}em`,
            width: `${BURST_SIZE}em`,
            height: `${BURST_SIZE}em`,
            opacity: BURST_OPACITY[burst],
          }}
        />
      )}
      <img
        ref={imgRef}
        src={display.img}
        alt={display.asleep ? 'Sleeping; click to wake her up' : ''}
        draggable={false}
        className={`character-sprite${display.asleep ? ' is-asleep' : ''}`}
        onClick={display.asleep ? () => { anim.current.woken = true } : undefined}
        style={display.asleep ? {
          left: `${SLEEP_LEFT}em`,
          bottom: `${SLEEP_BOTTOM}em`,
          width: `${SLEEP_W}em`,
          height: `${SLEEP_H}em`,
        } : {
          left: `${GAP}em`,
          bottom: `${display.bottom}em`,
          width: `${CHAR_W}em`,
          height: `${CHAR_H}em`,
        }}
      />
    </div>
  )
}
