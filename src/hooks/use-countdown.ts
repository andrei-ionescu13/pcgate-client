import { useState, useEffect } from 'react';
import { getTimeLeft } from '@/utils/get-time-left';

export const useCountdown = (endDate: Date) => {
  const [timeDiff, setTimeDiff] = useState<number>(() => {
    const diff = endDate.valueOf() - Date.now().valueOf();
    return diff <= 0 ? 0 : diff;
  });
  const mappedTimeDiff = getTimeLeft(timeDiff);

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimeDiff((prev => {
        if (prev <= 0) {
          clearInterval(timeout);
          return 0;
        }

        return prev - 1000;
      }));
    }, 1000);

    return () => {
      if (timeout) clearInterval(timeout);
    };
  }, []);

  return mappedTimeDiff;
};
