import React from 'react';
import { Formik, Field } from 'formik';
import moment from 'moment';
import { Modal, Button } from 'antd';
import isEmpty from 'lodash/isEmpty';

import BookForm from './BookForm';

import { 
  InputField, 
  TextField, 
  NumField, 
  SelectField, 
  DateField, 
  UploadField 
} from '../general/Fields';

const BookNew = ({
  history,
  store,
  form,
  showModal,
  validFile,
  fileChange,
  loadTags,
  openNotification,
  validationSchema
}) => {
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        price: null,
        released_on: moment(),
        tag_ids: [],
        file: null
      }}
      validationSchema={validationSchema}
      onSubmit={ async (
        values,
        { setSubmitting, resetForm }
      ) => {
        const response = await store.createBook({ book: values });

        if (response.status !== 201) {
          setSubmitting(false);
          openNotification('error', 'Something went wrong', response.data.message);
        } else {
          setSubmitting(false);
          openNotification('success', 'Great news!', 'Your book has been created successfully');
          resetForm();
        }
      }}
      render={({
        values,
        isSubmitting,
        handleSubmit,
        setFieldValue,
        setFieldError,
        dirty,
        errors,
        status
      }) => (
        <Modal
          title="Add a new book to your list"
          visible={form.visible}
          afterClose={() => history.goBack()}
          onCancel={showModal}
          footer={[
            <Button 
              key="back" 
              onClick={showModal}>
              Return
            </Button>,
            <Button 
              key="submit" 
              type="primary" 
              loading={isSubmitting} 
              onClick={handleSubmit}
              disabled={isSubmitting || !dirty || !isEmpty(errors)}>
              Submit
            </Button>
          ]}>
          <Field 
            name="title" 
            component={InputField} 
            placeholder="Title" 
          />
          <Field
            rows={5}
            name="description" 
            component={TextField} 
            placeholder="Description" 
          />
          <Field
            name="price" 
            min={0}
            step={0.1}
            component={NumField}
            onChange={value => setFieldValue('price', value)}
            placeholder="Price" 
          />
          <Field
            name="released_on"
            component={DateField}
            onChange={(date, dateString) => setFieldValue('released_on', date)}
            onBlur={(date, dateString) => setFieldValue('released_on', dateString)}
            placeholder="Released On" 
          />
          <Field
            value={values.tag_ids}
            name="tag_ids"
            style={{ width: '100%' }}
            tags={form.tags}
            labelInValue={true}
            mode="multiple"
            component={SelectField}
            onSearch={value => loadTags(value)}
            onChange={value => setFieldValue('tag_ids', value)}
            onBlur={value => setFieldValue('tag_ids', value)}
            filterOption={false}
            placeholder="Please select a tag"
          />
          <Field
            name="file"
            listType="picture-card"
            showUploadList={false}
            action="http://localhost:3001/books/upload"
            headers={{Authorization: localStorage.getItem('token')}}
            component={UploadField}
            uploading={form.uploading}
            thumb={form.thumb}
            beforeUpload={validFile}
            onChange={info => fileChange(info, setFieldValue)}
          />
        </Modal> 
      )}
    />
  );
}

export default BookForm(BookNew);