'use client';

import { useOpen } from '@/hooks/use-open';
import { useRouter } from '@/i18n/navigation';
import { usePageLoading } from '@/store/page-loading';
import type { SxProps } from '@mui/system';
import { useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { SortByPopover } from './sort-by-popover';

interface Item {
  value: string;
  label: string;
}

interface SortByPopoverQueryProps {
  sx?: SxProps;
  items: Item[];
  defaultValue: string;
}

export const SortByPopoverQuery = ({
  items,
  defaultValue,
}: SortByPopoverQueryProps) => {
  const router = useRouter();
  const { setIsPageLoading } = usePageLoading();
  const searchParams = useSearchParams();
  const itemSelected = items.find(
    (item) => item.value === (searchParams.get('sortBy') || defaultValue)
  );
  const [isPending, startTransition] = useTransition();
  const [open, handleOpen, handleClose] = useOpen();

  const handleClick = (value: string): void => {
    const urlSearchParams = new URLSearchParams(searchParams);

    if (itemSelected?.value === value) {
      handleClose();
      return;
    }

    if (value === defaultValue) {
      urlSearchParams.delete('sortBy');
    } else {
      urlSearchParams.set('sortBy', value);
    }

    handleClose();
    startTransition(() => router.push(`?${urlSearchParams}`));
  };

  useEffect(() => {
    setIsPageLoading(isPending);
  }, [isPending]);

  return (
    <SortByPopover
      items={items}
      value={itemSelected?.value || defaultValue}
      onChange={handleClick}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
    />
  );
};
