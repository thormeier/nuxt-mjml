import MjRaw from 'mjml-raw-snyk'
import type { MjRawAllowedAttributes, MjRawConstructor } from 'mjml-raw-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjRawConstructor, typeof MjRawAllowedAttributes>(MjRaw)
