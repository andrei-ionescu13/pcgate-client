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

interface PasswordChangeDialogProps {
  open: boolean;
  onClose: () => void;
}

export const PasswordChangeDialog: FC<PasswordChangeDialogProps> = (props) => {
  const { open, onClose } = props;
  const formik = useFormik({
    initialValues: {
      confirmNewPassword: '',
      newPassword: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object().shape({
      confirmNewPassword: Yup.string().max(255).oneOf([Yup.ref('newPassword')], 'Passwords must match').required('Confirm new password is required'),
      newPassword: Yup.string().max(255).required('New password is required'),
      password: Yup.string().max(255).required('Old password is required'),
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
        Change Password
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            name="password"
            onChange={formik.handleChange}
            size="small"
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
            fullWidth
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            label="New Password"
            name="newPassword"
            onChange={formik.handleChange}
            size="small"
            type="password"
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            error={Boolean(formik.touched.confirmNewPassword && formik.errors.confirmNewPassword)}
            fullWidth
            helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
            label="Confirm Password"
            name="confirmNewPassword"
            onChange={formik.handleChange}
            size="small"
            type="confirmNewPassword"
            value={formik.values.confirmNewPassword}
            onBlur={formik.handleBlur}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
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
