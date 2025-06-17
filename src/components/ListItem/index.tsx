import { Avatar, Button, List } from 'antd';
import { useNavigate } from 'react-router';

const ListItem = ({ item, index }: { item: string; index: number }) => {
  const navigate = useNavigate();

  return (
    <List.Item>
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
        <Button onClick={() => navigate(`/profile/${item}`)}>
          View Profile
        </Button>
      </div>
    </List.Item>
  );
};

export default ListItem;
