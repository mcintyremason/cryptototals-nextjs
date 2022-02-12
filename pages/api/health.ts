import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const response = {
    status: 'OK',
  }
  res.status(StatusCodes.OK).send(response)
}

export default handler
