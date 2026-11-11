import { useState, useEffect } from 'react';

export function useLiveClock(timeZone = 'Asia/Karachi') {
  const [timeInfo, setTimeInfo] = useState({
    time: '--:--:--',
    date: '---',
    period: 'AM',
    utcOffset: 'UTC+5'
  });

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();

        const timeFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone,
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        });

        const formattedTime = timeFormatter.format(now);
        const [timePart, period] = formattedTime.split(' ');

        setTimeInfo({
          time: timePart,
          date: dateFormatter.format(now),
          period: period || '',
          utcOffset: 'PKT (UTC+5)'
        });
      } catch {
        setTimeInfo({
          time: '12:00:00',
          date: 'Mon, Today',
          period: 'PM',
          utcOffset: 'PKT (UTC+5)'
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return timeInfo;
}

