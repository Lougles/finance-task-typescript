import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
    it('renders the header with the correct text', () => {
        render(<Header />);
        const headerElement = screen.getByRole('banner');
        const headerTextElement = screen.getByRole('heading', { level: 1 });
        expect(headerElement).toBeInTheDocument();
        expect(headerTextElement).toHaveTextContent('Finance Task Typescript');
    });
});
