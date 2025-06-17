import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useCallback, useEffect, useState, type FC } from 'react';
import { useDebounce } from 'use-debounce';

type SearchProps = {
  onSearchChange: (value: string) => void;
};

const Search: FC<SearchProps> = ({ onSearchChange }) => {
  const [value, setValue] = useState<string>('');
  const [dbFilter] = useDebounce(value, 300);

  useEffect(() => {
    onSearchChange(dbFilter);
  }, [dbFilter]);

  const handleChange = useCallback(
    (value: string) => {
      setValue(value);
    },
    [value]
  );

  return (
    <Input
      size="large"
      prefix={<SearchOutlined size={24} />}
      placeholder="Search grandmasters..."
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default Search;
