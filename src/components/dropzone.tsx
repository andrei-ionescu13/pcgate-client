import { cn } from '@/utils/cn';
import { CircularProgress, styled } from '@mui/material';
import Image from 'next/image';
import type { FC } from 'react';
import { useState } from 'react';
import type { FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';

const DropzoneRoot = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderWidth: 1,
  borderRadius: 8,
  borderColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.23)'
      : 'rgba(0, 0, 0, 0.23)',
  borderStyle: 'dashed',
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : '#F5F5F5',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : '#EBEBEB',
  },
}));

export interface DropzoneFile extends FileWithPath {
  preview: string;
}

interface DropzoneProps {
  file?: DropzoneFile;
  onDrop: (file: DropzoneFile) => void;
  resolution?: {
    width: number;
    height: number;
  };
  onError?: (error: string) => void;
  placeholder: string;
}

export const Dropzone: FC<DropzoneProps> = (props) => {
  const { file, onDrop, resolution, onError, placeholder } = props;
  const [isLoading, setIsLoading] = useState(false);

  const { getRootProps, getInputProps, isFocused } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      (async () => {
        onDrop(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        if (resolution && onError) {
          setIsLoading(true);
          await new Promise((res) => {
            const img = new window.Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
              if (
                resolution?.width !== img.naturalWidth ||
                resolution?.height !== img.naturalHeight
              ) {
                onError('wrong resolution');
              }
              res(img);
            };
          });

          setIsLoading(false);
        }
      })();
    },
  });

  return (
    <DropzoneRoot
      sx={{ borderColor: isFocused ? '#fff' : undefined }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {!!file ? (
        <div className="relative block w-full">
          <div
            className={cn('block min-h-52 w-full', isLoading && 'opacity-20')}
          >
            <Image
              alt=""
              src={file?.preview}
              width={resolution?.width}
              height={resolution?.height}
              priority
              layout={resolution ? 'responsive' : 'fill'}
              objectFit="contain"
            />
          </div>
          {isLoading && (
            <div className="absolute inset-0 z-10 grid h-full place-items-center">
              <CircularProgress />
            </div>
          )}
        </div>
      ) : (
        <p className="py-20">{placeholder}</p>
      )}
    </DropzoneRoot>
  );
};
