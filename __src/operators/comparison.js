import {
  isEqual,
  get
} from 'lodash'

import {
  isValidNumber,
  validateNumber,
} from '../util'

import { evaluate } from '../expression'

export const $eq = (operators, context, valueA, valueB) => {

  // console.log('$eq', value, target)

  return isEqual(valueA, valueB)
}

export const $ne = (operators, context, valueA, valueB) => {
  return !isEqual(valueA, valueB)
}



// export const $in = (options, array, value) => {
//   const value = evaluate(options, value)

//   return evaluate(options, array).some(arrayItem => arrayItem === value)
// }

// export const $nin = (array, value) => {
//   return !array.some(option => value === option)
// }

// export const $gt = (threshold, value) => {
//   validateNumber(threshold)
//   return isValidNumber(value) && value > threshold
// }

// export const $gte = (threshold, value) => {
//   validateNumber(threshold)
//   return isValidNumber(value) && value >= threshold
// }

// export const $lt = (threshold, value) => {
//   validateNumber(threshold)
//   return isValidNumber(value) && value < threshold
// }

// export const $lte = (threshold, value) => {
//   validateNumber(threshold)
//   return isValidNumber(value) && value <= threshold
// }