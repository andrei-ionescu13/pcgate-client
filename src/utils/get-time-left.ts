import { subDays, subHours, subMinutes } from 'date-fns';

export const getTimeLeft = (timeDiff: number) => {
  const days = Math.floor(timeDiff / 24 / 60 / 60 / 1000);
  timeDiff = subDays(timeDiff, days).valueOf();
  const hours = Math.floor(timeDiff / 60 / 60 / 1000);
  timeDiff = subHours(timeDiff, hours).valueOf();
  const minutes = Math.floor(timeDiff / 60 / 1000);
  timeDiff = subMinutes(timeDiff, minutes).valueOf();
  const seconds = Math.floor(timeDiff / 1000);

  const mappedDiff = [
    {
      label: 'days',
      value: days
    },
    {
      label: 'hours',
      value: hours
    },
    {
      label: 'mins',
      value: minutes
    },
    {
      label: 'secs',
      value: seconds
    }
  ];

  return mappedDiff.filter((item, index) => {
    if (index === 0 && !Boolean(item.value)) return false;

    if (!Boolean(item.value) && !Boolean(mappedDiff[index - 1].value)) return false;

    return true;
  });
};