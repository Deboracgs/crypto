import React from 'react'
import { AppBar, Tab, Tabs } from '@mui/material'
import { type Tab as TabInterface } from '../../@types'
import { useCommon } from '../../context'
import { HeaderStyled } from './Header.styled'

const Header = (): React.ReactNode => {
  const { currentTab, setCurrentTab, tabs } = useCommon()

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    event.preventDefault()
    setCurrentTab(newValue)
  }

  return (
    <HeaderStyled>
      <AppBar
        position="static"
        color="default"
        elevation={0}
      >
          <Tabs value={currentTab} onChange={handleChange} centered>
            {tabs.map((tab: TabInterface, index: number) => {
              const { id, label } = tab
              return (<Tab label={label} key={id} id={`tab-${index}`} aria-controls={`tabpanel-${index}`} color='#1E5891' />)
            })}
          </Tabs>
      </AppBar>
    </HeaderStyled>
  )
}

export default Header
