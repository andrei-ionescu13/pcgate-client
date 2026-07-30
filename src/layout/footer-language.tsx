'use client';

import { Button } from '@/components/button';
import { LanguageCurrencyDialog } from '@/components/language-currency-dialog';
import { useState } from 'react';

export const FooterLanguage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {dialogOpen && (
        <LanguageCurrencyDialog
          open
          onClose={() => {
            setDialogOpen(false);
          }}
        />
      )}
      <Button
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Language/Currency
      </Button>
    </>
  );
};
