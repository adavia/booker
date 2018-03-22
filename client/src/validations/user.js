import Yup from 'yup';
import request from '../utils/config';

export const validationSchema = Yup.object().shape({
  username: Yup
    .string()
    .required('This field is required')
    .matches(/^[a-z0-9]+$/i, 'Must contain letters and numbers only')
    .min(3, 'Must be greater than 3 characters')
    .max(25, 'Must be less than 25 characters')
    .test('uniqueUsername', 'Has already been taken!', async (value) => {
      if (value) {
        const resp = await request.get(`users/unique?field=${value}`);

        return !resp.data;
      }
    }),
  email: Yup
    .string()
    .required('This field is required')
    .email('Must be a valid email address')
    .test('uniqueEmail', 'Has already been taken!', async (value) => {
      if (value) {
        const resp = await request.get(`users/unique?field=${value}`);

        return !resp.data;
      }
    }),
  password: Yup
    .string()
    .required('This field is required')
    .min(5, 'Must be greater than 5 characters')
    .max(100, 'Must be less than 100 characters'),
  password_confirmation: Yup
    .string()
    .required('Password confirmation is required')
    .test('match', 'Passwords do not match', function(value) {
      return value === this.options.parent.password
    })
});
