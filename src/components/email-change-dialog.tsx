import type { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from '@mui/material';

interface EmailChangeDialogProps {
  open: boolean;
  onClose: () => void;
}

export const EmailChangeDialog: FC<EmailChangeDialogProps> = (props) => {
  const { open, onClose } = props;
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().max(255).email().required('Email is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
      } catch (err) {
        console.error(err);
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
    >
      <DialogTitle>
        Change Email
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            error={Boolean(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            label="Email address"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            size="small"
            type="email"
            value={formik.values.email}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="white"
          onClick={onClose}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => { formik.handleSubmit(); }}
          variant="contained"
        >
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
};
