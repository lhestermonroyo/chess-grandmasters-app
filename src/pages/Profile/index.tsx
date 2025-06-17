import { Fragment, useEffect, useState, type FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchGMProfile } from '../../services/chess.service';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  notification,
  Row,
  Skeleton,
  Space,
  Typography
} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import Main from '../../layout/Main';
import LiveClock from '../../components/LastOnline';
import MainDetailItem from '../../components/MainDetailItem';
import DetailItem from '../../components/DetailItem';

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
      notification.error({
        closable: true,
        duration: 5,
        message: 'Error',
        description: 'Failed to fetch grandmasters. Please try again later.'
      });
      navigate('/');
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

  return (
    <Fragment>
      <title>Chess Grandmasters - Profile</title>
      <Main>
        <Space direction="horizontal" align="center" className="full-width">
          <Button
            size="large"
            icon={<LeftOutlined />}
            onClick={() => navigate('/')}
          >
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
                  {profile?.username}
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
                    <MainDetailItem
                      label="Joined last"
                      value={format(
                        new Date(profile?.joined * 1000).toUTCString(),
                        'MMMM dd, yyyy'
                      )}
                    />
                  </Col>
                  <Col flex={1}>
                    <MainDetailItem
                      label="Followers"
                      value={profile?.followers || 0}
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
                <DetailItem
                  label="Country"
                  value={profile?.location || 'N/A'}
                />
                <DetailItem label="Status" value={profile?.status || 'N/A'} />
              </Space>
            </Col>
          </Row>
        </Card>
      </Main>
    </Fragment>
  );
};

export default Profile;
