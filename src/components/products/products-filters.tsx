import type { FC } from "react";
import { Box } from "@mui/material";
import { FilterCardCheckbox } from "@/components/filter-card-checkbox";
import { FilterCardRange } from "@/components/filter-card-range";
import type { Genre, Platform } from "@/types/common";
import { Publisher } from "@/types/publishers";
import { Developer } from "@/types/developer";
import { Feature } from "@/types/feature";
import { OperatingSystem } from "@/types/operating-system";

interface ProductsFiltersProps {
  platforms: Platform[];
  genres: Genre[];
  publishers: Publisher[];
  developers: Developer[];
  features: Feature[];
  operatingSystems: OperatingSystem[];
}

export const ProductsFilters: FC<ProductsFiltersProps> = (props) => {
  const {
    platforms,
    genres,
    publishers,
    developers,
    features,
    operatingSystems,
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <FilterCardRange field="price" min={0} max={900} title="Price" />
      <FilterCardCheckbox
        field="os"
        title="Os"
        items={operatingSystems.map((os) => ({
          label: os.name,
          value: os.name.toLowerCase(),
        }))}
      />
      <FilterCardCheckbox
        field="platforms"
        title="Platforms"
        items={platforms.map((platform) => ({
          label: platform.name,
          value: platform.name.toLowerCase(),
        }))}
      />
      <FilterCardCheckbox
        field="genres"
        title="Genres"
        items={genres.map((genre) => ({
          label: genre.name,
          value: genre.name.toLowerCase(),
        }))}
      />
      <FilterCardCheckbox
        field="publishers"
        title="Publishers"
        items={publishers.map((publisher) => ({
          label: publisher.name,
          value: publisher.name.toLowerCase(),
        }))}
      />
      <FilterCardCheckbox
        field="developers"
        title="Developers"
        items={developers.map((developer) => ({
          label: developer.name,
          value: developer.name.toLowerCase(),
        }))}
      />
      <FilterCardCheckbox
        field="features"
        title="Features"
        items={features.map((feature) => ({
          label: feature.name,
          value: feature.name.toLowerCase(),
        }))}
      />
    </Box>
  );
};
