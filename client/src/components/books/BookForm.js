import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { notification, message } from 'antd';
import debounce from 'lodash/debounce';
import includes from 'lodash/includes';

import request from '../../utils/config';
import { validationSchema } from '../../validations/book';

export default function(ComposedComponent) {
  class BookForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        visible: true,
        uploading: false,
        tags: []
      }

      this.loadTags = debounce(this.loadTags, 800);
    }

    showModal = () => {
      this.setState({
        visible: !this.state.visible,
      });
    }

    validFile = (file) => {
      const fileType = includes(['image/jpeg', 'image/png'], file.type);
      if (!fileType) {
        message.error('You can only upload JPG or PNG files!');
      }
  
      const fileSize = file.size / 1024 / 1024 < 2;
      if (!fileSize) {
        message.error('Image must smaller than 2MB!');
      }
      
      return fileType && fileSize;
    }

    fileChange = (info, setFieldValue) => {
      if (info.file.status === 'uploading') {
        this.setState({ uploading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        this.setState({
          uploading: false,
          thumb: `http://localhost:3001${info.file.response.data.attributes.file.thumb.url}`,
        });

        setFieldValue('file', info.file.response.data.id);
      }
    }

    loadTags = async (value) => {
      const headers = { headers: { Authorization: localStorage.getItem('token') } };
      const response = await request.get(`/tags?name=${value}`, headers);
      this.setState({ tags: response.data.data });
    }

    openNotification = (type, info, message) => {
      notification[type]({
        message: info,
        description: message
      });
    }

    render() {
      return (
        <ComposedComponent 
          store={this.props.bookStore}
          history={this.props.history}
          form={this.state} 
          showModal={this.showModal}
          fileChange={this.fileChange}
          validFile={this.validFile}
          loadTags={this.loadTags}
          openNotification={this.openNotification}
          validationSchema={validationSchema}
        />
      );
    }
  }

  return inject('bookStore')(BookForm);
}