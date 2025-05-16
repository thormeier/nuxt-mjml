import { NavbarLink } from 'mjml-navbar-snyk'
import type { NavbarLinkAllowedAttributes, NavbarLinkConstructor } from 'mjml-navbar-snyk'
import setupMjmlComponent from '../helper/setupMjmlComponent'

export default setupMjmlComponent<NavbarLinkConstructor, typeof NavbarLinkAllowedAttributes>(NavbarLink)
