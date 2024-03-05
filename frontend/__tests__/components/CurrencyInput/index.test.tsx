import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import CurrencyInput from '@/components/CurrencyInput'
 
describe('CurrencyInput', () => {
  it('renders TextField', () => {
    render(<CurrencyInput id='test' label='Teste' name='test' onChange={() => {}} value={0}/>)
 
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('MuiInputBase-input')
  })

  it('run onChange', () => {
    const onChangeFunction = jest.fn()
    render(<CurrencyInput id='test' label='Teste' name='test' onChange={onChangeFunction} value={0}/>)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: '1' }})
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('MuiInputBase-input')
    expect(onChangeFunction).toHaveBeenCalled()
  })

  it('run onChange with letters', () => {
    const onChangeFunction = jest.fn()
    render(<CurrencyInput id='test' label='Teste' name='test' onChange={onChangeFunction} value={0}/>)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'AB' }})
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('MuiInputBase-input')
    expect(onChangeFunction).toHaveBeenCalled()
  })
})