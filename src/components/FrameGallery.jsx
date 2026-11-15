import { useState } from 'react'
import PhotoViewer from './PhotoViewer'

// Frames cropped from art/frames.png, numbered in sheet order. Each frame-N
// has a window-N mask of its opening (alpha only), a little bigger than the
// opening so it tucks under the frame's inner edge.
const images = import.meta.glob('../assets/frames/*.png', {
  eager: true,
  import: 'default',
})

// [width, height] of each crop, in sheet order
const SIZES = [
  [358, 506], [356, 471], [361, 513], [404, 504],
  [568, 440], [348, 490], [476, 434],
]

const FRAMES = SIZES.map(([w, h], i) => ({
  id: i + 1,
  frame: images[`../assets/frames/frame-${i + 1}.png`],
  window: images[`../assets/frames/window-${i + 1}.png`],
  w,
  h,
}))

// Seven frames interleaved in one row: top, lower, top, lower, ... The top
// four hang on short strings (`string` px); each lower one is nailed
// `nailTop` px down in the gap between two top frames and hangs `gap` px
// below the lowest top frame. A lower frame overflows its gap on both
// sides, so keep wide frames (5, 7) apart in the lower row: the gallery gap
// in App.css is sized so the wide pink one clears its neighbour. `narrow` is each string's
// length in the wrapped layout on small screens.
const ARRANGEMENT = [
  { id: 1, string: 24, narrow: 40 },
  { id: 3, low: true, nailTop: 60, gap: 24, narrow: 120 },
  { id: 4, string: 44, narrow: 24 },
  { id: 6, low: true, nailTop: 30, gap: 12, narrow: 90 },
  { id: 2, string: 14, narrow: 60 },
  { id: 5, low: true, nailTop: 140, gap: 8, narrow: 30 },
  { id: 7, string: 34, narrow: 110 },
]

// Astana photos (JPGs, 1600px on the long side) by frame id. Landscape shots
// go in the wide frames (5, 7) and the squarest one (4); a frame without a
// photo stays light blue.
const photos = import.meta.glob('../assets/Astana_pics/*.jpg', {
  eager: true,
  import: 'default',
})
const PHOTOS = {
  1: 'IMG_3231',
  3: 'IMG_3288',
  4: 'IMG_3264',
  5: 'IMG_4124',
  7: 'IMG_3792',
  2: 'IMG_3315',
  6: 'IMG_3388',
}

const LONGEST_TOP = Math.max(...ARRANGEMENT.filter(a => !a.low).map(a => a.string))

// Each frame with its nail position and string length as CSS (a lower
// frame's string reaches past the top frames, so it depends on --frame-h)
const HUNG = ARRANGEMENT.map(a => ({
  frame: FRAMES[a.id - 1],
  low: !!a.low,
  nailTop: a.low ? a.nailTop : 0,
  string: a.low
    ? `calc(var(--frame-h) + ${LONGEST_TOP + a.gap - a.nailTop}px)`
    : `${a.string}px`,
  stringNarrow: a.narrow,
  photo: PHOTOS[a.id] && photos[`../assets/Astana_pics/${PHOTOS[a.id]}.jpg`],
}))

// The photos in the order they hang, left to right, for the viewer
const GALLERY_PHOTOS = HUNG.map(h => h.photo).filter(Boolean)

// One picture frame hanging from a nail on a string: the light-blue opening
// (clipped to the frame's window mask, so anything put inside it is too),
// with the frame drawn on top. It falls in from above `delay` ms after the
// tab opens, then swings to rest. Hovering it starts a wiggle that always
// plays to the end, even if the pointer leaves straight away.
function PictureFrame({ hung, delay, children }) {
  const { frame } = hung
  const mask = `url(${frame.window})`
  const [wiggling, setWiggling] = useState(false)
  return (
    <div
      className="frame-hanger"
      style={{
        animationDelay: `${delay}ms`,
        '--nail-top': `${hung.nailTop}px`,
        '--string': hung.string,
        '--string-narrow': `${hung.stringNarrow}px`,
      }}
    >
      <span className="frame-nail" />
      {/* string and frame wiggle on the nail when hovered */}
      <div
        className={`frame-swing${wiggling ? ' is-wiggling' : ''}`}
        onMouseEnter={() => setWiggling(true)}
        onAnimationEnd={e => { if (e.target === e.currentTarget) setWiggling(false) }}
      >
        <span className="frame-string" />
        <div className="picture-frame" style={{ aspectRatio: `${frame.w} / ${frame.h}` }}>
          <div className="picture-frame-window" style={{ maskImage: mask, WebkitMaskImage: mask }}>
            {children}
          </div>
          <img src={frame.frame} alt="" draggable={false} className="picture-frame-img" />
        </div>
      </div>
    </div>
  )
}

// The wall of hanging picture frames (on the My Hometown page). Clicking a
// photo opens it whole in the viewer.
export default function FrameGallery() {
  const [open, setOpen] = useState(null)   // index into GALLERY_PHOTOS
  return (
    <div className="frame-gallery">
      {HUNG.map((hung, i) => {
        const frame = (
          <PictureFrame key={hung.frame.id} hung={hung} delay={i * 140}>
            {hung.photo && (
              <button
                type="button"
                className="picture-frame-photo-btn"
                aria-label="View photo of Astana"
                onClick={() => setOpen(GALLERY_PHOTOS.indexOf(hung.photo))}
              >
                <img src={hung.photo} alt="Astana" draggable={false} className="picture-frame-photo" />
              </button>
            )}
          </PictureFrame>
        )
        // a lower frame takes no width: it hangs centred in the gap
        return hung.low
          ? <div key={hung.frame.id} className="frame-slot-low">{frame}</div>
          : frame
      })}
      {open !== null && (
        <PhotoViewer
          photos={GALLERY_PHOTOS}
          index={open}
          onChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  )
}
