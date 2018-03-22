import React from 'react';
import { Formik, Field } from 'formik';
import { Form, Button, notification } from 'antd';
import isEmpty from 'lodash/isEmpty';

import { TextField } from '../general/Fields';
import { validationSchema } from '../../validations/comment';

const FormItem = Form.Item;

const CommentNew = ({ commentForm, bookId, store }) => {
  const openNotification = (type, info, message) => {
    notification[type]({
      message: info,
      description: message
    });
  }
  
  return (
    <Formik
      initialValues={{ content: '', book_id: bookId }}
      validationSchema={validationSchema}
      onSubmit={ async (
        values,
        { setSubmitting, resetForm }
      ) => {
        const response = await store.createComment({ comment: values });
       
        if (response.status !== 201) {
          setSubmitting(false);
          openNotification('error', 'Something went wrong', response.data.message);
        } else {
          setSubmitting(false);
          openNotification('success', 'Great news!', 'Your comment has been created successfully');
          resetForm();
        }
      }}
      render={({
        values,
        isSubmitting,
        handleSubmit,
        dirty,
        errors,
        status
      }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            autosize={{ minRows: 3, maxRows: 6 }} 
            value={values.content}
            name="content" 
            component={TextField} 
            placeholder="Leave a comment here!" 
          />
          <FormItem>
            <Button 
              type="primary" 
              loading={isSubmitting} 
              ghost 
              htmlType="submit"
              disabled={isSubmitting || !dirty || !isEmpty(errors)}>
              Submit comment!
            </Button>
          </FormItem>
        </Form> 
      )}
    />
  );
}

export default CommentNew;