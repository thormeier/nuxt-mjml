import type { MjColumnConstructor, MjColumnAllowedAttributes } from 'mjml-column-snyk'
import MjColumn from 'mjml-column-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjColumnConstructor, typeof MjColumnAllowedAttributes>(MjColumn)
