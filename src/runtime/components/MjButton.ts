import type { MjButtonConstructor, MjButtonAllowedAttributes } from 'mjml-button-snyk'
import MjButton from 'mjml-button-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjButtonConstructor, typeof MjButtonAllowedAttributes>(MjButton)
