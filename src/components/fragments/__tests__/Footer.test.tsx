import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/fragments/Footer';

describe('Footer', () => {
    it('renders the footer with email link', () => {
        render(<Footer />);

        const emailLink = screen.getByText('bagusrosfandy@gmail.com');
        expect(emailLink).toBeInTheDocument();
        expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:bagusrosfandy@gmail.com');
    });

    it('renders social links', () => {
        render(<Footer />);

        const socialLinks = ['Github', 'Codepen', 'Bluesky', 'Mastodon', 'Instagram', 'LinkedIn', 'RSS'];
        socialLinks.forEach(link => {
            expect(screen.getByText(link)).toBeInTheDocument();
        });
    });

    it('renders copyright with current year', () => {
        render(<Footer />);

        const currentYear = new Date().getFullYear();
        expect(screen.getByText(`© ${currentYear} Rosfandy`)).toBeInTheDocument();
    });

    it('renders the "Have a project in mind?" section', () => {
        render(<Footer />);

        expect(screen.getByText('Have a project in mind?')).toBeInTheDocument();
    });
});