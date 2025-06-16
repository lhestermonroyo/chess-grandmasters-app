import { type FC } from 'react';
import { Button, Space, Tooltip, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.png';

const Header: FC = () => {
  return (
    <div className="header">
      <Space className="logo-container" direction="horizontal" align="center">
        <img src={logo} alt="logo" />
        <Typography.Text strong>Chess Grandmasters App</Typography.Text>
      </Space>
      <Tooltip title="View on GitHub">
        <Button
          size="large"
          shape="circle"
          type="text"
          variant="link"
          icon={
            <GithubOutlined
              style={{
                fontSize: 24
              }}
            />
          }
        />
      </Tooltip>
    </div>
  );
};

export default Header;
