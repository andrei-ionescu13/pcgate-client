'use client';

import { Link } from '@/i18n/navigation';
import type { ProductKey } from '@/types/common';
import type { Product } from '@/types/product';
import { ApiError } from '@/utils/api-error';
import { appFetch } from '@/utils/app-fetch';
import { Tooltip } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { AppImage } from './app-image';
import { Button } from './button';
import { Card } from './card';
import { IconButton } from './icon-button';

interface ProductKeyProps {
  value: string;
}

const ProductKey = ({ value }: ProductKeyProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
  };

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto">
      <div className="flex min-w-56 flex-col rounded-lg bg-[rgb(28,33,41)] sm:flex-row">
        <div className="flex w-full items-center justify-between py-1 pl-2 sm:py-0">
          <p className="body2 line-clamp-1 break-all">{value}</p>
          <div className="flex-1"></div>
          <Tooltip
            className="mr-2"
            title={hasCopied ? 'Copied' : 'Copy'}
            placement="top"
            slotProps={{
              transition: {
                onExited: () => {
                  setHasCopied(false);
                },
              },
            }}
          >
            <IconButton
              size="small"
              onClick={handleCopyToClipboard}
            >
              <CopyIcon />
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
      appFetch({
        url: `/keys/reveal/${keyId}`,
        config: {
          method: 'POST',
        },
        withAuth: true,
      }),
  });

interface LibraryProductProps {
  product: Product;
  productKey: ProductKey;
  hideRedeem?: boolean;
}

export const LibraryProduct = ({
  product,
  productKey,
  hideRedeem = false,
}: LibraryProductProps) => {
  const revealKey = useRevealKey();
  const [productKeyValue, setProductKeyValue] = useState(productKey.value);

  const handleRevealKey = () => {
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
      <div className="relative w-full overflow-hidden rounded-lg sm:max-w-[220px] md:block">
        <Link
          href={`/products/${product.slug}`}
          className="body2 line-clamp-2"
        >
          <div className="relative aspect-video">
            <AppImage
              fill
              src={product.cover.publicId}
              alt={product.title}
            />
          </div>
        </Link>
      </div>
      <div className="ml-2">
        <Link
          href={`/products/${product.slug}`}
          className="body2 line-clamp-2"
        >
          {product.title}
        </Link>
        <div className="relative mt-2 flex aspect-square w-full max-w-10">
          <AppImage
            src={product.platform.logo.publicId}
            alt={product.platform.name}
            sizes="
                (min-width: 1200px) 400px,
                (min-width: 900px) 33vw,
                (min-width: 600px) 50vw"
            fill
          />
        </div>
      </div>
      <div className="flex-1" />
      {!hideRedeem &&
        (productKeyValue ? (
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
        ))}
    </Card>
  );
};
