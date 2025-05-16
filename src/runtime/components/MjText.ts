import MjText from 'mjml-text-snyk'
import type { MjTextAllowedAttributes, MjTextConstructor } from 'mjml-text-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjTextConstructor, typeof MjTextAllowedAttributes>(MjText)
