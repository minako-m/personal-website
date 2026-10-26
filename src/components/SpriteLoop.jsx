import { useEffect, useState } from 'react'

// Plays `frames` (image URLs) on a loop, every frame for the same `frameMs`.
// `order` lists frame indexes in play order; defaults to 0..n-1.
export default function SpriteLoop({ frames, frameMs, order, className }) {
  const [step, setStep] = useState(0)
  const steps = order ?? [...frames.keys()]

  useEffect(() => {
    for (const src of frames) new Image().src = src

    const interval = setInterval(() => setStep(s => (s + 1) % steps.length), frameMs)
    return () => clearInterval(interval)
  }, [frames, frameMs, steps.length])

  return <img src={frames[steps[step]]} alt="" draggable={false} className={className} />
}
