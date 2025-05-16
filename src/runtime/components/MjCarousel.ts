import type { CarouselAllowedAttributes, CarouselConstructor } from 'mjml-carousel-snyk'
import { Carousel } from 'mjml-carousel-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<CarouselConstructor, typeof CarouselAllowedAttributes>(Carousel)
