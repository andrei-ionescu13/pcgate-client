import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import type { SxProps } from '@mui/system';

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
