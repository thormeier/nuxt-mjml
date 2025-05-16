import MjImage from 'mjml-image-snyk'
import type { MjImageAllowedAttributes, MjImageConstructor } from 'mjml-image-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjImageConstructor, typeof MjImageAllowedAttributes>(MjImage)
