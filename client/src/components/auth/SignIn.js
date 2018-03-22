import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Formik, Field } from 'formik';
import { Form, Button, notification } from 'antd';
import { Link } from 'react-router-dom';

import { InputField } from '../general/Fields';

const FormItem = Form.Item;

class SignIn extends Component {
  render() {
    const openNotification = (type, info, message) => {
      notification[type]({
        message: info,
        description: message
      });
    }

    return (
      <div className="centered-form">
        <h1>Sign In to the app</h1>
        <Formik
          initialValues={{
            email: '', 
            password: ''
          }}
          onSubmit={ async (
            values, 
            { setSubmitting }) 
          => {
            const response = await this.props.authStore.signin({ authentication: values });

            if (response.status !== 200) {
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
            status
          }) => (
            <Form onSubmit={handleSubmit}>
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
              <FormItem>
                <Button 
                  type="primary" 
                  loading={isSubmitting} 
                  ghost 
                  htmlType="submit"
                  disabled={isSubmitting || !dirty}>
                  Sign In
                </Button>
                Or <Link to="/auth/signup">register now!</Link>
              </FormItem>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default inject('authStore')(SignIn);