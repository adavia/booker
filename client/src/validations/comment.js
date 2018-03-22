import Yup from 'yup';

export const validationSchema = Yup.object().shape({
  content: Yup
    .string()
    .required('This field is required')
});