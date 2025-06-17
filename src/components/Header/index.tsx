import { type FC } from 'react';
import { Button, Space, Tooltip, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.png';

const githubUrl = 'https://github.com/lhestermonroyo/chess-grandmasters-app';

const Header: FC = () => {
  return (
    <div className="header">
      <Space className="logo-container" direction="horizontal" align="center">
        <img src={logo} alt="logo" />
        <Typography.Text strong>Chess Grandmasters</Typography.Text>
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
          target="_blank"
          href={githubUrl}
        />
      </Tooltip>
    </div>
  );
};

export default Header;
