import {
  isPlainObject
} from 'lodash'

import {
  evaluate
} from '../expression'

export const $and = (options, expressions) => {
  return expressions.every(expression => evaluate(options, expression))
}

export const $or = (options, expressions) => {
  return expressions.some(expression => evaluate(options, expression))
}

export const $not = (expression, value, options) => {
  return !evaluate(options, expression, value)
}
