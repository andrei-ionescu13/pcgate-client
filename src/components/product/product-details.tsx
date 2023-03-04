import type { FC } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, Typography, List } from '@mui/material';
import { PropertyItemList } from '../property-item-list';
import { PropertyItem } from '../property-item';
import { Product } from '@/types/product';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: FC<ProductDetailsProps> = (props) => {
  const { product } = props;

  return (
    <Card>
      <CardContent>
        <Typography
          color="textPrimary"
          variant="h6"
        >
          Game details
        </Typography>
        <List>
          <PropertyItem
            content={product.publisher}
            label="Publisher:"
          />
          <PropertyItem
            content={product.developers.length > 1 ? <PropertyItemList items={product.developers} /> : product.developers[0]}
            label="Developers:"
          />
          <PropertyItem
            content={format(new Date(product.releaseDate), 'MMMM dd, y')}
            label="Release Date:"
          />
          <PropertyItem
            content={<PropertyItemList items={product.genres} />}
            label="Genres:"
          />
          <PropertyItem
            content={<PropertyItemList items={product.features} />}
            label="Features:"
          />
          <PropertyItem
            content={product.os}
            label="Os:"
          />
        </List>
      </CardContent>
    </Card>
  );
};
