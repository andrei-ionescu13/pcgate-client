import type { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Dialog,
  FormHelperText,
  TextField,
  Typography,
  Rating,
  IconButton
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { X as XIcon } from '@/icons/x';
import type { Review, ReviewsSummary } from '@/types/product';
import { useAddProductReview } from 'api/products';

interface ProductReviewDialogProps {
  onClose: () => void;
  onSubmit: (reviews: Review[], reviewsSummary: ReviewsSummary) => void;
  open: boolean;
  productId: string;
}

export const ProductReviewDialog: FC<ProductReviewDialogProps> = (props) => {
  const { open, onClose, productId, onSubmit } = props;
  const { mutate, isLoading } = useAddProductReview();
  const formik = useFormik({
    initialValues: {
      text: '',
      displayName: '',
      recommended: undefined,
      rating: undefined,
      submit: undefined,
      title: ''
    },
    validationSchema: Yup.object().shape({
      text: Yup.string().min(5).max(1024).required('Review is required'),
      displayName: Yup.string().max(255).required('Display Name is required'),
      recommended: Yup.bool().typeError('Please tell us if you would recommend this game').required('Please tell us if you would recommend this game'),
      rating: Yup.number().typeError('Overall Rating is required').min(0).max(5).required('Overall Rating is required'),
      title: Yup.string().max(255).required('Title is required')
    }),
    onSubmit: async (values, helpers) => {
      mutate({ ...values, productId }, {
        onSuccess: (data) => {
          onSubmit(data.reviews, data.reviewsSummary);
          helpers.setStatus({ success: true });
          helpers.resetForm();
          onClose();
        }
      });
    }
  });

  return (
    <Dialog
      onClose={
        () => {
          onClose();
          formik.resetForm();
        }
      }
      open={open}
      PaperProps={{
        sx: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          maxWidth: 900,
          minHeight: 620,
          position: 'relative',
          width: '100%'
        }
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          color: '#fff',
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 200
        }}
      >
        <XIcon />
      </IconButton>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          p: 3
        }}
      >
        <Typography
          color="textPrimary"
          sx={{ mb: 4 }}
          variant="h4"
        >
          Write a Review
        </Typography>
        <Box
          sx={{
            alignItems: 'start',
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
            mb: 2
          }}
        >
          <Box>
            <Typography
              color="textPrimary"
              variant="body2"
            >
              Overall Rating
            </Typography>
          </Box>
          <Box>
            <Typography
              color="textPrimary"
              variant="body2"
            >
              Would you recommend this game?
            </Typography>
          </Box>
          <Box>
            <Rating
              size="large"
              value={formik.values.rating || 0}
              onChange={(event, newValue) => {
                formik.setFieldValue('rating', newValue);
              }}
            />
            {Boolean(formik.touched.rating && formik.errors.rating) && (
              <FormHelperText error>
                {formik.errors.rating}
              </FormHelperText>
            )}
          </Box>
          <Box>
            <Box sx={{ display: 'flex' }}>
              <Button
                fullWidth
                onClick={() => { formik.setFieldValue('recommended', true); }}
                sx={{
                  backgroundColor: (theme) =>
                    formik.values.recommended
                      ? 'success.main'
                      : theme.palette.mode === 'light' ? '#B0B0B0' : 'primary.main',
                  borderRadius: 'unset',
                  mr: 2,
                  '&:hover': {
                    backgroundColor: 'success.main',
                  }
                }}
                type="button"
                variant="contained"
              >
                Yes
              </Button>
              <Button
                onClick={() => { formik.setFieldValue('recommended', false); }}
                fullWidth
                sx={{
                  backgroundColor: (theme) =>
                    (formik.values.recommended !== undefined && !formik.values.recommended)
                      ? 'error.main'
                      : theme.palette.mode === 'light' ? '#B0B0B0' : 'primary.main',
                  borderRadius: 'unset',
                  '&:hover': {
                    backgroundColor: 'error.main',
                  }
                }}
                type="button"
                variant="contained"
              >
                No
              </Button>
            </Box>
            {Boolean(formik.touched.recommended && formik.errors.recommended) && (
              <FormHelperText error>
                {formik.errors.recommended}
              </FormHelperText>
            )}
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            error={Boolean(formik.touched.displayName && formik.errors.displayName)}
            fullWidth
            helperText={formik.touched.displayName && formik.errors.displayName}
            label="Display Name"
            name="displayName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="small"
            value={formik.values.displayName}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            error={Boolean(formik.touched.title && formik.errors.title)}
            fullWidth
            helperText={formik.touched.title && formik.errors.title}
            label="Review Title"
            name="title"
            onChange={formik.handleChange}
            size="small"
            value={formik.values.title}
            onBlur={formik.handleBlur}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            error={Boolean(formik.touched.text && formik.errors.text)}
            fullWidth
            helperText={formik.touched.text && formik.errors.text}
            label="What did you think of the game?"
            maxRows={8}
            minRows={4}
            multiline
            name="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="small"
            value={formik.values.text}
          />
        </Box>
        <Button
          color="primary"
          disabled={isLoading}
          size="large"
          sx={{ my: 3 }}
          type="submit"
          variant="contained"
        >
          Submit Review
        </Button>
        {Boolean(formik.errors.submit) && (
          <FormHelperText error>
            {formik.errors.submit}
          </FormHelperText>
        )}
      </Box>
      <Box
        sx={{
          backgroundImage: 'url("https://fanatical.imgix.net/assets/backgrounds/auth/login-bg-jedi-fallen-order.jpg?auto=compress,format&dpr=1&fit=clip&h=450&w=366&q=70")',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          borderBottomRightRadius: (theme: Theme) => theme.shape.borderRadius,
          borderTopRightRadius: (theme: Theme) => theme.shape.borderRadius,
          display: {
            md: 'block',
            xs: 'none'
          },
          position: 'relative',
          width: 360
        }}
      >
        <Box
          sx={{
            backgroundColor: '#263238',
            borderBottomRightRadius: (theme: Theme) => theme.shape.borderRadius,
            borderTopRightRadius: (theme: Theme) => theme.shape.borderRadius,
            height: '100%',
            opacity: 0.7,
            position: 'absolute',
            width: '100%',
            zIndex: 10
          }}
        />
        <Box
          sx={{
            alignItems: 'center',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            p: 2,
            position: 'absolute',
            width: '100%',
            zIndex: 100
          }}
        >
          <Typography
            align="center"
            color="inherit"
            variant="h5"
          >
            REVIEW GUIDELINES
          </Typography>
          <Typography
            sx={{ mt: 1 }}
            align="center"
            color="inherit"
            variant="subtitle2"
          >
            Please let us know what you like or don’t like about this product and why
          </Typography>
          <ul>
            {[
              'At least 30 characters',
              'Focus on this item rather than our site or service',
              'No competitor information or link',
              'Keep it clean!'
            ].map((item) => (
              <li key={item}>
                <Typography
                  color="inherit"
                  variant="body2"
                >
                  {item}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Dialog>
  );
};
