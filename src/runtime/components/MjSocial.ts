import { Social } from 'mjml-social-snyk'
import type { SocialAllowedAttributes, SocialConstructor } from 'mjml-social-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<SocialConstructor, typeof SocialAllowedAttributes>(Social)
