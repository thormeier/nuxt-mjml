import type { CarouselImageConstructor, CarouselImageAllowedAttributes } from 'mjml-carousel-snyk'
import { CarouselImage } from 'mjml-carousel-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<CarouselImageConstructor, typeof CarouselImageAllowedAttributes>(CarouselImage)
