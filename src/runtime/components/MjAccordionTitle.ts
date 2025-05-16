import type { AccordionTitleConstructor, AccordionTitleAllowedAttributes } from 'mjml-accordion-snyk'
import { AccordionTitle } from 'mjml-accordion-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<AccordionTitleConstructor, typeof AccordionTitleAllowedAttributes>(AccordionTitle)
