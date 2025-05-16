export function extractBorderColor(border: string) {
  const colorRegex = /(#[0-9a-fA-F]{3,6}|rgba?\([\d\s,.%]+\))/
  const match = border.match(colorRegex)

  return match ? match[0] : null
}
