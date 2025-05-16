import type { MjDividerAllowedAttributes, MjDividerConstructor } from 'mjml-divider-snyk'
import MjDivider from 'mjml-divider-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjDividerConstructor, typeof MjDividerAllowedAttributes>(MjDivider)
