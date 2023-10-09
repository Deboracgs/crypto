import * as React from 'react'
import { TextField } from '@mui/material'
import { TextStyled } from './Text.styled'
import Label from '../Label/Label'

interface InputTextProps {
  label?: string
  id: string
  value: string
  onChange: (value: string) => void
  type: 'number' | 'text'
}

interface EventTarget {
  target: { value: string }
}
const InputText = (props: InputTextProps): React.ReactNode => {
  const { label, id, value, onChange, type } = props
  const handleChange = (event: EventTarget): void => {
    onChange(event.target.value)
  }
  return (
    <TextStyled>
        {label !== undefined ? <Label id={`input-select-label-${id}`} >{label}</Label> : null}

        <TextField id="outlined-basic" variant="outlined" onChange={handleChange} value={value} type={type} />
      </TextStyled>
  )
}

export default InputText
