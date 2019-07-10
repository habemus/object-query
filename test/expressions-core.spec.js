import { expression, $VALUE } from '../src'

describe('core expressions', () => {

  const evaluate = expression({})

  const NUMBER = 123
  const STRING = 'String value'
  const BOOLEAN = true
  const ARRAY = [NUMBER, STRING, ['nested', 'array']]
  const OBJECT = {
    string: STRING,
    number: NUMBER,
    boolean: BOOLEAN,
    nested: {
      key: 'Nested value',
      array: ARRAY,
    },
  }

  describe('literals', () => {
    test('basic', () => {
      expect(evaluate(['some', 'array', 'of', 'values'], null))
        .toEqual(['some', 'array', 'of', 'values'])
    })

    test('$literal', () => {
      expect(evaluate(['$literal', ['$path', 'literal']], null))
        .toEqual(['$path', 'literal'])
      expect(evaluate(['$literal', ['$literal', 'literal']], null))
        .toEqual(['$literal', 'literal'])
    })
  })

  describe('$path', () => {

    test('root', () => {
      expect(evaluate(['$path', null], NUMBER)).toEqual(NUMBER)
      expect(evaluate(['$path', null], STRING)).toEqual(STRING)
      expect(evaluate(['$path', null], BOOLEAN)).toEqual(BOOLEAN)
      expect(evaluate(['$path', null], ARRAY)).toEqual(ARRAY)

      expect(evaluate($VALUE, 'Any value')).toEqual('Any value')
    })

    test('path', () => {
      expect(evaluate(['$path', 'string'], OBJECT)).toEqual('String value')
      expect(evaluate(['$path', 'nested.key'], OBJECT)).toEqual('Nested value')
      expect(evaluate(['$path', 'nested.array.0'], OBJECT)).toEqual(123)
    })
  })
})
