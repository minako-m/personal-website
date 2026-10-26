import SpriteLoop from './SpriteLoop'

// Frames cropped from art/character_coding.png onto one shared 144x240 cell,
// with the base of her crossed legs on the same line in every frame and room
// above her head for the speech bubbles and the lightbulb.
const sprites = import.meta.glob('../assets/character-coding/*.png', {
  eager: true,
  import: 'default',
})
const CODE = Array.from({ length: 8 }, (_, i) =>
  sprites[`../assets/character-coding/code-${i + 1}.png`])

// Typing → "…" → "?" → typing → lightbulb, every frame for the same time
const FRAME_MS = 400

export default function CodingCharacter() {
  return <SpriteLoop frames={CODE} frameMs={FRAME_MS} className="coding-character" />
}
