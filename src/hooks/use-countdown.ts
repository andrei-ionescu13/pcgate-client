import { useState, useEffect } from 'react';
import { getTimeLeft } from '../utils/get-time-left';

export const useCountdown = (endDate: Date) => {
  const [timeDiff, setTimeDiff] = useState<number>(endDate.valueOf() - Date.now().valueOf());

  const mappedTimeDiff = getTimeLeft(timeDiff);

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimeDiff((prevTimeDiff => {
        if (prevTimeDiff === 0) {
          clearInterval(timeout as ReturnType<typeof setTimeout>);
          return 0;
        }

        return prevTimeDiff - 1000;
      }));
    }, 1000);

    return () => {
      if (timeout) clearInterval(timeout);
    };
  }, []);

  return mappedTimeDiff;
};
