'use client';

import { usePageLoading } from '@/store/page-loading';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
  type FormEventHandler,
} from 'react';
import { InputBase, type InputBaseProps } from './input-base';

interface SearchInputProps extends InputBaseProps {}

export const SearchParam = ({
  placeholder = 'Search...',
  ...rest
}: SearchInputProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { setIsPageLoading } = usePageLoading();
  const urlSearchParams = new URLSearchParams(searchParams);
  const [keyword, setKeyword] = useState(urlSearchParams.get('keyword') || '');
  const [isPending, startTransition] = useTransition();

  const handleSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (keyword) {
      urlSearchParams.set('keyword', keyword);
    } else {
      urlSearchParams.delete('keyword');
    }

    urlSearchParams.delete('page');

    startTransition(() => {
      push(`?${urlSearchParams.toString()}`);
    });
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    setIsPageLoading(isPending);
  }, [isPending]);

  return (
    <form onSubmit={handleSearch}>
      <InputBase
        className="w-full bg-[rgb(28,33,41)]"
        endAdornment={<SearchIcon />}
        onChange={handleKeywordChange}
        value={keyword}
        placeholder={placeholder}
        {...rest}
      />
    </form>
  );
};
