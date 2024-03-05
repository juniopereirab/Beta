import { render } from '@testing-library/react'
import CurrencyInput from '@/components/CurrencyInput'
 
it('renders input correctly', () => {
  const { container } = render(<CurrencyInput id='test' label='Teste' name='test' onChange={() => {}} value={0}/>)
  expect(container).toMatchSnapshot()
})