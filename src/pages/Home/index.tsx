import { useEffect, useMemo, useState, type FC } from 'react';
import { List, notification } from 'antd';
import { fetchGMList } from '../../services/chess.service';
import Header from '../../components/Header';
import Main from '../../layout/Main';
import Search from '../../components/Search';
import ListItem from '../../components/ListItem';

const Home: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [grandmasters, setGrandmasters] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchGrandMasters();
  }, []);

  const fetchGrandMasters = async () => {
    try {
      setLoading(true);

      const data = await fetchGMList();

      if (data && Array.isArray(data)) {
        setGrandmasters(data);
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

  const filtered = useMemo(() => {
    if (!search) {
      return grandmasters;
    }

    return grandmasters.filter((gm) =>
      gm.toLowerCase().includes(search.toLowerCase())
    );
  }, [grandmasters, search]);

  return (
    <Main>
      <Search onSearchChange={setSearch} />
      <List
        bordered
        size="large"
        loading={loading}
        dataSource={filtered}
        renderItem={(item, index) => (
          <ListItem key={item} item={item} index={index} />
        )}
      />
    </Main>
  );
};

export default Home;
