import SpriteLoop from './SpriteLoop'

// Frames cropped from art/character_rocket.png onto one shared 141x300 cell.
// Each frame keeps its height from the sheet, so she bobs as drawn.
const sprites = import.meta.glob('../assets/character-rocket/*.png', {
  eager: true,
  import: 'default',
})
const ROCKET = Array.from({ length: 8 }, (_, i) =>
  sprites[`../assets/character-rocket/rocket-${i + 1}.png`])

// Riding Hoover Tower to space, every frame for the same time
const FRAME_MS = 400

export default function RocketCharacter() {
  return <SpriteLoop frames={ROCKET} frameMs={FRAME_MS} className="rocket-character" />
}
