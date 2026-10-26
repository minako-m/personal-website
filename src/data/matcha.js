// Matcha icons cropped from art/matcha_icons.png, numbered 1..19 in sheet
// order (left to right, top to bottom). All exported at the same scale.
const icons = import.meta.glob('../assets/matcha/*.png', {
  eager: true,
  import: 'default',
})
export const matcha = n => icons[`../assets/matcha/matcha-${n}.png`]

// Exported [width, height] in px; a typical cup is 104px tall, which displays at 1em
export const MATCHA_SIZE = [
  [119, 96], [84, 143], [81, 144], [89, 145], [82, 149], [84, 142], [109, 99],
  [109, 95], [83, 126], [84, 118], [84, 115], [71, 132], [68, 108], [77, 121],
  [74, 120], [75, 114], [76, 116], [62, 119], [100, 99],
]
export const CUP_H = 104

// `count` different matcha numbers in random order
export const randomMatcha = count => {
  const all = MATCHA_SIZE.map((_, i) => i + 1)
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[all[i], all[j]] = [all[j], all[i]]
  }
  return all.slice(0, count)
}
