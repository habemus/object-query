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

export const $objectTransform = (options, map, value) => {

}

export const $get = (options, path, value) => {
  return get(value, path)
}

export const $literal = (options, value) => {
  return value
}

export const $objectMatches = (options, query, value) => {

  const pathConditions = Object.keys(query).map(path => {
    const pathCriteria = isPlainObject(query[path]) ? query[path] : { $eq: query[path] }
    const pathExpressions = Object.keys(pathCriteria).map(operatorId => [
      operatorId,
      evaluate(options, ['$get', path, value]),
      evaluate(options, pathCriteria[operatorId], value),
    ])

    return pathExpressions.length === 1 ? pathExpressions[0] : ['$and', pathExpressions]
  })

  console.log(JSON.stringify(pathConditions, null, '  '))

  const expression = ['$and', pathConditions]

  return evaluate(options, expression, value)

  // return Object.keys(query).reduc(path =>)


  // return Object.keys(query).every(path => {
  //   const pathCriteria = isPlainObject(query[path]) ? query[path] : { $eq: query[path] }
  //   const pathExpressions = Object.keys(pathCriteria).map(operatorId => [
  //     operatorId,
  //     ['$get', path],
  //     pathCriteria[operatorId]
  //   ])

  //   console.log('pathExpressions', pathExpressions)

  //   return evaluate(options, ['$and', pathExpressions], value)
  // })
}
