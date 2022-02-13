import { ThemeProvider } from '@material-ui/core'
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
