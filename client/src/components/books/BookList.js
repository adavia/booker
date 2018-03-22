import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Row, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import Pagination from '../general/Pagination';
import BookFetch from './BookFetch';
import BookView from './BookView';

class BookList extends Component {
  render() {
    const { 
      bookStore, 
      loading, 
      showDelay, 
      children, 
      onChangePage 
    } = this.props;
    
    return (
      <div>
        <Row>
          <Link 
            to={{
              pathname: '/books/new',
              state: { modal: true }
            }}
            className={`
              ant-btn 
              pull-right 
              ant-btn-primary 
              ant-btn-circle 
              ant-btn-lg 
              ant-btn-icon-only`
            }>
            <Icon type="plus" />
          </Link>
        </Row>
        <Pagination  
          links={bookStore.books.links}
          onChangePage={onChangePage} 
        />
        { !loading ?
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {bookStore.books.data.map(book => 
              <BookView 
                key={book.id} 
                collection={bookStore.books}
                store={bookStore} 
                book={book} 
              />
            )}
          </CSSTransitionGroup>
        : showDelay() }
        {children}
      </div>
    );
  }
}

export default BookFetch(observer(BookList), 
  (store, params) => store.fetchBooks(params));