import React from 'react'
import { Container as ContainerMUI, Snackbar } from '@mui/material'
import { useCommon } from '../../context'

const Container = (): React.ReactNode => {
  const { currentTab, tabs, snackbar, setSnackbar } = useCommon()
  const tabContent = tabs[currentTab].component ?? null
  return (
    <ContainerMUI>
      {tabContent}
      {snackbar !== null && <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => { setSnackbar(null) }}
          message={snackbar.message}

      />}
    </ContainerMUI>
  )
}

export default Container
