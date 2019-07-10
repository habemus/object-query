import {
  isPlainObject,
  set
} from 'lodash'

import { evaluate } from '../expression'

import { $AND } from './logical'
import { $EQ } from './comparison'
import { $PATH } from './core'

// const criteria = {
//   'path.to.number': {
//     $lte: 20,
//     $gte: 10
//   },
//   'path-to-string': 'Some string value'
// }

// const parsed = ['$and', [
//   ['$lte', ['$get', 'path.to.number'], 20],
//   ['$gte', ['$get', 'path.to.number'], 10],
//   ['$eq', ['$get', 'path-to-string'], 'Some string value']
// ]]

// export const $objectTransform = (interpreters, map, value) => {

// }

// export const $path = ({ context }, path) => {
//   return path === null ? context : get(context, path)
// }

// export const $literal = value => value

// export const $slice = (interpreters, context, array, start, end) => {
//   return array.slice(start, end)
// }

export const $OBJECT_MATCH = '$objectMatch'
const $objectMatch = ({ context, interpreters }, object, query) => {
  const pathConditions = Object.keys(query).map(path => {
    const pathCriteria = isPlainObject(query[path]) ? query[path] : { [$EQ]: query[path] }
    const pathExpressions = Object.keys(pathCriteria).map(operatorId => [
      operatorId,
      pathCriteria[operatorId],
      [$PATH, path]
    ])

    return pathExpressions.length === 1 ? pathExpressions[0] : [$AND, ...pathExpressions]
  })

  // TODO study best behavior, currently evaluating against object
  return evaluate(interpreters, [$AND, ...pathConditions], object)
}

export const $OBJECT_MAP = '$objectMap'
const $objectMap = ({ context, interpreters }, map) => {
  return Object.keys(map).reduce((acc, targetPath) => {

    const source = typeof map[targetPath] === 'string' ?
      [$PATH, map[targetPath]] :
      map[targetPath]

    set(
      acc,
      targetPath,
      Array.isArray(source) ?
        evaluate(interpreters, source, context) :
        source
    )
    return acc
  }, {})
}

export const OBJECT_EXPRESSIONS = {
  $objectMatch,
  $objectMap,
}
