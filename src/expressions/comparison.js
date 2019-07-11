import {
  isEqual,
} from 'lodash'

import {
  isValidNumber,
  validateNumber,
  validateArray
} from '../util'

import { evaluate } from '../expression'
import {
  evaluateArray,
  evaluateNumber
} from '../expression-util'

const $eq = (options, valueAExp, valueBExp) => {
  return isEqual(
    evaluate(options, valueAExp),
    evaluate(options, valueBExp)
  )
}

const $ne = (options, valueAExp, valueBExp) => !$eq(options, valueAExp, valueBExp)

const $in = (options, arrayExp, valueExp) => {
  const value = evaluate(options, valueExp)
  return evaluateArray(options, arrayExp).some(item => item === value)
}

const $nin = (options, arrayExp, valueExp) => !$in(options, arrayExp, valueExp)

const $gt = (options, thresholdExp, valueExp) => {
  const threshold = evaluateNumber(options, thresholdExp)
  const value = evaluate(options, valueExp)
  return isValidNumber(value) && value > threshold
}

const $gte = (options, thresholdExp, valueExp) => {
  const threshold = evaluateNumber(options, thresholdExp)
  const value = evaluate(options, valueExp)
  return isValidNumber(value) && value >= threshold
}

const $lt = (options, thresholdExp, valueExp) => !$gte(options, thresholdExp, valueExp)

const $lte = (options, thresholdExp, valueExp) => !$gt(options, thresholdExp, valueExp)

export const COMPARISON_EXPRESSIONS = {
  $eq,
  $ne,
  $in,
  $nin,
  $gt,
  $gte,
  $lt,
  $lte,
}
