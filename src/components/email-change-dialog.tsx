import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import type { FC } from 'react';
import * as Yup from 'yup';
import { DialogAlert } from './dialog-alert';

interface EmailChangeDialogProps {
  open: boolean;
  onClose: () => void;
}

export const EmailChangeDialog: FC<EmailChangeDialogProps> = (props) => {
  const { open, onClose } = props;
  const formik = useFormik({
    initialValues: {
      email: '',
      submit: null,
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
    },
  });

  return (
    <DialogAlert
      onClose={onClose}
      open={open}
      title="Change Email"
      onSubmit={() => {
        formik.handleSubmit();
      }}
    >
      <div className="mb-4">
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
      </div>
    </DialogAlert>
  );
};
