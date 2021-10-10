import { useState } from 'react';
import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Card, CardContent, Chip, Container, Grid, Typography } from '@material-ui/core';
import { BundleCard } from '../components/bundle-card';
import { bundles } from '../__mock__/bundle';

interface Category {
  value: string;
  label: string;
}

const categories: Category[] = [
  {
    value: 'all',
    label: 'All bundles'
  },
  {
    value: 'games',
    label: 'Games'
  },
  {
    value: 'books',
    label: 'Books'
  },
  {
    value: 'software',
    label: 'Software'
  }
];

export const Bundles: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].value);
  const mappedCategories = categories.filter((category) => category.value !== 'all').map((category) => ({
    ...category,
    bundles: bundles.filter((bundle) => bundle.category === category.value)
  }));

  const handleSelectedCategoryChange = (category: string): void => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Helmet>
        <title>Bundles</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          py: 5
        }}
      >
        <Container maxWidth="lg">
          <Typography
            color="textPrimary"
            variant="h3"
          >
            Bundles
          </Typography>
          <Typography
            color="textSecondary"
            sx={{
              maxWidth: 800,
              mt: 2,
              mb: 8
            }}
            variant="body1"
          >
            Our Bundles are limited-time collections of games, books, software, and more. Simply pay what you want and choose where your money goes, including to charity. Most Bundles come in tiers starting at only $1 - the more you give, the more you get!
          </Typography>
          {categories.map((category) => (
            <Chip
              label={category.label}
              onClick={() => { handleSelectedCategoryChange(category.value); }}
              sx={{
                backgroundColor: category.value === selectedCategory ? 'primary.main' : '#fff',
                color: category.value === selectedCategory ? '#fff' : '#000',
                mb: 2,
                ml: 2
              }}
              variant="filled"
            />
          ))}
          <Card>
            <CardContent>
              {mappedCategories
                .filter((category) => selectedCategory === 'all' || category.value === selectedCategory)
                .map((category) => (
                  <Box
                    sx={{
                      '& + &': {
                        mt: 12
                      }
                    }}
                  >
                    <Typography
                      color="textPrimary"
                      sx={{ mb: 3 }}
                      variant="h4"
                    >
                      {category.label}
                    </Typography>
                    <Grid
                      container
                      spacing={3}
                    >
                      {category.bundles.map((bundle) => (
                        <Grid
                          item
                          md={4}
                          sm={6}
                          xs={12}
                        >
                          <BundleCard bundle={bundle} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};
