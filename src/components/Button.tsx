import React from 'react'
import styled from 'styled-components'

type Props = {
  disabled: boolean
  label: string
  onClick: () => void
}

const Component: React.FC<Props> = props => {
  return (
    <Button onClick={props.onClick} disabled={props.disabled}>{props.label}</Button>
  )
}

const Button = styled.button`
  min-width: 200px;
  padding: 10px 20px;
  background-color: #dff1ff;
  border: solid 3px #8acdff;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #eee;
    border-color: #fafafa;
    cursor: default;
  }
`

export default Component
