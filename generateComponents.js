import fs from 'node:fs'

function camelToKebab(camelStr) {
  const kebabStr = camelStr.replace(/([a-z])([A-Z])/g, '$1-$2')
  return kebabStr.toLowerCase()
}

Object.entries({
  Accordion: 'Accordion',
  AccordionElement: 'Accordion',
  AccordionText: 'Accordion',
  AccordionTitle: 'Accordion',
  Body: 'Body',
  Button: 'Button',
  Carousel: 'Carousel',
  CarouselImage: 'Carousel',
  Column: 'Column',
  Divider: 'Divider',
  Group: 'Group',
  HeadAttributes: 'HeadAttributes',
  HeadBreakpoint: 'HeadBreakpoint',
  HeadFont: 'HeadFont',
  HeadHtmlAttributes: 'HeadHtmlAttributes',
  Head: 'Head',
  HeadStyle: 'HeadStyle',
  HeadTitle: 'HeadTitle',
  Hero: 'Hero',
  Image: 'Image',
  Navbar: 'Navbar',
  Raw: 'Raw',
  Section: 'Section',
  Social: 'Social',
  SocialElement: 'Social',
  Spacer: 'Spacer',
  Table: 'Table',
  Text: 'Text',
}).forEach(([name, from]) => {
  const libName = camelToKebab(from)
  fs.writeFileSync(`./src/runtime/components/Mj${name}.ts`, `
import Mjml${name} from 'mjml-${libName}-snyk'

import setupMjmlComponent from '../../../helper/setupMjmlComponent'

export default setupMjmlComponent(Mjml${name})
  `)

  console.log(`
addComponent({
  name: 'mj-${camelToKebab(name)}',
  filePath: resolver.resolve('runtime/components/Mj${name}.ts')
})
  `)
})
