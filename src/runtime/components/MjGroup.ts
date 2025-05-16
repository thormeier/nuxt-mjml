import MjGroup from 'mjml-group-snyk'
import type { MjGroupAllowedAttributes, MjGroupConstructor } from 'mjml-group-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjGroupConstructor, typeof MjGroupAllowedAttributes>(MjGroup, true)
