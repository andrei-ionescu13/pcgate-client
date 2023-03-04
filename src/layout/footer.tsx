import { useState } from 'react';
import type { FC } from 'react';
import { Box, Button, Container } from '@mui/material';
import { Link } from '@/components/link';
import { Logo } from './logo';
import { LanguageCurrencyDialog } from '@/components/language-currency-dialog';
import { useRouter } from 'next/router';

export const Footer: FC = (props) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Box sx={{
        backgroundColor: '#12171E',
        py: 3,
        minHeight: 120
      }}
      >
        <Container
          maxWidth="lg"
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Link href="/">
            <Box sx={{ display: 'flex' }}>
              <Logo
                sx={{
                  height: {
                    md: 33,
                    xs: 16.5
                  },
                  width: {
                    md: 166,
                    xs: 83
                  }
                }}
              />
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={() => { setDialogOpen(true); }}
            color="white"
            variant="outlined"
          >
            Language/Currency
          </Button>
        </Container>
      </Box>
      {dialogOpen && (
        <LanguageCurrencyDialog
          open
          onClose={() => { setDialogOpen(false); }}
        />
      )}
    </>
  );
};
