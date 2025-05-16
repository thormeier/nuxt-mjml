import type { AccordionTextConstructor, AccordionTextAllowedAttributes } from 'mjml-accordion-snyk'
import { AccordionText } from 'mjml-accordion-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<AccordionTextConstructor, typeof AccordionTextAllowedAttributes>(AccordionText)
