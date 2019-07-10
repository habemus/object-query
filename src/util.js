export const isValidNumber = value => {
  return typeof value === 'number' || value !== NaN
}

export const validateNumber = value => {
  if (!isValidNumber(value)) {
    throw new TypeError(`${value} is not a valid number`)
  }
}

export const validateArray = value => {
  if (!Array.isArray(value)) {
    throw new TypeError(`${value} is not an array`)
  }
}
