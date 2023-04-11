import { render, screen } from '@testing-library/react';
import List from './List';

describe('List component', () => {
    test('renders a loading message while data is being fetched', () => {
        const { getByText } = render(<List />);
        expect(getByText('Loading...')).toBeInTheDocument();
    });

    test('renders an error message if there is an error while fetching data', () => {
        const { getByText } = render(<List />);
        expect(getByText('Error loading data')).toBeInTheDocument();
    });

    test('renders a list of items when data is fetched successfully', () => {
        const mockData = [
            {
                ticker: 'AAPL',
                exchange: 'NASDAQ',
                price: '132.64',
                change: '+1.42',
                change_percent: '1.08%',
                last_trade_time: '2022-04-09T16:00:00Z',
                dividend: '0.22',
                yield: '0.68%',
            },
            {
                ticker: 'GOOGL',
                exchange: 'NASDAQ',
                price: '2341.14',
                change: '-23.56',
                change_percent: '-0.99%',
                last_trade_time: '2022-04-09T16:00:00Z',
                dividend: 'N/A',
                yield: 'N/A',
            },
        ];

        render(<List />);

        // Assert that loading message disappears once data is loaded
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

        // Assert that list items are rendered
        expect(screen.getByText('AAPL')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('132.64 $')).toBeInTheDocument();
        expect(screen.getByText('1.08%')).toBeInTheDocument();
        expect(screen.getByText('4:00:00 PM')).toBeInTheDocument();

        expect(screen.getByText('GOOGL')).toBeInTheDocument();
        expect(screen.getByText('Alphabet')).toBeInTheDocument();
        expect(screen.getByText('2341.14 $')).toBeInTheDocument();
        expect(screen.getByText('-0.99%')).toBeInTheDocument();
        expect(screen.getByText('4:00:00 PM')).toBeInTheDocument();
    });
});
