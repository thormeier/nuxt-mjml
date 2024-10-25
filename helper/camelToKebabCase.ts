export default function (camelStr: string) {
  const kebabStr = camelStr.replace(/([a-z])([A-Z])/g, '$1-$2')

  return kebabStr.toLowerCase()
}
