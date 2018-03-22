import Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup
    .string()
    .required('This field is required')
    .min(5, 'Must be greater than 5 characters'),
  description: Yup
    .string()
    .required('This field is required')
    .min(5, 'Must be greater than 5 characters')
  // image: Yup
  //   .mixed()
  //   .test('fileType', 'You cannot upload this type of file!', function(file) {
  //     return file ? includes(['image/jpeg', 'image/png'], file.type) : true;
  //   })
  //   .test('fileSize', 'Image must be smaller than 2MB!', function(file) {
  //     return file ? file.size / 1024 / 1024 < 2 : true;
  //   })
});