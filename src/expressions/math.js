import {
  validateNumber
} from '../util'

import { evaluate } from '../expression'

import { evaluateNumber } from '../expression-util'

const $mathSum = (options, ...valuesExps) => {
  return valuesExps.reduce((res, valueExp) => {
    return res + evaluateNumber(options, valueExp)
  }, 0)
}

const $mathSubtract = (options, startExp, ...valueExps) => {
  return valueExps.reduce((res, valueExp) => {
    return res - evaluateNumber(options, valueExp)
  }, evaluateNumber(options, startExp))
}

const $mathMod = (options, dividendExp, divisorExp) => {
  return evaluateNumber(options, dividendExp) % evaluateNumber(options, divisorExp)
}

const $mathAbs = (options, value) => {

}

const $mathAvg = (options, ...values) => {

}

const $mathMax = (options, ...values) => {

}

const $mathMin = (options, ...values) => {

}

export const MATH_EXPRESSIONS = {
  $mathSum,
  $mathSubtract,
  $mathMod,
}
