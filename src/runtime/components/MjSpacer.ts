import MjSpacer from 'mjml-spacer-snyk'
import type { MjSpacerAllowedAttributes, MjSpacerConstructor } from 'mjml-spacer-snyk'
import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjSpacerConstructor, typeof MjSpacerAllowedAttributes>(MjSpacer)
