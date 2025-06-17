import { Typography } from 'antd';
import { type FC } from 'react';

type DetailItemProps = {
  label: string;
  value: string | number;
};

const DetailItem: FC<DetailItemProps> = ({ label, value }) => {
  return (
    <div className={`detail-item left`}>
      <Typography.Text type="secondary">{label}</Typography.Text>
      <Typography.Title level={5}>{value}</Typography.Title>
    </div>
  );
};

export default DetailItem;
