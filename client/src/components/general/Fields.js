import React from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Upload, Icon } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
 
export const InputField = ({
  field: { name, ...field },
  form: { touched, errors },
  ...props
}) => {
  const error = errors[name];
  const touch = touched[name];
  
  return (
    <FormItem 
      hasFeedback
      validateStatus={touch && error ? 'error' : ''}
      help={touch && error ? error : ''}>
      <Input
        name={name}
        {...field}
        {...props}
      />
    </FormItem>
  );
}

export const TextField = ({
  field: { name, ...field },
  form: { touched, errors },
  ...props
}) => {
  const error = errors[name];
  const touch = touched[name];
  
  return (
    <FormItem 
      hasFeedback
      validateStatus={touch && error ? 'error' : ''}
      help={touch && error ? error : ''}>
      <TextArea
        name={name}
        {...field}
        {...props}
      />
    </FormItem>
  );
}

export const NumField = ({
  field: { name, ...field },
  form: { touched, errors },
  ...props
}) => {
  const error = errors[name];
  const touch = touched[name];
  
  return (
    <FormItem 
      hasFeedback
      validateStatus={touch && error ? 'error' : ''}
      help={touch && error ? error : ''}>
      <InputNumber
        name={name}
        {...field}
        {...props}
      />
    </FormItem>
  );
}

export const DateField = ({
  field: { name, ...field },
  form: { touched, errors },
  ...props
}) => {
  const error = errors[name];
  const touch = touched[name];
  
  return (
    <FormItem 
      hasFeedback
      validateStatus={touch && error ? 'error' : ''}
      help={touch && error ? error : ''}>
      <DatePicker
        {...field}
        {...props}
      />
    </FormItem>
  );
}

export const SelectField = ({
  field: { name, ...field },
  form: { touched, errors },
  ...props
}) => {
  const error = errors[name];
  const touch = touched[name];

  const children = props.tags.map(tag =>
    <Option key={tag.id}>{tag.attributes.name}</Option>
  );

  return (
    <FormItem 
      hasFeedback
      validateStatus={touch && error ? 'error' : ''}
      help={touch && error ? error : ''}>
      <Select
        {...props}>
        {children}
      </Select>
    </FormItem>
  );
}

export const UploadField = ({ 
  field: { name, ...field },
  form: { touched, errors },
  ...props
}) => {
  const uploadButton = (
    <div>
      <Icon type={props.uploading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Upload
      name={name}
      {...props}>
      {props.thumb
        ? <img 
          src={props.thumb}
          width="120"
          className="form-img" 
          alt="Book preview" /> 
        : uploadButton
      }
    </Upload>
  );
}