import {
  expression,
  $VALUE,
  VALUE_EXPRESSIONS,
  LOGICAL_EXPRESSIONS,
  COMPARISON_EXPRESSIONS,
  MATH_EXPRESSIONS,
  ARRAY_EXPRESSIONS,
} from '../src'

describe('array expressions', () => {

  const evaluate = expression({
    ...VALUE_EXPRESSIONS,
    ...LOGICAL_EXPRESSIONS,
    ...COMPARISON_EXPRESSIONS,
    ...MATH_EXPRESSIONS,
    ...ARRAY_EXPRESSIONS,
  })

  test('$arrayLength', () => {
    const array = [1, 2, 3]
    const $arrayLength = ['$arrayLength', $VALUE]

    expect(evaluate($arrayLength, array)).toEqual(3)
    expect(evaluate(['$eq', $arrayLength, 3], array)).toEqual(true)
  })

  test('$arrayMap', () => {
    const array = [1, 2, 3]
    const $arraySum10 = [
      '$arrayMap',
      ['$path', '$ROOT'],
      ['$mathSum', $VALUE, 10]
    ]

    expect(evaluate($arraySum10, array))
      .toEqual([11, 12, 13])
  })

  test('nested $arrayMap -> $arrayFilter', () => {

    const numbers_1 = [2, 4, 6, 8]
    const numbers_2 = [1, 3, 5, 7, 9]
    const numbers_3 = [19, 33, 21, 22, 982, 93, 999, 999]

    const divisibleBy3Count = evaluate([
      '$arrayMap',
      ['$path', 'lists_of_numbers'],
      ['$arrayLength',
        ['$arrayFilter',
          $VALUE,
          ['$eq',
            ['$mathMod',
              $VALUE,
              ['$path', '$ROOT.divisor']
            ],
            0
          ]
        ]
      ]
    ], {
      divisor: 3,
      lists_of_numbers: [numbers_1, numbers_2, numbers_3],
    })

    expect(divisibleBy3Count).toEqual([1, 2, 5])
  })

  test('$arrayFilter', () => {
    const people = [
      { name: 'João', age: 24, parentAge: 44 },
      { name: 'Diana', age: 25, parentAge: 50, },
      { name: 'Ricardo', age: 55, parentAge: 90 },
      { name: 'Rafael', age: 40, parentAge: 70 },
      { name: 'Ana', age: 30, parentAge: 45 },
    ]

    console.log(evaluate([
      '$arrayFilter',
      ['$path', 'people'],
      ['$or',
        ['$gte',
          ['$path', 'parentAge'],
          ['$mathSum', ['$path', 'age'], 20]
        ],
        ['$eq',
          ['$path', '$ROOT.specificAge'],
          ['$path', 'age']
        ]
      ]
    ], {
      specificAge: 55,
      people
    }))

  })
})
