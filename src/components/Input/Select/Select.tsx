import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { SelectStyled } from './Select.styled'
import Label from '../Label/Label'
export interface InputSelectOption {
  label: string
  value: string | number
}

interface InputSelectProps {
  label?: string
  id: string
  value: string
  onChange: (value: string) => void
  options: InputSelectOption[]
}

interface EventTarget {
  target: { value: string }
}
const InputSelect = (props: InputSelectProps): React.ReactNode => {
  const { label, id, value, onChange, options } = props
  const handleChange = (event: EventTarget): void => {
    onChange(event.target.value)
  }
  return (
    <SelectStyled>
        <Label id={`input-select-label-${id}`} >{label ?? ' '}</Label>
        <FormControl variant="outlined">

            <Select
            labelId={`input-select-label-${id}`}
            id={`input-select-${id}`}
            value={value}
            onChange={handleChange}

            >
            {options.map((option, index) => {
              const { value, label } = option
              return (<MenuItem value={value} key={`${id}-${value}-${index}`}>{label}</MenuItem>)
            })}
            </Select>
        </FormControl>
      </SelectStyled>
  )
}

export default InputSelect
