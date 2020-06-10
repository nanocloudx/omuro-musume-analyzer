import React from 'react'
import styled from 'styled-components'

type Props = {
  value: string
  onChange: (str: string) => void
}

const Component: React.FC<Props> = props => {
  return (
    <Input value={props.value} onChange={e => props.onChange(e.target.value)} />
  )
}

const Input = styled.input`
  
`

export default Component
