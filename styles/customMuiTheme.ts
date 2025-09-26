import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// This file IS for globally applied styling across a specific Material-UI component.
// Instructions on overriding Material-UI component styling, https://material-ui.com/customization/globals/#css.
let customTheme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '7px 7px',
        },
      },
    },
  },
})

customTheme = responsiveFontSizes(customTheme)
export default customTheme
