import { render, screen } from '@testing-library/react';
import { Item } from './Item';

const mockData = {
    ticker: 'AAPL',
    exchange: 'NASDAQ',
    price: '125.90',
    change: '0.15',
    change_percent: '0.12',
    last_trade_time: '2023-04-10T10:00:00Z',
    dividend: '0.56',
    yield: '0.67',
};
describe('Item component', () => {
    it('should display the correct information for a stock item', () => {
        render(<Item data={mockData} />);
        const tickerElement = screen.getByText('AAPL');
        const companyElement = screen.getByText('Apple');
        const priceElement = screen.getByText('125.90 $');
        const changePercentElement = screen.getByText('↓ 0.12 %');
        const timeElement = screen.getByText('6:00:00 AM');

        expect(tickerElement).toBeInTheDocument();
        expect(companyElement).toBeInTheDocument();
        expect(priceElement).toBeInTheDocument();
        expect(changePercentElement).toBeInTheDocument();
        expect(timeElement).toBeInTheDocument();
    });
});
