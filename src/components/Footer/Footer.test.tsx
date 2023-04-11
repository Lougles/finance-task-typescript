import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
    it('renders the correct copyright text', () => {
        const year = new Date().getFullYear();
        render(<Footer />);
        const footerElement = screen.getByText(`Copyright © Vova Chelidze ${year}`);
        expect(footerElement).toBeInTheDocument();
    });
});