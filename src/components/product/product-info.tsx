import type { FC } from 'react';
import { Box, Card, CardContent, List, ListItem, Typography } from '@mui/material';
import { ShieldCheck as ShieldCheckIcon } from '@/icons/shield-check';
import { User as UserIcon } from '@/icons/user';
import { capitalize } from '@/utils/capitalize';

interface ProductInfoProps {
  drm: string;
}

export const ProductInfo: FC<ProductInfoProps> = (props) => {
  const { drm } = props;
  const items = [
    {
      content: `This game requires a ${capitalize(drm)} account to play`,
      icon: UserIcon,
      title: `Redeem on ${capitalize(drm)}`
    },
    {
      content: 'Your purchased keys will be available immediately.*',
      icon: UserIcon,
      title: 'Instant delivery'
    },
    {
      content: 'All our keys are sourced direct from the game\'s official publisher.',
      icon: ShieldCheckIcon,
      title: 'Officially licensed'
    }
  ];

  return (
    <Card elevation={0}>
      <CardContent>
        <List>
          {items.map((item) => {
            const { title, content, icon: Icon } = item;

            return (
              <ListItem
                key={title}
                sx={{
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    mb: 0.5
                  }}
                >
                  <Icon sx={{ mr: 1 }} />
                  <Typography
                    color="textPrimary"
                    variant="body1"
                  >
                    {title}
                  </Typography>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body2"
                >
                  {content}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
