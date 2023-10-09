import styled from '@emotion/styled'
import { Typography } from '@mui/material'

export const SpanStyled = styled.span({
  fontWeight: 'normal',
  textTransform: 'lowercase'
})

export const ItemListStyled = styled(Typography)((props: { isFirst: boolean }) => ({
  opacity: (props.isFirst) ? 1 : 0.7
}))
