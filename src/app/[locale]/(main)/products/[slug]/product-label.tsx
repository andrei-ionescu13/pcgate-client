import type { FC } from 'react';

interface ProductLabelProps {
  variant: string;
}

export const ProductLabel: FC<ProductLabelProps> = () => {
  return (
    <div className="absolute -top-10 -left-10 w-fit">
      <div className="flex">
        <div className="px-1 py-0.5">
          <p className="caption text-white uppercase">Star Deal</p>
        </div>
        <div
          className="bg-info -ml-[1px] w-5"
          style={{ clipPath: 'polygon(0 0, 100% 0, 1px 100%, 0 100%)' }}
        />
      </div>
      <div
        className="bg-info-dark h-[5px] w-[5px]"
        style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }}
      />
    </div>
  );
};
