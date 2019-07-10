import {
  expression,
  OBJECT_EXPRESSIONS,
  ARRAY_EXPRESSIONS,
  MATH_EXPRESSIONS,
  LOGICAL_EXPRESSIONS,
  COMPARISON_EXPRESSIONS,
} from '../src'

describe('math expressions', () => {

  const evaluate = expression({
    ...OBJECT_EXPRESSIONS,
    ...ARRAY_EXPRESSIONS,
    ...MATH_EXPRESSIONS,
    ...LOGICAL_EXPRESSIONS,
    ...COMPARISON_EXPRESSIONS
  })

  test('$sum - basic', () => {
    expect(evaluate([
      '$sum',
      ['$path', 'pending'],
      ['$path', 'ready'],
      ['$path', 'removal']
    ], {
      'pending': 23,
      'ready': 14,
      'removal': 6
    }))
    .toEqual(43)
  })

  test('$sum - with $arrayLength', () => {
    expect(evaluate([
      '$sum',
      ['$arrayLength', ['$path', 'pending']],
      ['$arrayLength', ['$path', 'ready']],
      ['$arrayLength', ['$path', 'removal']]
    ], {
      pending: ['a', 'b', 'c', 'd', 'e'],
      ready: ['f', 'g', 'h'],
      removal: ['i', 'j', 'k', 'l']
    }))
    .toEqual(12)
  })

  test('$sum - with object map', () => {
    const obj = {
      pending: ['a', 'b', 'c', 'd', 'e'],
      ready: ['f', 'g', 'h'],
      removal: ['i', 'j', 'k', 'l']
    }

    expect(evaluate([
      '$objectMap',
      {
        total: [
          '$sum',
          ['$arrayLength', ['$path', 'pending']],
          ['$arrayLength', ['$path', 'ready']],
          ['$arrayLength', ['$path', 'removal']],
        ],
        pending: 'pending',
        ready: 'ready',
        removal: 'removal'
      }
    ], obj))
    .toEqual({
      total: 12,
      ...obj,
    })
  })

  test('$sum - with objectMatch', () => {

    const obj1 = {
      pending: [1, 2, 3, 4, 5, 6, 7],
      ready: [1, 2, 3],
      removal: [1, 2, 3]
    }

    const $mapTotal = ['$objectMap', {
      total: ['$sum',
        ['$arrayLength', ['$path', 'pending']],
        ['$arrayLength', ['$path', 'ready']],
        ['$arrayLength', ['$path', 'removal']],
      ]
    }]

    const $totalGt10 = [
      '$objectMatch',
      $mapTotal,
      {
        total: {
          $gt: 10
        }
      }
    ]

    expect(evaluate($totalGt10, obj1))
      .toEqual(true)
  })
})
