import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Row, Col, Badge } from 'antd';

const BookView = ({ book, collection, store }) => {
  const user = collection.assoc.get(`users_${book.user.id}`).attributes.username;

  const showTags = book.tags.map(item => 
    <Badge 
      key={item.id} 
      count={collection.assoc.get(`tags_${item.id}`).attributes.name} 
    />
  )

  return (
    <Row className="book-item">
      <Link to={`/books/${book.id}`}>
        <Col span={4}>
          <img 
            width="150" 
            src={store.imageUrl(book.image, collection)} 
            alt={book.title} 
          />
        </Col>
        <Col span={16}>
          <h1>{book.title}</h1>
          <p>{book.description}</p>
          {showTags}
          <div className="price-item">{book.price}</div>
          <Badge 
            status="success" 
            text={`Created by ${user}`} 
          />
        </Col>
      </Link>
    </Row>
  );
}

export default observer(BookView);

