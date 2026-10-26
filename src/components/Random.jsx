import { useState } from 'react'
import FlagCharacter from './FlagCharacter'

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

function shuffled(list) {
  const out = [...list]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// One picture frame: the light-blue opening (clipped to the frame's window
// mask, so anything put inside it is too), with the frame drawn on top
function PictureFrame({ frame, children }) {
  const mask = `url(${frame.window})`
  return (
    <div className="picture-frame" style={{ aspectRatio: `${frame.w} / ${frame.h}` }}>
      <div className="picture-frame-window" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        {children}
      </div>
      <img src={frame.frame} alt="" draggable={false} className="picture-frame-img" />
    </div>
  )
}

export default function Random() {
  // A new order on every visit to the tab
  const [frames] = useState(() => shuffled(FRAMES))
  return (
    <section id="random" className="section">
      <div className="container">
        <p className="section-eyebrow">Random</p>
        <h2 className="section-heading">Beyond the code</h2>
        <div className="frame-gallery">
          {frames.map((frame) => (
            <PictureFrame key={frame.id} frame={frame} />
          ))}
        </div>
        <div className="random-runner">
          <FlagCharacter />
        </div>
      </div>
    </section>
  )
}
