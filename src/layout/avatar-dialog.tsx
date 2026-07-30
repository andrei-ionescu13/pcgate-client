import { DialogAlert } from '@/components/dialog-alert';
import { Dropzone, type DropzoneFile } from '@/components/dropzone';
import { useAuth } from '@/contexts/auth-context';
import { appFetch } from '@/utils/app-fetch';
import { buildFormData } from '@/utils/build-form-data';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export const useUpdateAvatar = () =>
  useMutation<string, Error, BodyInit>({
    mutationFn: (values) =>
      appFetch({
        url: '/auth/avatar',
        config: {
          body: values,
          method: 'PUT',
        },
        withAuth: true,
      }),
  });

interface AvatarDialogProps {
  onClose: () => void;
}

export const AvatarDialog = ({ onClose }: AvatarDialogProps) => {
  const { updateUser } = useAuth();
  const [avatar, setAvatar] = useState<DropzoneFile>();
  const updateAvatar = useUpdateAvatar();

  const handleSubmit = () => {
    const formData = buildFormData({ avatar });
    updateAvatar.mutate(formData, {
      onSuccess: (data) => {
        updateUser({ avatar: data });
        onClose();
      },
      onError(error, variables, context) {
        toast.error(error.message);
      },
    });
  };

  return (
    <DialogAlert
      open
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Avatar"
      isLoading={updateAvatar.isPending}
    >
      <Dropzone
        file={avatar}
        onDrop={(file: DropzoneFile) => setAvatar(file)}
        placeholder="Select your avatar"
      />
    </DialogAlert>
  );
};
