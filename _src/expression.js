import {
  get,
  isPlainObject,
  curry
} from 'lodash'

export const _ev = (options, expression, expressionParams) => {
  if (!Array.isArray(expression)) {
    // not an expression
    return expression
  }

  const { operators } = options
  const [operatorId, params = {}] = expression

  const operatorFn = operators[operatorId]

  if (typeof operatorFn !== 'function') {
    // not an expression
    return expression
  }

  return operatorFn(options, {
    ...params,
    ...expressionParams
  })
}

export const evaluate = (options, expression, ...expressionArgs) => {
  if (!Array.isArray(expression)) {
    // not an expression
    return expression
  }

  const { operators } = options
  const [operatorId, ...args] = expression

  const operatorFn = operators[operatorId]

  if (typeof operatorFn !== 'function') {
    // not an expression
    return expression
  }

  return operatorFn(options, ...args, ...expressionArgs)
}

export const expression = curry(evaluate)
