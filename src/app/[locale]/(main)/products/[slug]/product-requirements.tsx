import type { FC } from 'react';

interface ProductRequirementsProps {
  min: string;
  recommended: string;
}

export const ProductRequirements: FC<ProductRequirementsProps> = (props) => {
  const { min, recommended } = props;

  return (
    <div className="mt-10">
      <h5 className="mb-5">System Requirements</h5>
      <div className="flex gap-6">
        <div>
          <p className="subtitle1">Minimum</p>
          <p
            className="body3"
            dangerouslySetInnerHTML={{ __html: min }}
          />
        </div>
        <div>
          <p className="subtitle1">Recommended</p>
          <p
            className="body3"
            dangerouslySetInnerHTML={{ __html: recommended }}
          />
        </div>
      </div>
    </div>
  );
};
