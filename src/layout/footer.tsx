import { Container } from '@/components/container';
import { Link } from '@/i18n/navigation';
import { FooterLanguage } from './footer-language';
import { Logo } from './logo';

const links = [
  {
    url: '/publishers',
    label: 'Publishers',
  },
  {
    url: '/developers',
    label: 'Developers',
  },
  {
    url: '/genres',
    label: 'Genres',
  },
];

export const Footer = () => {
  return (
    <div className="min-h-30 bg-[#12171E] py-6">
      <Container
        maxWidth="lg"
        className="flex items-start"
      >
        <div className="flex flex-col">
          <Link
            href="/"
            className="mb-5"
          >
            <div className="flex">
              <Logo className="w-20 md:w-40" />
            </div>
          </Link>
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex-1" />
        <FooterLanguage />
      </Container>
    </div>
  );
};
