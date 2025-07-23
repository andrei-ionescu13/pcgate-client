import { Container } from '@/components/container';
import { LanguageCurrencyDialog } from '@/components/language-currency-dialog';
import { Link } from '@/i18n/navigation';
import { Button } from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';
import { Logo } from './logo';

export const Footer: FC = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <div className="min-h-[120px] bg-[#12171E] py-6">
        <Container
          maxWidth="lg"
          className="flex items-center"
        >
          <Link href="/">
            <div className="flex">
              <Logo className="w-20 md:w-40" />
            </div>
          </Link>
          <div className="flex-1" />
          <Button
            onClick={() => {
              setDialogOpen(true);
            }}
            color="white"
            variant="outlined"
          >
            Language/Currency
          </Button>
        </Container>
      </div>
      {dialogOpen && (
        <LanguageCurrencyDialog
          open
          onClose={() => {
            setDialogOpen(false);
          }}
        />
      )}
    </>
  );
};
