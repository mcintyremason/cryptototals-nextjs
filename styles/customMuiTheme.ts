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
    MuiLink: {
      styleOverrides: {
        root: {
          // Apply styles to the base Link component
          textDecoration: 'none', // Example: remove underline by default
          '&:hover': {
            textDecoration: 'underline', // Example: add underline on hover
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#3f51b5',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#f50057',
    },
  },
})

customTheme = responsiveFontSizes(customTheme)
export default customTheme
