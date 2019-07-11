import {
  get,
  isPlainObject,
  set
} from 'lodash'

import {
  evaluate,
  isExpression,
} from '../expression'

const $path = (options, pathExp) => {
  const { context, $ROOT } = options

  const path = evaluate(options, pathExp)

  return path === null ?
    context :
    path.startsWith('$ROOT') ?
      get({ $ROOT }, path) :
      get(context, path)
}

const $literal = (options, value) => value

const $transform = (options, transform) => {
  if (isExpression(options, transform)) {

    return evaluate(options, transform)
  } else if (Array.isArray(transform)) {

    return transform.map(itemExp => evaluate(options, itemExp))
  } else if (isPlainObject(transform)) {

    return Object.keys(transform).reduce((acc, targetPath) => {
      const targetValueExp = isExpression(options, transform[targetPath]) ?
        transform[targetPath] :
        ['$path', transform[targetPath]]

      set(acc, targetPath, evaluate(options, targetValueExp))

      return acc
    }, {})
  } else {
    throw new Error(`Invalid transform ${transform}`)
  }
}

export const $VALUE = ['$path', null]

export const VALUE_EXPRESSIONS = {
  $path,
  $literal,
  $transform
}
