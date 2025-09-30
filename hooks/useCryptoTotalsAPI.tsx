import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useContext } from 'react'
import { ErrorMessageContext, SetErrorMessageContext } from '../contexts/ErrorContext'
import { LoadingContext, SetLoadingContext } from '../contexts/LoadingContext'
import { BalanceTotalsResponse, Cryptos, GetBalanceQueryParams } from '../models/CryptoTotals'
import { getCryptoTotalsApiEndpoint } from '../utils/env'

export interface ResponseStructure<T> {
  isLoaded: boolean
  data?: T | null
  hasError: boolean
  errorMessage: string
  status: number
  url?: string
}

export const useCryptoTotalsApi = () => {
  const isLoading = useContext(LoadingContext)
  const setIsLoading = useContext(SetLoadingContext)
  const errorMessage = useContext(ErrorMessageContext)
  const setErrorMessage = useContext(SetErrorMessageContext)

  const makeApiCall: <T>(
    request: AxiosRequestConfig,
    timeout?: number,
  ) => Promise<ResponseStructure<T>> = async (request: AxiosRequestConfig) => {
    let response = {
      hasError: false,
      data: null,
      errorMessage: '',
      isLoaded: false,
      status: null,
      url: '',
    }

    try {
      setIsLoading(true)
      const axiosResponse: AxiosResponse = await axios(request).catch((error: AxiosError) => {
        console.error(error.message, error.response)
        // Setting the error manually as external response obj does not have it
        response.errorMessage = `${error.message}. Please contact Support for help.`
        return error.response
      })

      response.url = axiosResponse?.request.responseURL
      response.data = axiosResponse?.data
      response.status = axiosResponse?.status
      response.hasError = axiosResponse?.status > 202
      response.isLoaded = true

      if (response.hasError) {
        setErrorMessage(response.errorMessage)
      }
    } catch (e) {
      console.error(e)
      setErrorMessage(response.errorMessage)
    } finally {
      setIsLoading(false)
      return response
    }
  }

  const getBalanceFor = async (cryptoHoldings: GetBalanceQueryParams) => {
    const baseUrl = getCryptoTotalsApiEndpoint()

    const response = await makeApiCall<BalanceTotalsResponse>({
      url: `${baseUrl}/balance-totals`,
      params: cryptoHoldings,
      method: 'get',
    })

    return response.data
  }

  const getCryptoList = async () => {
    const baseUrl = getCryptoTotalsApiEndpoint()

    const response = await makeApiCall<Cryptos>({
      url: `${baseUrl}/get-crypto-list`,
      method: 'get',
    })

    return response.data
  }

  return { getBalanceFor, getCryptoList, isLoading, errorMessage }
}
