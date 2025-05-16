import { SocialElement } from 'mjml-social-snyk'
import type { SocialElementAllowedAttributes, SocialElementConstructor } from 'mjml-social-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<SocialElementConstructor, typeof SocialElementAllowedAttributes>(SocialElement)
