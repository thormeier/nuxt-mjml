import MjTable from 'mjml-table-snyk'
import type { MjTableAllowedAttributes, MjTableConstructor } from 'mjml-table-snyk'

import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<MjTableConstructor, typeof MjTableAllowedAttributes>(MjTable)
