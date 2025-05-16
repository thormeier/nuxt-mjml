import type { AccordionElementConstructor, AccordionElementAllowedAttributes } from 'mjml-accordion-snyk'
import { AccordionElement } from 'mjml-accordion-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<AccordionElementConstructor, typeof AccordionElementAllowedAttributes>(AccordionElement)
