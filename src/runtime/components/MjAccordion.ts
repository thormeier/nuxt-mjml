import type { AccordionConstructor, AccordionAllowedAttributes } from 'mjml-accordion-snyk'
import { Accordion } from 'mjml-accordion-snyk'
import type { DefineComponent } from 'vue'
import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<AccordionConstructor, typeof AccordionAllowedAttributes>(Accordion) as unknown as DefineComponent<typeof AccordionAllowedAttributes>
