import { useState, useEffect } from 'react';
import type { FC, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Grid,
  MenuItem,
  Pagination,
  TextField,
  Typography,
} from '@material-ui/core';
import { FilterAccordion } from '../components/filter-accordion';
import { ProductCard } from '../components/product-card';
import { useFetch } from '../hooks/use-fetch';
import { usePrevious } from '../hooks/use-previous';
import type { Product } from '../types/product';

interface ProductsStateData {
  products: Product[];
  counts: {
    totalCount: number;
  }
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

const sortByOptions = [
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

const showOptions = [
  {
    label: '6 Results',
    value: 6
  },
  {
    label: '24 Results',
    value: 24
  },
  {
    label: '36 Results',
    value: 36
  },
  {
    label: '48 Results',
    value: 48
  },
  {
    label: '60 Results',
    value: 60
  }
];

export const Search: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState<number>(Number.parseInt(searchParams.get('page') as string) || 1);
  const [values, setValues] = useState({
    sortBy: sortByOptions[0].value,
    show: showOptions[0].value
  });
  const [os, setOs] = useState(searchParams.getAll('os'));
  const [drm, setDrm] = useState(searchParams.getAll('drm'));
  const [genres, setGenres] = useState(searchParams.getAll('genres'));
  const [features, setFeatures] = useState(searchParams.getAll('features'));
  const [query, setQuery] = useState(searchParams.get('query'));
  const [data, loading] = useFetch<ProductsStateData>('/products/', {
    method: 'POST',
    body: JSON.stringify({
      query,
      skip: (page - 1) * values.show,
      limit: values.show,
      os,
      drm,
      genres,
      features,
      sortBy: values.sortBy.split(' ')[0],
      sort: values.sortBy.split(' ')[1],
    })
  }, [page, values.sortBy, values.show, os, drm, query, genres, features]);
  const previousTotalCount = usePrevious(data?.counts?.totalCount);

  const navigateToPage = (newPage: number): void => {
    searchParams.set('page', JSON.stringify(newPage));
    navigate(location.pathname + '?' + searchParams.toString());
  };

  const handleValuesChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value
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
    window.scrollTo({ top: 0 });
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
                display: 'grid',
                gridTemplateColumns: {
                  sm: '1fr 2fr 1fr 2fr',
                  xs: '1fr 2fr'
                },
                alignItems: 'center',
                gap: 2.5,
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
              <TextField
                name="sortBy"
                onChange={handleValuesChange}
                select
                size="small"
                sx={{
                  borderRadius: 1,
                  minWidth: 150
                }}
                value={values.sortBy}
              >
                {sortByOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Show:
              </Typography>
              <TextField
                name="show"
                onChange={handleValuesChange}
                select
                size="small"
                sx={{
                  borderRadius: 1,
                  minWidth: 150
                }}
                value={values.show}
              >
                {showOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
                {loading && Array(values.show).fill(1).map((_, index) => (
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
                    count={Math.ceil((data?.counts?.totalCount || previousTotalCount) / values.show)}
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
