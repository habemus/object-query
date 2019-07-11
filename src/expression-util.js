import {
  evaluate,
  isExpression
} from './expression'

import {
  validateArray,
  validateNumber,
  validateString,
  validatePlainObject,
} from './util'

const _evaluate = (validate, options, exp) => {
  const value = evaluate(options, exp)
  validate(value)

  return value
}

export const validateExpresion = (options, value) => {
  if (!isExpression(options, value)) {
    throw new Error(`${value} is not an expression`)
  }
}

export const evaluateArray = _evaluate.bind(null, validateArray)
export const evaluateNumber = _evaluate.bind(null, validateNumber)
export const evaluatePlainObject = _evaluate.bind(null, validatePlainObject)
