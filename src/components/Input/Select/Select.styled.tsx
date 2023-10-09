import styled from '@emotion/styled'
import { InputLabel } from '@mui/material'

export const SelectStyled = styled.div({
  display: 'flex',
  justifyItems: 'flex-end',
  flexDirection: 'column',
  maxWidth: 200,
  width: '100%'
})

export const LabelStyled = styled(InputLabel)({
  color: '#256EA6',
  fontWeight: 'bold'
})
