//todo rename file
'use client';

import { useScrollTo } from '@/hooks/use-scroll-to';
import { Button } from './button';

interface LinkCategoriesButtonProps {
  //todo change this
  category: any;
}

export const LinkCategoriesButton = ({
  category,
}: LinkCategoriesButtonProps) => {
  const scrollTo = useScrollTo();

  return (
    <Button
      key={category.char}
      color="white"
      variant="outlined"
      size="small"
      onClick={() => {
        const el: HTMLElement | null = document.querySelector(
          `#category_${category.char}`
        );
        console.log(`.category_${category.char}`);
        el && scrollTo(el);
      }}
    >
      {category.char}
    </Button>
  );
};
