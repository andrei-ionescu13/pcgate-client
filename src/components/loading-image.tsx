import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Skeleton } from '@material-ui/core';
import { styled } from '@material-ui/system';
import type { SxProps } from '@material-ui/system';

interface LoadingImageProps {
  [key: string]: any;
  height: number;
  placeholder?: ReactNode;
  sx?: SxProps;
  width: number;
}

const LoadingImageRoot = styled('img')<{ styleProps: { loading: boolean; } }>(
  ({ styleProps }) => ({
    display: styleProps.loading ? 'none' : 'block'
  }));

export const LoadingImage: FC<LoadingImageProps> = (props) => {
  const { placeholder, height, width, ...rest } = props;
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (placeholder || (
        <Skeleton
          sx={{
            pb: `${height / width * 100}%`,
            height: 0
          }}
          variant="rectangular"
        />
      ))}
      <LoadingImageRoot
        onLoad={() => setLoading(false)}
        styleProps={{ loading }}
        {...rest}
      />
    </>
  );
};
