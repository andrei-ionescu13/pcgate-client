import { Card } from '@/components/card';
import { Link } from '@/i18n/navigation';
import { Product } from '@/types/product';
import { format } from 'date-fns';
import { type FC } from 'react';
import { PropertyItem } from '../../../../../components/property-item';
import { LinkList } from '../../../../../components/property-item-list';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: FC<ProductDetailsProps> = (props) => {
  const { product } = props;

  return (
    <Card className="p-2">
      <h6>Game details</h6>
      <ul>
        <PropertyItem
          label="Publisher:"
          content={
            <Link
              href={`/publishers/${product.publisher.slug}`}
              color="textPrimary"
            >
              {product.publisher.name}
            </Link>
          }
        />
        <PropertyItem
          content={
            <LinkList
              items={product.developers.map((developer) => ({
                label: developer.name,
                href: `/developers/${developer.slug}`,
              }))}
            />
          }
          label="Developers:"
        />
        <PropertyItem
          content={format(new Date(product.releaseDate), 'MMMM dd, y')}
          label="Release Date:"
        />
        <PropertyItem
          content={
            <LinkList
              items={product.genres.map((genre) => ({
                label: genre.name,
                href: `/genres/${genre.slug}`,
              }))}
            />
          }
          label="Genres:"
        />
        <PropertyItem
          content={
            <LinkList
              items={product.features.map((feature) => ({
                label: feature.name,
                href: `/features/${feature.slug}`,
              }))}
            />
          }
          label="Features:"
        />
        <PropertyItem
          content={
            <LinkList
              items={product.os.map((os) => ({
                label: os.name,
                href: `/os/${os.slug}`,
              }))}
            />
          }
          label="Os:"
        />
      </ul>
    </Card>
  );
};
