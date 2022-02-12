import { ReducedCryptoListData } from '../cryptoget/types/Cryptocompare'

export const getRandomInt = () => {
  return Math.floor(Math.random() * 1_000_000_000_000)
}

export const camelize = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
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
