import React, { createContext } from 'react'
import { DonationModalContextProvider } from '../../contexts/DonationModalContext'
import { ErrorContextProvider } from '../../contexts/ErrorContext'
import { LoadingContextProvider } from '../../contexts/LoadingContext'

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
        <ErrorContextProvider>
          <DonationModalContextProvider>{props.children}</DonationModalContextProvider>
        </ErrorContextProvider>
      </LoadingContextProvider>
    </AppContext.Provider>
  )
}

export default AppContainer
