import { useEffect, useState, type FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchGMProfile } from '../../services/chess.service';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Skeleton,
  Space,
  Typography
} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import Main from '../../layout/Main';
import LiveClock from '../../components/LastOnline';

const DetailItem = ({
  label,
  value,
  align = 'left',
  size = 'large'
}: {
  label: string;
  value: string | number;
  align?: 'left' | 'center' | 'right';
  size?: 'middle' | 'large';
}) => {
  return (
    <div className={`detail-item ${align}`}>
      {size === 'large' ? (
        <Typography.Title level={5}>{value}</Typography.Title>
      ) : (
        <Typography.Paragraph strong>{value}</Typography.Paragraph>
      )}
      <Typography.Text type="secondary">{label}</Typography.Text>
    </div>
  );
};

const Profile: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null); // Replace 'any' with a proper type when available

  const navigate = useNavigate();
  const params = useParams<{ username: string }>();
  const username = params.username;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    if (!username) {
      navigate('/');
      return;
    }

    try {
      setLoading(true);
      const data = await fetchGMProfile(username);

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.log('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) {
    return (
      <Main>
        <Skeleton active paragraph={{ rows: 4 }} />
      </Main>
    );
  }

  console.log('rendering profile:', profile);

  return (
    <Main>
      <Space direction="horizontal" align="center" className="full-width">
        <Button icon={<LeftOutlined />} onClick={() => navigate('/')}>
          Back
        </Button>
        <Typography.Text strong className="page-title">
          Profile
        </Typography.Text>
      </Space>
      <Card className="profile-card">
        <Row align="middle" justify="center">
          <Col flex="500px">
            <Space className="full-width" direction="vertical" align="center">
              <Avatar shape="circle" src={profile.avatar} size={128}>
                {profile?.username}
              </Avatar>
            </Space>
            <Space
              className="full-width"
              size={0}
              direction="vertical"
              align="center"
              style={{ marginTop: 12, marginBottom: 24 }}
            >
              <Typography.Title level={2} style={{ marginBottom: 3 }}>
                {profile?.username}{' '}
              </Typography.Title>
              <Typography.Title level={5}>{profile?.name}</Typography.Title>
            </Space>
            <Space
              direction="vertical"
              className="full-width"
              style={{ marginBottom: 24 }}
            >
              <Row
                gutter={[16, 16]}
                justify="center"
                align="middle"
                style={{ marginBottom: 12 }}
              >
                <Col flex={1}>
                  <DetailItem
                    label="Joined last"
                    value={format(
                      new Date(profile?.joined * 1000).toUTCString(),
                      'MMMM dd, yyyy'
                    )}
                    align="center"
                    size="middle"
                  />
                </Col>
                <Col flex={1}>
                  <DetailItem
                    label="Followers"
                    value={profile?.followers || 0}
                    align="center"
                    size="middle"
                  />
                </Col>
                <Col flex={1}>
                  <LiveClock value={Number(profile?.last_online || 0)} />
                </Col>
              </Row>
              <Row align="middle" justify="center">
                <Button
                  size="large"
                  type="primary"
                  target="_blank"
                  href={`https://www.chess.com/member/${profile?.username}`}
                >
                  Visit Chess.com Profile
                </Button>
              </Row>
            </Space>
            <Divider>
              <Typography.Title level={3}>
                Other Profile Details
              </Typography.Title>
            </Divider>
            <Space size={24} direction="vertical">
              <DetailItem label="Title" value={profile?.title || 'N/A'} />
              <DetailItem label="League" value={profile?.league || 'N/A'} />
              <DetailItem label="Country" value={profile?.location || 'N/A'} />
              <DetailItem label="Status" value={profile?.status || 'N/A'} />
            </Space>
          </Col>
        </Row>
      </Card>
    </Main>
  );
};

export default Profile;
