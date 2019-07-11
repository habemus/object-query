import { evaluate } from '../expression'
import { evaluateArray } from '../expression-util'

const $arrayLength = (options, arrayExp) => {
  return evaluateArray(options, arrayExp).length
}

const getRootContext = context => {
  let currentContext

  while (context) {
    currentContext = context
    context = context.$ROOT
  }

  return currentContext
}

const $arrayFilter = (options, arrayExp, conditionExp) => {
  return evaluateArray(options, arrayExp).filter((item, index, array) => {
    return evaluate({
      ...options,
      context: item
    }, conditionExp)
  })
}

const $arrayMap = (options, arrayExp, mapExp) => {
  return evaluateArray(options, arrayExp).map((item, index, array) => evaluate({
    ...options,
    context: item
  }, mapExp))
}

const $ARRAY_REDUCE = (options, arrayExp, reducerExp, startExp) => {
  return evaluateArray(options, arrayExp).reduce((acc, item) => evaluate({
    ...options,
    context: item
  }), evaluate(options, startExp))
}

const $ARRAY_EVERY = (options, arrayExp, conditionExp) => {
  return evaluateArray(options, arrayExp).every(item => evaluate({
    ...options,
    context: item
  }, conditionExp))
}

const $ARRAY_SOME = (options, arrayExp, conditionExp) => {
  return evaluateArray(options, arrayExp).some(item => evaluate({
    ...options,
    context: item
  }, conditionExp))
}

// const $ARRAY_CONCAT = (options, ...arrays) => {

// }

// const $ARRAY_PUSH = (options, array, value) => {

// }

// const $ARRAY_POP = (options, array) => {

// }

// const $ARRAY_UNSHIFT = (options, array, value) => {

// }

// const $ARRAY_SHIFT = (options, array) => {

// }

// const $ARRAY_SLICE = (options, array, start, end) => {

// }

// const $ARRAY_SPLICE = (options, array, position, ...values) => {

// }

export const ARRAY_EXPRESSIONS = {
  $arrayLength,
  $arrayMap,
  $arrayFilter,
}

// export const $arrayElemAt = (options, array, index) => {
//   validateArray(array)
//   validateNumber(index)
//   return array[index]
// }
