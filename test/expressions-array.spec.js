import {
  expression,
  COMPARISON_EXPRESSIONS,
  ARRAY_EXPRESSIONS,
  $VALUE,
} from '../src'

describe('array expressions', () => {

  const evaluate = expression({
    ...COMPARISON_EXPRESSIONS,
    ...ARRAY_EXPRESSIONS,
  })

  test('$arrayLength', () => {
    const array = [1, 2, 3]
    const $arrayLength = ['$arrayLength', $VALUE]

    expect(evaluate($arrayLength, array)).toEqual(3)
    expect(evaluate(['$eq', $arrayLength, 3], array)).toEqual(true)
  })
})
