import * as COMPARISON_OPERATORS from './operators/comparison'
import * as LOGICAL_OPERATORS from './operators/logical'
import * as OBJECT_OPERATORS from './operators/object'

export * from './expression'

const ALL_OPERATORS = {
  ...COMPARISON_OPERATORS,
  ...LOGICAL_OPERATORS,
  ...OBJECT_OPERATORS,
}

export {
  COMPARISON_OPERATORS,
  LOGICAL_OPERATORS,
  OBJECT_OPERATORS,

  ALL_OPERATORS,
}
