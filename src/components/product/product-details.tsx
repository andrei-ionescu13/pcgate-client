import type { FC } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, Typography, List } from '@mui/material';
import { PropertyItem } from '../property-item';
import { PropertyItemList } from '../property-item-list';
import { capitalize } from '../../utils/capitalize';
import type { Product } from '../../types/product';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: FC<ProductDetailsProps> = (props) => {
  const { product } = props;

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          Game details
        </Typography>
        <List>
          <PropertyItem
            content={capitalize(product.drm_string)}
            label="Platform:"
          />
          <PropertyItem
            content={product.publishers.length > 1 ? <PropertyItemList items={product.publishers} /> : product.publishers[0]}
            label="Publisher:"
          />
          <PropertyItem
            content={product.developers.length > 1 ? <PropertyItemList items={product.developers} /> : product.developers[0]}
            label="Developers:"
          />
          <PropertyItem
            content={format(new Date(product.release), 'MMMM dd, y')}
            label="Release Date:"
          />
          <PropertyItem
            content={<PropertyItemList items={product.genres} />}
            label="Genres:"
          />

          <PropertyItem
            content={product.franchises.length > 1 ? <PropertyItemList items={product.franchises} /> : product.franchises[0]}
            label="Franchises:"
          />
        </List>
      </CardContent>
    </Card>
  );
};
