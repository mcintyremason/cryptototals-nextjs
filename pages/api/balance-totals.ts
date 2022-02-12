import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'
import { BalanceTotalsResponse } from './types/Cryptocompare'
const cc = require('cryptocompare')

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const balanceTotalsQuery = _req.query
  const cryptoNamesArr = []
  const cryptoBalances: BalanceTotalsResponse = {
    currencies: {},
    total: 0,
  }

  try {
    for (const key of Object.keys(balanceTotalsQuery)) {
      cryptoNamesArr.push(key)
      cryptoBalances.currencies = {
        ...cryptoBalances.currencies,
        ...{ [key]: { symbol: key, holdings: 0 } },
      }
      cryptoBalances.currencies[key].holdings = parseFloat(balanceTotalsQuery[key] as string) || 0
    }

    const prices = await cc.priceMulti(cryptoNamesArr, 'USD')

    for (const key of Object.keys(prices)) {
      cryptoBalances.currencies[key].price = prices[key].USD
      cryptoBalances.currencies[key].total =
        (cryptoBalances.currencies[key].holdings as number) * prices[key].USD
      cryptoBalances.total += cryptoBalances.currencies[key].total as number
    }
  } catch (e) {
    console.error(e)
    return res.status(500).send(e)
  }
  return res.status(StatusCodes.OK).json({ ...cryptoBalances })
}

export default handler
