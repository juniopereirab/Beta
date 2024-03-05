import { render } from '@testing-library/react'
import Multiselect from '@/components/Multiselect'
 
it('renders multiselect unchanged', () => {
  const { container } = render(<Multiselect id='test' label='Teste' name='test' onChange={() => {}} options={[{ value: '1', label: 'Test' }]} value={[]} />)
  expect(container).toMatchSnapshot()
})