import type { BodyComponentConstructor } from 'mjml-core-snyk'

export function isComponent<T extends BodyComponentConstructor>(
  c: BodyComponentConstructor,
  target: T,
): c is T {
  return c.componentName === target.componentName
}
