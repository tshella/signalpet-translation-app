import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from './LanguageSelector';

test('renders language selector and changes language', () => {
  const mockChange = vi.fn(); 
  render(<LanguageSelector currentLang="en" onChange={mockChange} />);
  const select = screen.getByDisplayValue(/English/i);
  fireEvent.change(select, { target: { value: 'de' } });
  expect(mockChange).toHaveBeenCalledWith('de');
});
