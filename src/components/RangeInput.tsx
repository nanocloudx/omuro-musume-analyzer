import React from 'react'
import styled from 'styled-components'

type Props = {
  value: number
  onChange: (num: number) => void
  left: string
  right: string
}

const Component: React.FC<Props> = props => {
  return (
    <Slider>
      <Label>{props.left}</Label>
      <Input
        type="range"
        min={-5}
        max={5}
        step={1}
        value={props.value}
        onChange={e => props.onChange(Number(e.target.value))}
      />
      <Label>{props.right}</Label>
    </Slider>
  )
}

const Slider = styled.div`
  display: flex;
  align-items: center;
`
const Label = styled.p`
  width: 200px;
  margin: 10px 0;
  text-align: center;
`
const Input = styled.input`
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
  outline: none;
  height: 14px;
  width: 100%;
  background: #8acdff;
  border-radius: 10px;
  border: solid 3px #dff1ff;
}
`

export default Component
