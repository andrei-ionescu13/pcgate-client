import { ShieldCheck as ShieldCheckIcon } from '@/icons/shield-check';
import { User as UserIcon } from '@/icons/user';
import { capitalize } from '@/utils/capitalize';
import { Card, CardContent, List, ListItem } from '@mui/material';
import type { FC } from 'react';

interface ProductInfoProps {
  drm: string;
}

export const ProductInfo: FC<ProductInfoProps> = (props) => {
  const { drm } = props;
  const items = [
    {
      content: `This game requires a ${capitalize(drm)} account to play`,
      icon: UserIcon,
      title: `Redeem on ${capitalize(drm)}`,
    },
    {
      content: 'Your purchased keys will be available immediately.*',
      icon: UserIcon,
      title: 'Instant delivery',
    },
    {
      content:
        "All our keys are sourced direct from the game's official publisher.",
      icon: ShieldCheckIcon,
      title: 'Officially licensed',
    },
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
                  alignItems: 'flex-start',
                }}
              >
                <div className="mb-1 flex items-center">
                  <Icon sx={{ mr: 1 }} />
                  <p>{title}</p>
                </div>
                <p className="body2 text-text-secondary">{content}</p>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};
