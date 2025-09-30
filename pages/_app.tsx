import { ThemeProvider } from '@mui/material'
import { AppContainer } from '../containers/AppContainer'
import customTheme from '../styles/customMuiTheme'

const Application = ({ Component, pageProps }) => {
  return (
    <AppContainer>
      <ThemeProvider theme={customTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContainer>
  )
}

export default Application
