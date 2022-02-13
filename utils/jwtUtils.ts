import { JwtPayload } from 'jsonwebtoken'
import { isEmpty } from '../utils/baseUtils'

// Validation logic should be tighter in real app
export const isValidAddress = (unvalidatedDecodedJWT: string | JwtPayload) =>
  !isEmpty(unvalidatedDecodedJWT)
