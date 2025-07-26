'use client';

import { Link } from '@/i18n/navigation';
import { ContentCopy } from '@/icons/content-copy';
import { Steam as SteamIcon } from '@/icons/steam';
import type { ProductKey } from '@/types/common';
import type { Product } from '@/types/product';
import { ApiError } from '@/utils/api-error';
import { appFetchAuth } from '@/utils/app-fetch';
import { Tooltip } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { FC, MouseEvent, useState } from 'react';
import { AppImage } from './app-image';
import { Button } from './button';
import { Card } from './card';
import { IconButton } from './icon-button';

interface ProductKeyProps {
  value: string;
}

const ProductKey: FC<ProductKeyProps> = (props) => {
  const { value } = props;
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
  };

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto">
      <div className="flex w-full flex-col justify-center rounded-lg bg-[rgb(28,33,41)] sm:flex-row md:max-w-[300px]">
        <div className="flex items-center justify-between py-1 pl-2 sm:py-0">
          <p className="body2 line-clamp-1 break-all">{value}</p>
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
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </div>
        <Button
          className="hidden sm:inline-flex"
          asChild
          color="primary"
          variant="contained"
        >
          <a
            href={`https://store.steampowered.com/account/registerkey?key=${value}`}
            target="_blank"
          >
            Redeem
          </a>
        </Button>
      </div>
      <Button
        className="sm:hidden"
        asChild
        color="primary"
        variant="contained"
      >
        <a
          href={`https://store.steampowered.com/account/registerkey?key=${value}`}
          target="_blank"
        >
          Redeem
        </a>
      </Button>
    </div>
  );
};

export const useRevealKey = () =>
  useMutation<any, ApiError, string>({
    mutationFn: (keyId) =>
      appFetchAuth({
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
      onSuccess: (data) => {
        setProductKeyValue(data);
      },
    });
  };

  return (
    <Card
      color="neutral"
      className="relative flex flex-col items-start gap-2 p-2 pr-6 sm:flex-row sm:items-center"
    >
      <div className="relative w-full overflow-hidden rounded-lg md:block md:max-w-[220px]">
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
      </div>
      <div className="ml-2">
        <Link
          href={`/products/${product.slug}`}
          className="body2 line-clamp-2"
        >
          {product.title}
        </Link>
        <div className="mt-2">
          <SteamIcon />
        </div>
      </div>
      <div className="flex-1" />
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
    </Card>
  );
};
