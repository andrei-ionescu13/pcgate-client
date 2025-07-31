'use client';

import { Card } from '@/components/card';
import type { CardProps } from '@mui/material';
import { Chip } from '@mui/material';
import type { FC, ReactNode } from 'react';

interface FilterCardCheckboxProps extends CardProps {
  title: string;
  field: string;
  children: ReactNode;
  onClear?: () => void;
}

export const FilterCard: FC<FilterCardCheckboxProps> = (props) => {
  const { title, children, onClear } = props;

  return (
    <Card className="border-neutral border">
      <div className="bg-neutral flex items-center px-4 py-2">
        <p className="subtitle1">{title}</p>
        <div className="flex-1" />
        {onClear && (
          <Chip
            label="Clear"
            variant="outlined"
            size="small"
            onClick={onClear}
          />
        )}
      </div>
      <div className="[&::-webkit-scrollbar-thumb]:bg-grey-500 [&::-webkit-scrollbar]:bg-neutral max-h-[360px] overflow-auto px-4 py-2 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:rounded-2xl">
        {children}
      </div>
    </Card>
  );
};
