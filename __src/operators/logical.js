import {
  isPlainObject
} from 'lodash'

import {
  evaluate
} from '../expression'

export const $and = (operators, value, ...expressions) => {
  return expressions.every(expression => {
    // console.log('$and', 'expression', expression)
    return evaluate(operators, value, expression)
  })
}

// export const $or = (options, expressions) => {
//   return expressions.some(expression => evaluate(options, expression))
// }

// export const $not = (expression, value, options) => {
//   return !evaluate(options, expression, value)
// }
