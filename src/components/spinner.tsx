import type { FC } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const AtomSpinnerRoot = styled(Box)<{ styleProps: { color: string; } }>(
  ({ styleProps }) => ({
    height: 60,
    width: 60,
    overflow: 'hidden',
    '& .spinner-inner': {
      position: 'relative',
      display: 'block',
      height: '100%',
      width: '100%',
    },
    '& .spinner-circle': {
      display: 'block',
      position: 'absolute',
      color: styleProps.color,
      fontSize: 'calc(60px * 0.24)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    '& .spinner-line': {
      position: 'absolute',
      width: ' 100%',
      height: '100%',
      borderRadius: '50%',
      animationDuration: '1s',
      borderLeftWidth: 'calc(60px / 25)',
      borderTopWidth: 'calc(60px / 25)',
      borderLeftColor: styleProps.color,
      borderLeftStyle: 'solid',
      borderTopStyle: 'solid',
      borderTopColor: 'transparent',
      '&:nth-of-type(1)': {
        animation: 'atom-spinner-animation-1 1s linear infinite',
        transform: 'rotateZ(120deg) rotateX(66deg) rotateZ(0deg)',
      },
      '&:nth-of-type(2)': {
        animation: 'atom-spinner-animation-2 1s linear infinite',
        transform: 'rotateZ(240deg) rotateX(66deg) rotateZ(0deg)',
      },
      '&:nth-of-type(3)': {
        animation: 'atom-spinner-animation-3 1s linear infinite',
        transform: 'rotateZ(360deg) rotateX(66deg) rotateZ(0deg)',
      },
    },
    '@keyframes atom-spinner-animation-1': {
      '100%': {
        transform: 'rotateZ(120deg) rotateX(66deg) rotateZ(360deg)'
      }
    },
    '@keyframes atom-spinner-animation-2': {
      '100%': {
        transform: 'rotateZ(240deg) rotateX(66deg) rotateZ(360deg)'
      }
    },
    '@keyframes atom-spinner-animation-3': {
      '100%': {
        transform: 'rotateZ(360deg) rotateX(66deg) rotateZ(360deg)'
      }
    }
  }));

export const AtomSpinner: FC = () => {
  const theme = useTheme();

  return (
    <AtomSpinnerRoot styleProps={{ color: theme.palette.primary.main }}>
      <div className="spinner-inner">
        <div className="spinner-line"></div>
        <div className="spinner-line"></div>
        <div className="spinner-line"></div>
        <div className="spinner-circle">
          &#9679;
        </div>
      </div>
    </AtomSpinnerRoot>
  );
};
