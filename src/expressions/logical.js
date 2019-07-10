import {
  isPlainObject
} from 'lodash'

import { evaluate } from '../expression'

export const $AND = '$and'
const $and = ({ context, operators }, ...expressions) => {
  return expressions.every(exp => evaluate(operators, exp, context))
}

export const $OR = '$or'
const $or = ({ context, operators }, ...expressions) => {
  return expressions.some(exp => evaluate(operators, exp, context))
}

export const LOGICAL_EXPRESSIONS = {
  $and,
  $or
}
