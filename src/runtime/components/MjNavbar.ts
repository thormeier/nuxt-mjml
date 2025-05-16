import { Navbar } from 'mjml-navbar-snyk'
import type { NavbarAllowedAttributes, NavbarConstructor } from 'mjml-navbar-snyk'
import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<NavbarConstructor, typeof NavbarAllowedAttributes>(Navbar)
