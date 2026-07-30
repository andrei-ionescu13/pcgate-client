'use client';

import { useAmountFormatter } from '@/hooks/use-amount-formatter';

interface AmountProps {
  children: number;
  className?: string;
}

export const Amount = ({ children, className }: AmountProps) => {
  const format = useAmountFormatter();
  const amount = format(children);

  return <p className={className}>{amount}</p>;
};
