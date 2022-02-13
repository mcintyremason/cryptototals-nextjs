// const env = (window as any).env

export const getCryptogetApiEndpoint = (): string => {
  // built at runtime
  // return env?.REACT_APP_API ? env.REACT_APP_API : 'https://cryptoget.dev/api'
  return 'http://localhost:3000/api'
}
