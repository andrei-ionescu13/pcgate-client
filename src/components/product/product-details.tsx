import { Fragment, type FC } from "react";
import { format } from "date-fns";
import { Card, CardContent, Typography, List } from "@mui/material";
import { LinkList } from "../property-item-list";
import { PropertyItem } from "../property-item";
import { Product } from "@/types/product";
import { Link } from "../link";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: FC<ProductDetailsProps> = (props) => {
  const { product } = props;

  return (
    <Card>
      <CardContent>
        <Typography color="textPrimary" variant="h6">
          Game details
        </Typography>
        <List>
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
            content={format(new Date(product.releaseDate), "MMMM dd, y")}
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
        </List>
      </CardContent>
    </Card>
  );
};
