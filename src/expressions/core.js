import { get } from 'lodash'

export const $PATH = '$path'
const $path = ({ context }, path) => {
  return path === null ? context : get(context, path)
}

export const $LITERAL = '$literal'
const $literal = (options, value) => value

export const CORE_EXPRESSIONS = {
  $path,
  $literal
}
