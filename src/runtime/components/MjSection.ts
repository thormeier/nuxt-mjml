import MjSection from 'mjml-section-snyk'
import type { MjSectionAllowedAttributes, MjSectionConstructor } from 'mjml-section-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjSectionConstructor, typeof MjSectionAllowedAttributes>(MjSection, true)
