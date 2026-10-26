import SpriteLoop from './SpriteLoop'

// Frames cropped from art/character_stanford.png onto one shared 160x240 cell,
// on a common floor line (the jumping frames sit higher, as drawn).
const sprites = import.meta.glob('../assets/character-stanford/*.png', {
  eager: true,
  import: 'default',
})
const CHEER = Array.from({ length: 8 }, (_, i) =>
  sprites[`../assets/character-stanford/cheer-${i + 1}.png`])

// Cheering for Stanford, every frame for the same time
const FRAME_MS = 400

export default function StanfordCharacter() {
  return <SpriteLoop frames={CHEER} frameMs={FRAME_MS} className="stanford-character" />
}
