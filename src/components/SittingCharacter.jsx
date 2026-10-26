import SpriteLoop from './SpriteLoop'

// Frames cropped from art/character_sitting.png onto one shared 150x260 cell.
// The bottom of her hands (the ledge she sits on) is at the same height in
// every frame; .sitting-character lines that up with the card's top edge.
const sprites = import.meta.glob('../assets/character-sitting/*.png', {
  eager: true,
  import: 'default',
})
const SIT = Array.from({ length: 8 }, (_, i) =>
  sprites[`../assets/character-sitting/sit-${i + 1}.png`])

const FRAME_MS = 300   // every frame shows for the same time
// Forwards then backwards, each end frame shown twice: 1..8, 8..1, repeat
const ORDER = [...SIT.keys(), ...[...SIT.keys()].reverse()]

export default function SittingCharacter() {
  return <SpriteLoop frames={SIT} frameMs={FRAME_MS} order={ORDER} className="sitting-character" />
}
