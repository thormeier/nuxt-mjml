import type { MjBodyConstructor, MjBodyAllowedAttributes } from 'mjml-body-snyk'
import MjBody from 'mjml-body-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjBodyConstructor, typeof MjBodyAllowedAttributes>(MjBody)
