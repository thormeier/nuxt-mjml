import MjHero from 'mjml-hero-snyk'
import type { MjHeroAllowedAttributes, MjHeroConstructor } from 'mjml-hero-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjHeroConstructor, typeof MjHeroAllowedAttributes>(MjHero)
