'use client';

import { Search as SearchIcon } from '@/icons/search';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEventHandler, useState, type ChangeEvent, type FC } from 'react';
import { InputBase, type InputBaseProps } from './input-base';

interface SearchInputProps extends InputBaseProps {}

export const SearchParam: FC<SearchInputProps> = (props) => {
  const [keyword, setKeyword] = useState('');
  const { placeholder = 'Search...', ...rest } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (keyword) {
      params.set('keyword', keyword);
    } else {
      params.delete('keyword');
    }

    params.delete('page');
    replace(`${pathname}?${params.toString()}`);
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <form onSubmit={handleSearch}>
      <InputBase
        className="w-full bg-[rgb(28,33,41)]"
        endAdornment={<SearchIcon className="text-text-secondary" />}
        onChange={handleKeywordChange}
        value={keyword}
        placeholder={placeholder}
        {...rest}
      />
    </form>
  );
};
