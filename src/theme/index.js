import _ from 'lodash'
import { colors, createMuiTheme } from '@material-ui/core'
import { THEMES } from '../constants'
import { typography } from './typography'



const baseTheme = {
  direction: 'ltr',
  name: THEMES.LIGHT,
  typography:{...typography,
  },
  overrides: {
    MuiInputBase: {
      input: {
        '&::placeholder': {
          opacity: 1,
          color: colors.blueGrey[600],
        },
      },
    },
  },
  palette: {
    type: 'light',
    action: {
      active: colors.blueGrey[600],
    },
    background: {
      default: '#d2c8c8',
      dark: '#f7f7f0',
      paper: colors.common.white,
    },
    primary: {
      main: '#57CC99',
    },

    secondary: {
      main: '#57CC99',
    },

    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
}

export const createTheme = () => {
  let theme = createMuiTheme(_.merge({}, baseTheme))

  return theme
}
