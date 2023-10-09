import * as React from 'react'
import { LabelStyled } from './Label.styled'

interface LabelProps {
  children?: React.ReactNode
  id: string

}

const Label = ({ id, children }: LabelProps): React.ReactNode => {
  return (
       <LabelStyled id={`input-select-label-${id}`} >{children}</LabelStyled>
  )
}

export default Label
