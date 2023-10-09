import { makeStyles } from '@mui/styles'

const GlobalCSS = makeStyles({
  '@global': {
    'html, body': {
      margin: 0,
      padding: 0,
      background: '#f5f5f5'
    },
    h1: {
      textTransform: 'uppercase',
      fontFamily: 'Ubuntu'
    }
  }
})

export default GlobalCSS
