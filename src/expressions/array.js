import {
  validateArray,
  validateNumber
} from '../util'

// export const $all = (options, requiredValues, values) => {
//   validateArray(requiredValues)
//   return Array.isArray(values) && requiredValues.every(required => values.indexOf(required) !== -1)
// }

export const $ARRAY_LENGTH = '$arrayLength'
const $arrayLength = (options, array) => {
  validateArray(array)
  return array.length
}

export const ARRAY_EXPRESSIONS = {
  $arrayLength
}

// export const $arrayElemAt = (options, array, index) => {
//   validateArray(array)
//   validateNumber(index)
//   return array[index]
// }
