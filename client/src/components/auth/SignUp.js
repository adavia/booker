import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Formik, Field } from 'formik';
import { Form, Button, notification } from 'antd';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { InputField } from '../general/Fields';
import { validationSchema } from '../../validations/user'

const FormItem = Form.Item;

class SignUp extends Component {
  render() {
    const openNotification = (type, info, message) => {
      notification[type]({
        message: info,
        description: message
      });
    }

    return (
      <div className="centered-form">
        <h1>Sign Up to Booker</h1>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            password_confirmation: ''
          }}
          validationSchema={validationSchema}
          onSubmit={ async (
            values,
            { setSubmitting }
          ) => {
            const response = await this.props.authStore.signup({ user: values });

            if (response.status !== 201) {
              openNotification('error', 'Something went wrong', response.data.message);
              setSubmitting(false);
            } else {
              setSubmitting(false);
              this.props.history.push('/');
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
                value={values.username}
                name="username" 
                component={InputField} 
                placeholder="Username" 
              />
              <Field
                value={values.email}
                name="email" 
                component={InputField} 
                placeholder="Email" 
              />
              <Field 
                value={values.password}
                name="password" 
                type="password"
                component={InputField} 
                placeholder="Password" 
              />
              <Field 
                value={values.password_confirmation}
                name="password_confirmation" 
                type="password"
                component={InputField} 
                placeholder="Password confirmation" 
              />
              <FormItem>
                <Button 
                  type="primary" 
                  loading={isSubmitting} 
                  ghost 
                  htmlType="submit"
                  disabled={isSubmitting || !dirty || !isEmpty(errors)}>
                  Sign Up
                </Button>
                Or <Link to="/auth/signin">login now!</Link>
              </FormItem>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default inject('authStore')(SignUp);
