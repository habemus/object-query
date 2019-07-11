import {
  expression,
  $VALUE,
  VALUE_EXPRESSIONS,
  MATH_EXPRESSIONS,
  ARRAY_EXPRESSIONS,
  COMPARISON_EXPRESSIONS,
} from '../src'

describe('math expressions', () => {

  const evaluate = expression({
    ...VALUE_EXPRESSIONS,
    ...MATH_EXPRESSIONS,
    ...ARRAY_EXPRESSIONS,
    ...COMPARISON_EXPRESSIONS
  })

  test('$MATH_SUM - basic', () => {
    const obj = {
      'pending': 23,
      'ready': 14,
      'removal': 6
    }

    expect(evaluate([
      '$MATH_SUM',
      ['$path', 'pending'],
      ['$path', 'ready'],
      ['$path', 'removal']
    ], obj))
    .toEqual(43)
  })

  test('$MATH_SUM - with $ARRAY_LENGTH', () => {
    expect(evaluate([
      '$MATH_SUM',
      ['$ARRAY_LENGTH', ['$path', 'pending']],
      ['$ARRAY_LENGTH', ['$path', 'ready']],
      ['$ARRAY_LENGTH', ['$path', 'removal']]
    ], {
      pending: ['a', 'b', 'c', 'd', 'e'],
      ready: ['f', 'g', 'h'],
      removal: ['i', 'j', 'k', 'l']
    }))
    .toEqual(12)
  })

  test('$MATH_SUM - $TRANSFORM', () => {
    const obj = {
      pending: ['a', 'b', 'c', 'd', 'e'],
      ready: ['f', 'g', 'h'],
      removal: ['i', 'j', 'k', 'l']
    }

    expect(evaluate([
      '$TRANSFORM',
      {
        total: [
          '$MATH_SUM',
          ['$ARRAY_LENGTH', ['$path', 'pending']],
          ['$ARRAY_LENGTH', ['$path', 'ready']],
          ['$ARRAY_LENGTH', ['$path', 'removal']],
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

  test.skip('$MATH_SUM - with objectMatch', () => {

    const obj1 = {
      pending: [1, 2, 3, 4, 5, 6, 7],
      ready: [1, 2, 3],
      removal: [1, 2, 3]
    }

    const $TRANSFORM_TOTAL = ['$TRANSFORM', {
      total: ['$MATH_SUM',
        ['$ARRAY_LENGTH', ['$path', 'pending']],
        ['$ARRAY_LENGTH', ['$path', 'ready']],
        ['$ARRAY_LENGTH', ['$path', 'removal']],
      ]
    }]

    const $TOTAL_GT_10 = [
      '$objectMatch',
      $TRANSFORM_TOTAL,
      {
        total: {
          $gt: 10
        }
      }
    ]

    expect(evaluate($TOTAL_GT_10, obj1))
      .toEqual(true)
  })
})
