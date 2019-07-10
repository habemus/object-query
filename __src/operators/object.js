import {
  isPlainObject,
  get
} from 'lodash'

import { evaluate } from '../expression'

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

export const $objectTransform = (operators, map, value) => {

}

export const $get = (operators, context, path) => {
  return get(context, path)
}

export const $literal = (operators, context, value) => {
  return value
}

export const $slice = (operators, context, array, start, end) => {
  return array.slice(start, end)
}

export const $objectMatches = (operators, context, query) => {

  const pathConditions = Object.keys(query).map(path => {
    const pathCriteria = isPlainObject(query[path]) ? query[path] : { $eq: query[path] }
    const pathExpressions = Object.keys(pathCriteria).map(operatorId => [
      operatorId,
      ['$get', path],
      pathCriteria[operatorId]
    ])

    return pathExpressions.length === 1 ? pathExpressions[0] : ['$and', ...pathExpressions]
  })

  return evaluate(operators, context, ['$and', ...pathConditions])

  // return Object.keys(query).reduc(path =>)


  // return Object.keys(query).every(path => {
  //   const pathCriteria = isPlainObject(query[path]) ? query[path] : { $eq: query[path] }
  //   const pathExpressions = Object.keys(pathCriteria).map(operatorId => [
  //     operatorId,
  //     ['$get', path],
  //     pathCriteria[operatorId]
  //   ])

  //   console.log('pathExpressions', pathExpressions)

  //   return evaluate(operators, ['$and', pathExpressions], value)
  // })
}
