import { curry, isPlainObject } from 'lodash'

export const isExpression = (options, value) => {
  return Array.isArray(value) && typeof options.interpreters[value[0]] === 'function'
}

export const evaluate = (options, expression) => {
  if (!Array.isArray(expression)) {
    return expression
  }

  const [expressionId, ...expressionArgs] = expression
  const { interpreters, context, $ROOT } = options

  // console.log('evaluate', expressionId, expressionArgs)

  return typeof interpreters[expressionId] === 'function' ?
    interpreters[expressionId]({
      interpreters,
      $ROOT: $ROOT !== undefined ? $ROOT : context,
      context
    }, ...expressionArgs) :
    expression
}

export const expression = curry((interpreters, exp, context) => {
  return evaluate({
    interpreters,
    context,
  }, exp)
})
