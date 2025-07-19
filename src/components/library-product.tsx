'use client';

import { AppImage } from '@/components/app-image';
import { Link } from '@/i18n/navigation';
import { Steam as SteamIcon } from '@/icons/steam';
import type { ProductKey } from '@/types/common';
import type { Product } from '@/types/product';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { ContentCopyOutlined as ContentCopyIcon } from '@mui/icons-material';
import { Box, Card, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useMutation } from '@tanstack/react-query';
import { FC, MouseEvent, useState } from 'react';
import { Button } from './button';

interface ProductKeyProps {
  value: string;
}

const ProductKeyRoot = styled(Box)(({ theme }) => ({
  justifyContent: 'center',
  display: 'flex',
  [theme.breakpoints.up('xs')]: {
    flexDirection: 'column',
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    width: 'inherit',
  },
}));

const ProductKey: FC<ProductKeyProps> = (props) => {
  const { value } = props;
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
  };

  return (
    <ProductKeyRoot>
      <Box
        sx={{
          backgroundColor: 'background.default',
          borderTopLeftRadius: (theme) => theme.shape.borderRadius,
          borderTopRightRadius: (theme) => ({
            sm: 0,
            xs: theme.shape.borderRadius,
          }),
          borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
          borderBottomRightRadius: (theme) => ({
            sm: 0,
            xs: theme.shape.borderRadius,
          }),
          height: 36,
          mb: {
            sm: 0,
            xs: 1,
          },
          px: 1,
          display: 'flex',
          minWidth: 210,
          alignItems: 'center',
        }}
      >
        <p className="body2 text-center">{value}</p>
        <Box sx={{ flex: 1 }} />
        <Tooltip
          title={hasCopied ? 'Copied' : 'Copy'}
          placement="top"
          TransitionProps={{
            onExited: () => {
              setHasCopied(false);
            },
          }}
        >
          <IconButton
            size="small"
            onClick={handleCopyToClipboard}
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Button
        color="primary"
        component="a"
        href={`https://store.steampowered.com/account/registerkey?key=${value}`}
        sx={{
          borderTopLeftRadius: {
            sm: 0,
          },
          borderBottomLeftRadius: {
            sm: 0,
          },
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        }}
        target="_blank"
        variant="contained"
      >
        Redeem
      </Button>
    </ProductKeyRoot>
  );
};

export const useRevealKey = () =>
  useMutation<any, ApiError, string>({
    mutationFn: (keyId) =>
      appFetch({
        url: `/keys/reveal/${keyId}`,
        withAuth: true,
        config: {
          method: 'POST',
        },
      }),
  });

interface LibraryProductProps {
  product: Product;
  productKey: ProductKey;
}

export const LibraryProduct: FC<LibraryProductProps> = (props) => {
  const { product, productKey } = props;
  const revealKey = useRevealKey();
  const [productKeyValue, setProductKeyValue] = useState(productKey.value);

  const handleRevealKey = (event: MouseEvent<HTMLButtonElement>) => {
    revealKey.mutate(productKey._id, {
      onSuccess: (data, variables, context) => {
        setProductKeyValue(data);
      },
    });
  };

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: 'background.neutral',
        display: 'flex',
        alignItems: {
          sm: 'center',
          xs: 'flex-start',
        },
        position: 'relative',
        flexDirection: {
          sm: 'row',
          xs: 'column',
        },
        p: 2,
        pb: {
          sm: 2,
          xs: 5,
        },
      }}
    >
      <Box
        sx={{
          display: {
            md: 'block',
            xs: 'none',
          },
          width: 220,
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AppImage
          layout="responsive"
          width={16}
          height={9}
          priority
          src={product.cover.public_id}
          alt={product.title}
          sizes="
                (min-width: 1200px) 400px,
                (min-width: 900px) 33vw,
                (min-width: 600px) 50vw"
        />
      </Box>
      <Box
        sx={{
          maxWidth: 300,
          ml: {
            md: 2,
            xs: 0,
          },
        }}
      >
        <Link
          href={`/products/${product.slug}`}
          sx={{ color: '#fff' }}
          underline="none"
          variant="body2"
        >
          {product.title}
        </Link>
        <Box sx={{ mt: 1 }}>
          <SteamIcon sx={{ color: '#fff' }} />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {productKeyValue ? (
        <ProductKey value={productKeyValue} />
      ) : (
        <Button
          color="primary"
          variant="contained"
          isLoading={revealKey.isPending}
          onClick={handleRevealKey}
        >
          Reveal
        </Button>
      )}
      <Link
        align="right"
        color="textSecondary"
        href="https://help.steampowered.com/en/faqs/view/2A12-9D79-C3D7-F870"
        sx={{
          position: 'absolute',
          right: 8,
          bottom: 8,
        }}
        target="_blank"
        underline="none"
        variant="caption"
      >
        How Do I Redeem My Key?
      </Link>
    </Card>
  );
};
