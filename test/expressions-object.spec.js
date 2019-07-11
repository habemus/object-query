import {
  expression,
  COMPARISON_EXPRESSIONS,
  LOGICAL_EXPRESSIONS,
  OBJECT_EXPRESSIONS,
  $VALUE,
} from '../src'

describe('object operators', () => {

  const evaluate = expression({
    ...COMPARISON_EXPRESSIONS,
    ...LOGICAL_EXPRESSIONS,
    ...OBJECT_EXPRESSIONS
  })

  const PERSON_1 = {
    name: 'João',
    familyName: 'Silva',
    age: 10,
    relatives: [
      {
        name: 'Joana',
        familyName: 'Silva',
        relationship: 'mother',
      },
      {
        name: 'Rafaela',
        familyName: 'Santos',
        relationship: 'father'
      },
      {
        name: 'Pedro',
        relationship: 'uncle'
      }
    ],
    address: {
      line_1: 'Rua Silva Sauro, 410',
      zipCode: '010101',
    }
  }

  describe('$objectMatch', () => {

    test('basic', () => {
      expect(evaluate([
        '$objectMatch',
        $VALUE,
        {
          name: 'João',
          'address.zipCode': '010101'
        }
      ], PERSON_1))
      .toEqual(true)

      expect(evaluate([
        '$objectMatch',
        $VALUE,
        {
          name: 'João',
          'address.zipCode': '999999'
        }
      ], PERSON_1))
      .toEqual(false)
    })

    test('$gt comparison', () => {
      expect(evaluate([
        '$objectMatch',
        $VALUE,
        {
          age: { $gt: 9 }
        }
      ], PERSON_1))
      .toEqual(true)
    })

    test('inner comparison', () => {
      const expression = [
        '$objectMatch',
        $VALUE,
        {
          name: 'João',
          familyName: ['$path', 'relatives.0.familyName']
        }
      ]

      expect(evaluate(expression, PERSON_1)).toEqual(true)
    })
  })

  describe('$transform', () => {
    test('basic', () => {
      const expression = [
        '$transform',
        {
          name: 'relatives.0.name',
          familyName: 'relatives.0.familyName',

          'children.0.name': 'name',
          'children.0.age': 'age'
        }
      ]

      console.log(evaluate(expression, PERSON_1))
    })

    test('nested', () => {
      const expression = [
        '$eq',
        [
          '$transform',
          {
            name: 'relatives.1.name',
            familyName: 'relatives.1.familyName',
          }
        ],
        {
          name: 'Rafaela',
          familyName: 'Santos'
        }
      ]

      expect(evaluate(expression, PERSON_1)).toEqual(true)
    })
  })
})
