import { styled } from '@mui/material/styles'
import styledEmotion from '@emotion/styled'
import { Paper } from '@mui/material'

export const PaperStyled = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 95,
  padding: theme.spacing(3),
  ...theme.typography.body2,
  textAlign: 'center'
}))

export const AStyled = styledEmotion.a`
  cursor: pointer;
  text-decoration: underline;

`
