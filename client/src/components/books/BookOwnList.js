import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Row, Icon } from 'antd';

import Pagination from '../general/Pagination';
import BookFetch from './BookFetch';
import BookView from './BookView';

const BookOwnList = ({
  bookStore, 
  loading, 
  showDelay,
  onChangePage 
}) => {
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
        links={bookStore.ownBooks.links}
        onChangePage={onChangePage} 
      />
      <div>
        { !loading ?
          bookStore.ownBooks.data.map(book => 
            <BookView 
              key={book.id} 
              collection={bookStore.ownBooks}
              store={bookStore}
              book={book} 
            />
          )
        : showDelay() }
      </div>
    </div>
  );  
}

export default BookFetch(observer(BookOwnList), 
  (store, params) => store.fetchOwnBooks(params));