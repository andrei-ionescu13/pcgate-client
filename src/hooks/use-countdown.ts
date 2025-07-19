import { getTimeLeft } from '@/utils/get-time-left';
import { useEffect, useState } from 'react';

export const useCountdown = (endDate: Date, onCountdownEnd?: any) => {
  const [timeDiff, setTimeDiff] = useState<number>(() => {
    const diff = endDate.getTime() - Date.now();
    return diff <= 0 ? 0 : diff;
  });
  const mappedTimeDiff = getTimeLeft(timeDiff);
  useEffect(() => {
    const timeout = setInterval(() => {
      setTimeDiff((prev) => {
        if (prev <= 0) {
          clearInterval(timeout);
          onCountdownEnd && onCountdownEnd();
          return 0;
        }

        return prev - 1000;
      });
    }, 1000);

    return () => {
      if (timeout) clearInterval(timeout);
    };
  }, []);

  return mappedTimeDiff;
};
