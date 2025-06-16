import { useEffect, useState, type FC } from 'react';
import { Avatar, Button, List, notification } from 'antd';
import { fetchGMList } from '../../services/chess.service';
import Header from '../../components/Header';
import Main from '../../layout/Main';

// TODO: Implement display of chess grandmasters list
const Home: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [grandmasters, setGrandmasters] = useState<string[]>([]);

  useEffect(() => {
    // Fetch grandmasters when the component mounts
    fetchGrandmasters();
  }, []);

  const fetchGrandmasters = async () => {
    try {
      setLoading(true);

      const data = await fetchGMList();

      if (data && Array.isArray(data)) {
        setGrandmasters(data);
        notification.success({
          message: 'Success',
          description: 'Grandmasters fetched successfully!'
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch grandmasters. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Main>
      <Header />
      <List
        bordered
        size="large"
        loading={loading}
        dataSource={grandmasters}
        renderItem={(item, index) => (
          <List.Item key={item}>
            <List.Item.Meta
              className="list-item-meta"
              avatar={
                <Avatar
                  alt="Grandmaster Avatar"
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={item}
            />
            <div>
              <Button>View Profile</Button>
            </div>
          </List.Item>
        )}
      />
    </Main>
  );
};

export default Home;
