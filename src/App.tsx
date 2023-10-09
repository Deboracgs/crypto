import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import GlobalStyles from '@mui/material/GlobalStyles'
import GlobalCSS from './GlobalStyles'
import Header from './components/Header/Header'
import { CommonContextProvider } from './context'
import Container from './components/Container/Container'

const App = (): React.ReactNode => {
  const defaultTheme = createTheme()
  return (
    <CommonContextProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={GlobalCSS} />
        <Header />
        <Container />
      </ThemeProvider>
    </CommonContextProvider>
  )
}

export default App
