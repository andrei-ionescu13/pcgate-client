import { useState } from 'react';
import type { FC } from 'react';
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { SearchInput } from '../components/search-input';
import { LibraryProduct } from '../components/library/library-product';

interface Values {
  sortBy: string;
  type: string;
  os: string;
  hideRevealed: boolean;
  query: string;
}

interface SelectFiels {
  field: 'sortBy' | 'type' | 'os';
  label: string;
  options: Array<{ label: string; value: string; }>;
}

const selectFields: SelectFiels[] = [
  {
    field: 'sortBy',
    label: 'Sort By',
    options: [
      {
        label: 'Top Sellers',
        value: 'top-sellers'
      },
      {
        label: 'Latest Deals',
        value: 'latest-deals'
      }
    ]
  },
  {
    field: 'type',
    label: 'Product Type',
    options: [
      {
        label: 'All',
        value: 'all'
      },
      {
        label: 'Game',
        value: 'game'
      },
      {
        label: 'DLC',
        value: 'dlc'
      },
      {
        label: 'Book',
        value: 'book'
      },
      {
        label: 'Software',
        value: 'software'
      }
    ]
  },
  {
    field: 'os',
    label: 'Operating System',
    options: [
      {
        label: 'All',
        value: 'all'
      },
      {
        label: 'Windows',
        value: 'windows'
      },
      {
        label: 'Mac',
        value: 'mac'
      },
      {
        label: 'Linux',
        value: 'linux'
      }
    ]
  }
]

export const Library: FC = (props) => {
  const [values, setValues] = useState<Values>({
    sortBy: selectFields[0].options[0].value,
    type: selectFields[1].options[1].value,
    os: selectFields[2].options[2].value,
    hideRevealed: false,
    query: ''
  });

  const handleValuesChange = (field: string, value: string | boolean): void => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }))
  }

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: {
              md: 5,
              xs: 2
            }
          }}
        >
          <Typography
            color="textPrimary"
            sx={{ mb: 10 }}
            variant="h4"
          >
            Product Library
          </Typography>
          <Box
            sx={{
              alignItems: 'flex-end',
              display: 'grid',
              gridTemplateColumns: {
                md: 'repeat(3, 1fr) 2fr',
                sm: 'repeat(3, 1fr)',
                xs: '1fr'
              },
              gap: 2
            }}
          >
            <Box
              sx={{
                gridColumn: '1 / -1'
              }}
            >
              <SearchInput
                onChange={(event) => { handleValuesChange('query', event.target.value) }}
                placeholder="Search product or bundle"
                value={values.query}
              />
            </Box>
            {selectFields.map((selectField) => (
              <Box key={selectField.field}>
                <Typography
                  color="textPrimary"
                  sx={{ mb: 1 }}
                  variant="body2"
                >
                  {selectField.label}
                </Typography>
                <TextField
                  fullWidth
                  name={selectField.field}
                  onChange={(event) => { handleValuesChange(selectField.field, event.target.value) }}
                  select
                  size="small"
                  value={values[selectField.field]}
                >
                  {selectField.options.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            ))}
            <Box
              sx={{
                gridColumn: {
                  md: 'auto',
                  xs: '1 / -1'
                }
              }}
            >
              <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    onChange={(event) => { handleValuesChange('hideRevealed', event.target.checked) }}
                  />
                )}
                label="Hide Revealed"
              />
            </Box>
          </Box>
          <Box
            sx={{
              mt: 5,
              display: 'grid',
              gridAutoFlow: 'row',
              gap: 2
            }}
          >
            {/* <LibraryProduct />
            <LibraryProduct />
            <LibraryProduct /> */}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
