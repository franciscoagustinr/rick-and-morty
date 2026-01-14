import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/pagination';
import '@testing-library/jest-dom';

describe('Pagination', () => {
    it('renders correctly', () => {
        render(<Pagination currentPage={1} totalPages={10} onPageChange={() => { }} />);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getAllByText('➜').length).toBeGreaterThan(0);
    });

    it('disabled previous button on first page', () => {
        render(<Pagination currentPage={1} totalPages={10} onPageChange={() => { }} />);
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toBeDisabled();
    });

    it('disabled next button on last page', () => {
        render(<Pagination currentPage={10} totalPages={10} onPageChange={() => { }} />);
        const buttons = screen.getAllByRole('button');
        expect(buttons[buttons.length - 1]).toBeDisabled();
    });

    it('call function onPageChange when clicking a page number', () => {
        const handlePageChange = jest.fn();
        render(<Pagination currentPage={1} totalPages={10} onPageChange={handlePageChange} />);
        fireEvent.click(screen.getByText('2'));
        expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it('call function onPageChange when clicking next button', () => {
        const handlePageChange = jest.fn();
        render(<Pagination currentPage={1} totalPages={10} onPageChange={handlePageChange} />);
        const buttons = screen.getAllByRole('button');
        const nextButton = buttons[buttons.length - 1];
        fireEvent.click(nextButton);
        expect(handlePageChange).toHaveBeenCalledWith(2);
    });

    it('call function onPageChange when clicking previous button', () => {
        const handlePageChange = jest.fn();
        render(<Pagination currentPage={2} totalPages={10} onPageChange={handlePageChange} />);
        const buttons = screen.getAllByRole('button');
        const prevButton = buttons[0];
        fireEvent.click(prevButton);
        expect(handlePageChange).toHaveBeenCalledWith(1);
    });
});
