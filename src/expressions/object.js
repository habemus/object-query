import {
  isPlainObject,
  set
} from 'lodash'

import { evaluate } from '../expression'

// export const $slice = (interpreters, context, array, start, end) => {
//   return array.slice(start, end)
// }

const $objectMatch = ({ context, interpreters }, object, query) => {
  const pathConditions = Object.keys(query).map(path => {
    const pathCriteria = isPlainObject(query[path]) ? query[path] : { $eq: query[path] }
    const pathExpressions = Object.keys(pathCriteria).map(operatorId => [
      operatorId,
      pathCriteria[operatorId],
      ['$path', path]
    ])

    return pathExpressions.length === 1 ? pathExpressions[0] : ['$and', ...pathExpressions]
  })

  // TODO study best behavior, currently evaluating against object
  return evaluate(interpreters, ['$and', ...pathConditions], object)
}

export const OBJECT_EXPRESSIONS = {
  $objectMatch,
}
