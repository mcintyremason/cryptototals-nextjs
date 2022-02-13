import { NextRouter } from 'next/router'
import { stringify } from 'query-string'
import { encodeQueryParams, StringParam } from 'use-query-params'
import { BalancesRequest, GetBalanceQueryParams } from '../models/Cryptoget'

type HistoryState = {
  previousRequest?: BalancesRequest
}

const clean = (obj: any) => {
  const cleanObj = {}
  const propNames = Object.keys(obj)
  for (let i = 0, l = propNames.length; i < l; i++) {
    const propName = propNames[i]
    if (obj[propName] !== null && obj[propName] !== undefined && obj[propName] !== '') {
      Object.assign(cleanObj, { [propName]: obj[propName] })
    }
  }
  return cleanObj
}

export const encodeCryptoQueryParams = (cryptoParams: GetBalanceQueryParams) =>
  encodeQueryParams(
    Object.keys(cryptoParams)
      .map((key) => ({
        [key]: StringParam,
      }))
      .reduce((acc, curr) => {
        return { ...acc, ...curr }
      }),
    clean(cryptoParams),
  )

export const stringifyCryptoQueryParams = (cryptoParams: any) =>
  stringify(encodeCryptoQueryParams(cryptoParams))

export const modifyHistory = (
  router: NextRouter,
  state: HistoryState,
  cryptoParams: any = {},
  replace = false,
  newPathName = '',
) => {
  const newPath = router.pathname
  const newHistory = {
    pathname: newPathName || newPath,
    search: stringifyCryptoQueryParams(cryptoParams),
    state: {
      ...state,
    },
  }

  const _state = replace ? router.replace(newHistory) : router.push(newHistory)

  return _state
}
