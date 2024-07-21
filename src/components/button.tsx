"use client"

import type { FC } from 'react'
import { alpha, Button as MatButton, CircularProgress, styled } from '@mui/material'
import type { ButtonProps as MatButtonProps } from '@mui/material'

interface ButtonRootProps extends MatButtonProps {
  isLoading?: boolean;
}

const ButtonRoot = styled(({ isLoading, ...props }: ButtonRootProps) => (
  <MatButton {...props} />
))<ButtonRootProps>(({ theme, isLoading, color }) => ({
  position: 'relative',
  '&.Mui-disabled ': {
    backgroundColor: (isLoading && !!color && color !== 'inherit') ? alpha(theme.palette[color].main, 0.36) : theme.palette.action.disabled
  },
  div: {
    '&:first-of-type': {
      display: 'inline-flex',
      visibility: isLoading && 'hidden'
    }
  }
}))

export interface ButtonProps extends MatButtonProps {
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const { isLoading = false, disabled, children, color, ...rest } = props;

  return (
    <ButtonRoot
      isLoading={isLoading}
      disabled={disabled || isLoading}
      color={color}
      {...rest}
    >
      <div>{children}</div>
      {isLoading && (
        <CircularProgress
          size={24}
          color={color}
          sx={{ position: 'absolute' }}
          thickness={4.2}
        />
      )}
    </ButtonRoot>
  )
}
