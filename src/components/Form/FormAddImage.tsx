import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // TODO: testar no form o envio das imgs
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: file => {
          return file.size <= 10000000 || 'O arquivo deve ter no máximo 10MB.';
        },
        acceptedFormats: file => {
          const acceptedFormats = ['image/jpeg', 'image/png', 'image/gif'];
          return (
            acceptedFormats.includes(file.type) ||
            'Selecione um arquivo válido.'
          );
        },
      },
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
    },
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    {
      // TODO ONSUCCESS MUTATION
    }
  );

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          name="image"
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          ref={register(formValidations.image)}
          // TODO SEND IMAGE ERRORS
          // TODO REGISTER IMAGE INPUT WITH VALIDATIONS
        />

        {errors.image && <p>{errors.image}</p>}

        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
        />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
