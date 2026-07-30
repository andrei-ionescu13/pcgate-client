import { FilterCardCheckbox } from './filter-card-checkbox';
import { FilterCardRange } from './filter-card-range';

export type FilterOptions = Array<{ name: string; count: number }>;

interface ProductsFiltersProps {
  platforms: FilterOptions;
  genres: FilterOptions;
  publishers: FilterOptions;
  developers: FilterOptions;
  features: FilterOptions;
  operatingSystems: FilterOptions;
}

export const ProductsFilters = ({
  platforms,
  genres,
  publishers,
  developers,
  features,
  operatingSystems,
}: ProductsFiltersProps) => {
  return (
    <div className="flex flex-col gap-6">
      <FilterCardRange
        field="price"
        minOption={0}
        maxOption={900}
        title="Price"
      />
      <FilterCardCheckbox
        field="os"
        title="Os"
        items={operatingSystems.map((os) => ({
          label: os.name,
          value: os.name.toLowerCase(),
          count: os.count,
        }))}
      />
      <FilterCardCheckbox
        field="platforms"
        title="Platforms"
        items={platforms.map((platform) => ({
          label: platform.name,
          value: platform.name.toLowerCase(),
          count: platform.count,
        }))}
      />
      <FilterCardCheckbox
        field="genres"
        title="Genres"
        items={genres.map((genre) => ({
          label: genre.name,
          value: genre.name.toLowerCase(),
          count: genre.count,
        }))}
      />
      <FilterCardCheckbox
        field="publishers"
        title="Publishers"
        items={publishers.map((publisher) => ({
          label: publisher.name,
          value: publisher.name.toLowerCase(),
          count: publisher.count,
        }))}
      />
      <FilterCardCheckbox
        field="developers"
        title="Developers"
        items={developers.map((developer) => ({
          label: developer.name,
          value: developer.name.toLowerCase(),
          count: developer.count,
        }))}
      />
      <FilterCardCheckbox
        field="features"
        title="Features"
        items={features.map((feature) => ({
          label: feature.name,
          value: feature.name.toLowerCase(),
          count: feature.count,
        }))}
      />
    </div>
  );
};
