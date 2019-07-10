import { COMPARISON_EXPRESSIONS } from './expressions/comparison'
import { LOGICAL_EXPRESSIONS } from './expressions/logical'
import { OBJECT_EXPRESSIONS } from './expressions/object'
import { ARRAY_EXPRESSIONS } from './expressions/array'
import { MATH_EXPRESSIONS } from './expressions/math'

export * from './expression'

export const ALL_EXPRESSIONS = {
  ...COMPARISON_EXPRESSIONS,
  ...LOGICAL_EXPRESSIONS,
  ...OBJECT_EXPRESSIONS,
  ...ARRAY_EXPRESSIONS,
  ...MATH_EXPRESSIONS,
}

export const $VALUE = ['$path', null]

export {
  COMPARISON_EXPRESSIONS,
  LOGICAL_EXPRESSIONS,
  OBJECT_EXPRESSIONS,
  ARRAY_EXPRESSIONS,
  MATH_EXPRESSIONS
}
