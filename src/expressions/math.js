import {
  validateNumber
} from '../util'

export const $SUM = '$sum'
const $sum = (options, ...values) => {
  return values.reduce((res, value) => {
    validateNumber(value)
    return res + value
  }, 0)
}

export const $SUBTRACT = '$subtract'
const $subtract = (options, base, ...values) => {
  return values.reduce((res, value) => {
    validateNumber(value)
    return res - value
  }, base)
}

export const MATH_EXPRESSIONS = {
  $sum,
  $subtract
}
