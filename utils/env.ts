// const env = (window as any).env

export const getCryptoTotalsApiEndpoint = (): string => {
  // built at runtime
  // return env?.REACT_APP_API ? env.REACT_APP_API : 'https://cryptototals.com/api'
  return '/api'
}
