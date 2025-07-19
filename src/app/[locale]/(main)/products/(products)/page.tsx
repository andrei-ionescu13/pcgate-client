import { searchProducts } from 'app/[locale]/(main)/api-calls';
import { ProductsContent } from './page-content';

interface ProductsProps {
  searchParams: {
    publishers?: string | string[];
    developers?: string | string[];
    features?: string | string[];
    os?: string | string[];
    platforms?: string | string[];
    genres?: string | string[];
    sortBy?: string;
    price_min?: string;
    price_max?: string;
  };
}

export default async function Products(props: ProductsProps) {
  const { searchParams } = props;
  const data = await searchProducts(searchParams);

  return (
    <div>
      <ProductsContent initialData={data} />
    </div>
  );
}
