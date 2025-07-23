'use client';
import { Card } from '@/components/card';
import { useCountdown } from '@/hooks/use-countdown';
import { useRouter } from '@/i18n/navigation';
import { Meta } from '@/types/common';
import type { FC } from 'react';

interface DealI {
  _id: string;
  cover: {
    public_id: string;
    width: number;
    height: number;
    _id: string;
  };
  title: string;
  description: string;
  slug: string;
  endDate: string;
  meta: Meta;
  hasExpired?: boolean;
}

interface CollectionTimerProps {
  deal: DealI;
}

export const CollectionTimer: FC<CollectionTimerProps> = (props) => {
  const { deal } = props;
  const router = useRouter();
  const timeDiff = useCountdown(new Date(deal.endDate), () => {
    router.refresh();
  });

  return (
    <div className="mt-16 flex gap-4">
      {timeDiff.map((item) => (
        <div
          className="grid place-items-center"
          key={item.label}
        >
          <Card className="bg-primary grid min-w-16 place-items-center">
            <h3>{item.value}</h3>
          </Card>
          <p className="subtitle2">{item.label}</p>
        </div>
      ))}
    </div>
  );
};
