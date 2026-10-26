import SpriteLoop from './SpriteLoop'

// Frames cropped from art/character_teaching.png onto one shared 171x240 cell,
// feet on the same floor line in every frame.
const sprites = import.meta.glob('../assets/character-teaching/*.png', {
  eager: true,
  import: 'default',
})
const TEACH = Array.from({ length: 8 }, (_, i) =>
  sprites[`../assets/character-teaching/teach-${i + 1}.png`])

// Pointing through the blackboard slides, every frame for the same time
const FRAME_MS = 400

export default function TeachingCharacter() {
  return <SpriteLoop frames={TEACH} frameMs={FRAME_MS} className="teaching-character" />
}
