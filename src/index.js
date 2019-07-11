// import { OBJECT_EXPRESSIONS } from './expressions/object'

import { VALUE_EXPRESSIONS, $VALUE } from './expressions/value'
import { COMPARISON_EXPRESSIONS } from './expressions/comparison'
import { LOGICAL_EXPRESSIONS } from './expressions/logical'
import { ARRAY_EXPRESSIONS } from './expressions/array'
import { MATH_EXPRESSIONS } from './expressions/math'

export * from './expression'

export const ALL_EXPRESSIONS = {
  ...VALUE_EXPRESSIONS,
  ...COMPARISON_EXPRESSIONS,
  ...LOGICAL_EXPRESSIONS,
  ...ARRAY_EXPRESSIONS,
  ...MATH_EXPRESSIONS,
  // ...OBJECT_EXPRESSIONS,
}

export {
  $VALUE,
  VALUE_EXPRESSIONS,
  COMPARISON_EXPRESSIONS,
  LOGICAL_EXPRESSIONS,
  ARRAY_EXPRESSIONS,
  MATH_EXPRESSIONS
  // OBJECT_EXPRESSIONS,
}
