import {
  get,
  isPlainObject,
  curry
} from 'lodash'

export const evaluate = (operators, value, expression) => {
  if (!Array.isArray(expression)) {
    // not an expression
    return expression
  }

  const [operatorId, ...args] = expression
  const operatorFn = operators[operatorId]

  if (typeof operatorFn !== 'function') {
    // not an expression
    return expression
  }


  const res = operatorFn(
    operators,
    value,
    ...args.map(arg => evaluate(operators, value, arg))
  )
  // console.log('evaluate expression', operatorId, args.map(arg => evaluate(operators, value, arg)), res)

  return res
}

export const expression = curry(evaluate)
