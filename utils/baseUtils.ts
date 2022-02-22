import { ReducedCryptoListData } from '../models/Cryptoget'

export const isEmpty = (value: any): boolean => {
  if (typeof value === 'string') {
    value = value.trim()
  }

  return (
    value === null ||
    value === undefined ||
    value === false ||
    (Array.isArray(value) && value.length === 0) ||
    value === '' ||
    (value.constructor === Object && Object.keys(value).length === 0)
  )
}

export const stringToColor = (string: string) => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }

  return color
}

export const getRandomInt = () => {
  return Math.floor(Math.random() * 1_000_000_000_000)
}

export const camelize = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, index: number) => {
    if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase()
  })
}

export const sortObjectByKeys = (o: any) => {
  return Object.keys(o)
    .sort()
    .reduce((r: any, k) => ((r[k] = o[k]), r), {})
}

export const sortObjectByFullName = (obj: Array<ReducedCryptoListData>) => {
  return obj.sort((a: ReducedCryptoListData, b: ReducedCryptoListData) => {
    if (a.fullName.toLocaleLowerCase() < b.fullName.toLocaleLowerCase()) {
      return -1
    }
    if (a.fullName.toLocaleLowerCase() > b.fullName.toLocaleLowerCase()) {
      return 1
    }
    return 0
  })
}
