import { DialogAlert, DialogAlertProps } from '@/components/dialog-alert';
import { Dropzone, DropzoneFile } from '@/components/dropzone';
import { useAuth } from '@/contexts/auth-context';
import { appFetch } from '@/utils/app-fetch';
import { buildFormData } from '@/utils/build-form-data';
import { useMutation } from '@tanstack/react-query';
import React, { FC, useState } from 'react'
import { toast } from 'react-toastify';

export const useUpdateAvatar = () => useMutation<string, Error, BodyInit>((values) => appFetch({
  url: '/auth/avatar',
  noContentType: true,
  config: {
    body: values,
    method: 'PUT'
  },
  withAuth: true
}));


interface AvatarDialogProps {
  onClose: () => void;
}

export const AvatarDialog: FC<AvatarDialogProps> = (props) => {
  const { onClose } = props;
  const { updateUser } = useAuth();
  const [avatar, setAvatar] = useState<DropzoneFile>();
  const updateAvatar = useUpdateAvatar();

  const handleSubmit = () => {
    const formData = buildFormData({ avatar });
    updateAvatar.mutate(formData, {
      onSuccess: (data) => {
        updateUser({ avatar: data })
        onClose()
      },
      onError(error, variables, context) {
        toast.error(error.message)
      },
    });
  }

  return (
    <DialogAlert
      open
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Avatar"
      isLoading={updateAvatar.isLoading}
    >
      <Dropzone
        file={avatar}
        onDrop={(file: DropzoneFile) => setAvatar(file)}
        placeholder="Select your avatar"
      />
    </DialogAlert>
  )
}
