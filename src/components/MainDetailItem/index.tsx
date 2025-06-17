import { Typography } from 'antd';
import { type FC } from 'react';

type MainDetailItemProps = {
  label: string;
  value: string | number;
};

const MainDetailItem: FC<MainDetailItemProps> = ({ label, value }) => {
  return (
    <div className={`detail-item center`}>
      <Typography.Paragraph strong>{value}</Typography.Paragraph>
      <Typography.Text type="secondary">{label}</Typography.Text>
    </div>
  );
};

export default MainDetailItem;
