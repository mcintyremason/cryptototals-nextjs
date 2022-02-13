import React, { createContext } from 'react'
import { ErrorContextProvider } from '../../contexts/ErrorContextProvider'
import { LoadingContextProvider } from '../../contexts/LoadingContextProvider'

type AppContainerProps = {
  children: React.ReactElement[] | React.ReactElement
}

export type AppContextType = {}

export const AppContext = createContext<AppContextType>({})

const AppContainer: React.FC<AppContainerProps> = (props) => {
  const appContextValue = {}

  return (
    <AppContext.Provider value={appContextValue}>
      <LoadingContextProvider>
        <ErrorContextProvider>{props.children}</ErrorContextProvider>
      </LoadingContextProvider>
    </AppContext.Provider>
  )
}

export default AppContainer
