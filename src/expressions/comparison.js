import {
  isEqual,
} from 'lodash'

import {
  isValidNumber,
  validateNumber,
  validateArray
} from '../util'

export const $EQ = '$eq'
const $eq = (options, valueA, valueB) => {
  return isEqual(valueA, valueB)
}

export const $NE = '$ne'
const $ne = (options, valueA, valueB) => {
  return !isEqual(valueA, valueB)
}

export const $IN = '$in'
const $in = (options, array, value) => {
  validateArray(array)
  return array.some(arrayItem => arrayItem === value)
}

export const $NIN = '$nin'
const $nin = (options, array, value) => {
  validateArray(array)
  return !array.some(arrayItem => arrayItem === value)
}

export const $GT = '$gt'
const $gt = (options, threshold, value) => {
  validateNumber(threshold)
  return isValidNumber(value) && value > threshold
}

export const $GTE = '$gte'
const $gte = (options, threshold, value) => {
  validateNumber(threshold)
  return isValidNumber(value) && value >= threshold
}

export const $LT = '$lt'
const $lt = (options, threshold, value) => {
  validateNumber(threshold)
  return isValidNumber(value) && value < threshold
}

export const $LTE = '$lte'
const $lte = (options, threshold, value) => {
  validateNumber(threshold)
  return isValidNumber(value) && value <= threshold
}

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
