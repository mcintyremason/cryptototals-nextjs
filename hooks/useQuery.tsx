import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { isEmpty } from '../utils/baseUtils'

// custom hook to expose the query parameters, and search type
export const useQuery = () => {
  const router = useRouter()
  const query = router.query

  const [parsed, setParsed] = useState<any>(query)

  useEffect(() => {
    const parsed = query
    // parsed is empty when on the balances view
    let newParsed = {}
    if (!isEmpty(parsed)) {
      newParsed = parsed
    }
    setParsed(newParsed)
    // only reset state if there is a non empty value to use, otherwise
    // keep the state for the balances view
  }, [query, router.pathname])

  return { parsed }
}
