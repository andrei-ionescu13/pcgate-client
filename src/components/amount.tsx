'use client';

import { useAmountFormatter } from '@/hooks/use-amount-formatter';

interface AmountProps {
  children: number;
  className?: string;
  currency?: string;
}

export const Amount = ({ children, className, currency }: AmountProps) => {
  const format = useAmountFormatter(currency);
  const amount = format(children);

  return <p className={className}>{amount}</p>;
};
