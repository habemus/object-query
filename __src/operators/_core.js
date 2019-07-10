import {
  get
} from 'lodash'

export const $get = (path, value) => {
  return get(value, path)
}

export const $switch = ({ cases, defaultCase }, value, options) => {
  const matchingCase = cases.find(c => evaluate(options, c[0], value))

  if (matchingCase) {
    return matchingCase[1]
  } else {
    const last = cases[cases.length - 1]

    // if (last)
  }

  // return cases.fin
}

