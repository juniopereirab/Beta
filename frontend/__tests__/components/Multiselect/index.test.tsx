import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Multiselect from '@/components/Multiselect'
 
describe('Multiselect', () => {
  it('renders correctly', () => {
    render(<Multiselect id='test' label='Teste' name='test' onChange={() => {}} options={[{ value: '1', label: 'Test' }]} value={[]} />)
 
    const select = screen.getByRole('combobox')

    expect(select).toBeInTheDocument()
  })
})