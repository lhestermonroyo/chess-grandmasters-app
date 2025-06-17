import { useEffect, useMemo, useState, type FC } from 'react';
import { List, notification, Pagination, Space } from 'antd';
import { fetchGMList } from '../../services/chess.service';
import Main from '../../layout/Main';
import Search from '../../components/Search';
import ListItem from '../../components/ListItem';

const PAGE_SIZE = 20;

const Home: FC = () => {
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [grandmasters, setGrandmasters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
      <Space
        direction="vertical"
        className="full-width"
        style={{ marginBottom: 24 }}
      >
        <Search onSearchChange={setSearch} />
        <List
          bordered
          size="large"
          loading={loading}
          dataSource={filtered}
          renderItem={(item) => <ListItem key={item} item={item} />}
          pagination={{
            current: currentPage,
            pageSize: PAGE_SIZE,
            total: filtered.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false
          }}
        />
      </Space>
    </Main>
  );
};

export default Home;
