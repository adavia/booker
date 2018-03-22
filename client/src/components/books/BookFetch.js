import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon } from 'antd';

export default function(ComposedComponent, fetch) {
  class BookFetch extends Component {
    state = {
      loading: false,
      page: null
    }
  
    componentDidMount = async () => {
      if (this.props.location) {
        this.fetchBooks(this.props.location.search);
      } else {
        this.fetchBooks('');
      }
    }

    componentWillReceiveProps = (nextProps) => {
      const { location } = nextProps.history;
    
      if (location.pathname !== '/books/new') {
        this.fetchBooks(nextProps.location.search);
      }
    }
  
    fetchBooks = async (params) => {
      const { bookStore } = this.props;
      
      this.setState({ loading: true });
      await fetch(bookStore, params);
      
      this.setState({ loading: false });
    }
  
    onChangePage = (page) => {
      this.setState({ page: page });
    }

    showDelay = () => {
      return (
        <div className="center">
          <Icon type="loading" style={{ fontSize: 50 }} spin />
        </div>
      )    
    }

    render() {
      return (
        <ComposedComponent 
          {...this.props} 
          loading={this.state.loading} 
          onChangePage={this.onChangePage}
          showDelay={this.showDelay}
        />
      );
    }
  }

  return inject('bookStore')(observer(BookFetch));
}
