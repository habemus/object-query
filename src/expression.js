import { curry } from 'lodash'

import {
  CORE_EXPRESSIONS
} from './expressions/core'

export const evaluate = (interpreters, expression, context) => {
  if (!Array.isArray(expression)) {
    return expression
  }

  const [expressionId, ...args] = expression

  if (CORE_EXPRESSIONS[expressionId]) {
    return CORE_EXPRESSIONS[expressionId]({ interpreters, context }, ...args)
  } else {

    // console.log('evaluate', expressionId, ...args, context)

    return typeof interpreters[expressionId] !== 'function' ?
      expression :
      interpreters[expressionId](
        {
          interpreters,
          context
        },
        ...args.map(arg => evaluate(interpreters, arg, context))
      )
  }
}

export const expression = curry(evaluate)
