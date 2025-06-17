import { Typography } from 'antd';
import { useEffect, useState } from 'react';

const LastOnline = ({ value }: { value: number }) => {
  const [elapsed, setElapsed] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Date.now() / 1000 - value;
      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = Math.floor(diff % 60);

      setElapsed(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className={`detail-item center`}>
      <Typography.Paragraph strong>{elapsed} ago</Typography.Paragraph>
      <Typography.Text type="secondary">Last online</Typography.Text>
    </div>
  );
};

export default LastOnline;
