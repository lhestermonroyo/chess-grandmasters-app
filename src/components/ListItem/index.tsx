import { Button, List } from 'antd';
import { useNavigate } from 'react-router';

const ListItem = ({ item }: { item: string }) => {
  const navigate = useNavigate();

  return (
    <List.Item>
      <List.Item.Meta className="list-item-meta" title={item} />
      <div>
        <Button size="large" onClick={() => navigate(`/profile/${item}`)}>
          View Profile
        </Button>
      </div>
    </List.Item>
  );
};

export default ListItem;
