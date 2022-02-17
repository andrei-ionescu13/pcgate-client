import { useState } from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import { Logo } from '../components/logo';
import { LanguageCurrencyDialog } from '../components/language-currency-dialog';

export const Footer: FC = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Box sx={{
        backgroundColor: '#0B182D',
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
          <RouterLink to="/">
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
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={() => { setDialogOpen(true); }}
            sx={{
              borderColor: '#fff',
              color: '#fff',
              '&:hover': {
                borderColor: '#fff'
              }
            }}
            variant="outlined"
          >
            Language/Currency
          </Button>
        </Container>
      </Box>
      <LanguageCurrencyDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); }}
      />
    </>
  );
};
