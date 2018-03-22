import React from 'react';
import { observer } from 'mobx-react';
import { Formik, Field } from 'formik';
import moment from 'moment';
import { Modal, Button, Row, Col } from 'antd';
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

const BookEdit = ({
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
  
  const book = store.book.data;
  
  return (
    <Formik
      initialValues={{
        title: book.title,
        description: book.description,
        price: book.price,
        released_on: moment(book.released_on),
        tag_ids: store.tags,
        file: null
      }}
      validationSchema={validationSchema}
      onSubmit={ async (
        values,
        { setSubmitting, resetForm }
      ) => {
        const response = await store.updateBook(book.id, { book: values });

        if (response.status !== 200) {
          setSubmitting(false);
          openNotification('error', 'Something went wrong', response.data.message);
        } else {
          setSubmitting(false);
          openNotification('success', 'Great news!', 'Your book has been updated successfully');
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
          title={book.title}
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
            value={values.title}
            name="title" 
            component={InputField} 
            placeholder="Title" 
          />
          <Field
            rows={5}
            value={values.description}
            name="description" 
            component={TextField} 
            placeholder="Description" 
          />
          <Field
            value={values.price}
            name="price" 
            min={0}
            step={0.1}
            component={NumField}
            onChange={value => setFieldValue('price', value)}
            placeholder="Price" 
          />
          <Field
            value={values.released_on}
            name="released_on"
            component={DateField}
            onChange={(date, dateString) => setFieldValue('released_on', date)}
            onBlur={(date, dateString) => setFieldValue('released_on', dateString)}
            placeholder="Released On" 
          />
          <Field
            defaultValue={values.tag_ids}
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
          <Row>
            <Col span={8}>
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
            </Col>
            <Col span={10}>
              {book.image &&
                <img 
                src={store.imageUrl(book.image, store.book)}
                width="120"
                className="form-img" 
                alt="Book preview" />
              }
            </Col>
          </Row>
        </Modal> 
      )}
    />
  );
}

export default BookForm(observer(BookEdit));