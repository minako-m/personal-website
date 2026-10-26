import SpriteLoop from './SpriteLoop'

// The running-right row of art/character_flag.png, cropped onto one shared
// 293x200 cell with a common floor line, so she runs in place.
const sprites = import.meta.glob('../assets/character-flag/*.png', {
  eager: true,
  import: 'default',
})
const RUN = Array.from({ length: 3 }, (_, i) =>
  sprites[`../assets/character-flag/run-${i + 1}.png`])

const FRAME_MS = 140   // a quick running stride

export default function FlagCharacter() {
  return <SpriteLoop frames={RUN} frameMs={FRAME_MS} className="flag-character" />
}
