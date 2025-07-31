import { cn } from '@/utils/cn';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import type { FC } from 'react';
import { useState } from 'react';
import type { FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';

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
    <div
      className={cn(
        'border-divider flex flex-1 cursor-pointer flex-col items-center rounded-lg border border-dashed bg-[rgba(255,255,255,0.2)] p-2 transition-all duration-200 hover:bg-[rgba(255,255,255,0.12)]',
        isFocused && 'border-white'
      )}
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
    </div>
  );
};
