import { Box } from "@mui/material";
import type { FC } from "react";
import { ProductCard } from "./product-card";
import { ProductCardLine } from "./product-card-line";
import { Product } from "@/types/product";

interface ProductsGridProps {
  products: Product[];
  viewMode?: string;
  isLoading: boolean;
}

export const ProductsGrid: FC<ProductsGridProps> = (props) => {
  const { products, viewMode = "grid", isLoading } = props;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: () =>
          viewMode === "grid"
            ? {
                lg: "repeat(3, 1fr)",
                sm: "repeat(2, 1fr)",
                xs: "1fr",
              }
            : "1fr",
        gap: 2,
        filter: isLoading ? "blur(4px) saturate(100%)" : undefined,
        position: "relative",
      }}
    >
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 999,
          }}
        />
      )}
      {products.map((product) =>
        viewMode === "grid" ? (
          <ProductCard key={product._id} product={product} />
        ) : (
          <ProductCardLine key={product._id} product={product} />
        )
      )}
    </Box>
  );
};
