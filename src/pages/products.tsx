import { useState, useEffect } from 'react';
import type { FC, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import { FilterAccordion } from '../components/filter-accordion';
import { ProductCard } from '../components/product-card';
import { useGetQueryProducts } from 'api/products';
import { usePrevious } from '../hooks/use-previous';
import { ProductsMenu } from 'components/products/products-menu';

export interface OptionI {
  label: string;
  value: string | number;
}

const items = [
  {
    field: {
      name: 'os',
      label: 'Operating System'
    },
    items: [
      {
        value: 'windows',
        label: 'Windows'
      },
      {
        value: 'mac',
        label: 'Mac'
      },
      {
        value: 'linux',
        label: 'Linux'
      }
    ]
  },
  {
    field: {
      name: 'drm',
      label: 'Platform'
    },
    items: [
      {
        value: 'steam',
        label: 'Steam'
      },
      {
        value: 'uplay',
        label: 'Uplay'
      },
      {
        value: 'origin',
        label: 'Origin'
      },
      {
        value: 'epic-games',
        label: 'Epic Games'
      },
      {
        value: 'drm-free',
        label: 'Drm free'
      },
      {
        value: 'gog',
        label: 'Gog'
      },
      {
        value: 'bethesda',
        label: 'Bethesda'
      },
      {
        value: 'rockstar',
        label: 'Rockstar'
      }
    ]
  },
  {
    field: {
      name: 'genres',
      label: 'Genres'
    },
    items: [
      {
        value: 'Indie',
        label: 'Indie'
      },
      {
        value: 'Action',
        label: 'Action'
      },
      {
        value: 'Adventure',
        label: 'Adventure'
      },
      {
        value: 'Strategy',
        label: 'Strategy'
      },
      {
        value: 'Simulation',
        label: 'Simulation'
      },
      {
        value: 'Roleplaying',
        label: 'Roleplaying'
      },
      {
        value: 'Casual',
        label: 'Casual'
      },
      {
        value: 'Sports',
        label: 'Sports'
      },
      {
        value: 'Racing',
        label: 'Racing'
      },
      {
        value: 'Shooter',
        label: 'Shooter'
      },
      {
        value: 'Anime',
        label: 'Anime'
      },
      {
        value: 'Massively multiplayer',
        label: 'Massively multiplayer'
      }
    ]
  }
];

const sortByOptions: OptionI[] = [
  {
    label: 'Release Date',
    value: 'release -1'
  },
  {
    label: 'Top Discounts',
    value: 'current_discount.percent -1'
  },
  {
    label: 'Price (low-high)',
    value: 'currentPrice.USD 1'
  },
  {
    label: 'Price (high-low)',
    value: 'currentPrice.USD -1'
  },
];

const showOptions: OptionI[] = [
  {
    label: '6 Results',
    value: 6
  },
  {
    label: '12 Results',
    value: 12
  },
  {
    label: '24 Results',
    value: 24
  }
];

export const Products: FC = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const [page, setPage] = useState<number>(Number.parseInt(searchParams.get('page') as string) || 1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, OptionI>>({
    sortBy: sortByOptions[0],
    show: showOptions[0]
  });
  const [os, setOs] = useState(searchParams.getAll('os'));
  const [drm, setDrm] = useState(searchParams.getAll('drm'));
  const [genres, setGenres] = useState(searchParams.getAll('genres'));
  const [features, setFeatures] = useState(searchParams.getAll('features'));
  const [query, setQuery] = useState(searchParams.get('query'));
  const { data, isLoading: loading } = useGetQueryProducts({
    query,
    skip: (page - 1) * (selectedOptions.show.value as number),
    limit: selectedOptions.show.value,
    os,
    drm,
    genres,
    features,
    sortBy: (selectedOptions.sortBy.value as string).split(' ')[0],
    sort: (selectedOptions.sortBy.value as string).split(' ')[1],
  });
  const previousTotalCount = usePrevious(data?.counts?.totalCount);

  const navigateToPage = (newPage: number): void => {
    searchParams.set('page', JSON.stringify(newPage));
    navigate(pathname + '?' + searchParams.toString());
  };

  const handleSelectedOptionsChange = (type: string, option: OptionI): void => {
    setSelectedOptions((prevValues) => ({
      ...prevValues,
      [type]: option
    }));
    navigateToPage(1);
  };

  const handlePaginate = (event: ChangeEvent<unknown>, newPage: number) => {
    navigateToPage(newPage);
  };

  useEffect(() => {
    setPage(Number.parseInt(searchParams.get('page') as string) || 1);
    setOs(searchParams.getAll('os'));
    setDrm(searchParams.getAll('drm'));
    setQuery(searchParams.get('query'));
    setGenres(searchParams.getAll('genres'));
    setFeatures(searchParams.getAll('features'));
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Store</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: 5
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              alignItems: {
                md: 'center',
                xs: 'flex-start'
              },
              display: 'flex',
              flexDirection: {
                md: 'row',
                xs: 'column'
              }
            }}
          >
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Search results
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mt: {
                  md: 0,
                  xs: 2
                }
              }}
            >
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Sort by:
              </Typography>
              <ProductsMenu
                options={sortByOptions}
                selectedOption={selectedOptions.sortBy}
                type="sortBy"
                onClick={handleSelectedOptionsChange}
              />
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Show:
              </Typography>
              <ProductsMenu
                onClick={handleSelectedOptionsChange}
                options={showOptions}
                selectedOption={selectedOptions.show}
                type="show"
              />
            </Box>
          </Box>
          <Grid
            container
            spacing={3}
            sx={{ mt: 6 }}
          >
            <Grid
              item
              md={3}
              xs={12}
            >
              {items.map((item) => (
                <FilterAccordion
                  key={item.field.name}
                  sx={{
                    '& + &': {
                      mt: 0.25
                    }
                  }}
                  {...item}
                />
              ))}
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              md={9}
              sx={{ height: 'fit-content' }}
              xs={12}
            >
              <Grid
                container
                item
                spacing={3}
                xs={12}
              >
                {loading && Array(selectedOptions.show.value).fill(1).map((_, index) => (
                  <Grid
                    item
                    key={index}
                    lg={4}
                    sm={6}
                    xs={12}
                  >
                    <ProductCard loading />
                  </Grid>
                ))}
                {!loading && data?.products.map((product) => (
                  <Grid
                    item
                    key={product._id}
                    lg={4}
                    sm={6}
                    xs={12}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 10
                }}
                xs={12}
              >
                {((data && data.counts?.totalCount > 0) || (loading && previousTotalCount > 0)) && (
                  <Pagination
                    color="primary"
                    count={Math.ceil((data?.counts?.totalCount || previousTotalCount) / (selectedOptions.show.value as number))}
                    onChange={handlePaginate}
                    page={page}
                    shape="rounded"
                  />
                )}
                {!loading && data?.products.length === 0 && (
                  <Typography
                    color="textPrimary"
                    variant="subtitle1"
                  >
                    We couldn't find any results for you.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
