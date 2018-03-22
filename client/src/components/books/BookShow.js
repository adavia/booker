import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Icon, Button, Divider } from 'antd';

import CommentNew from '../comments/CommentNew';
import CommentView from '../comments/CommentView';

class BookShow extends Component {
  state = {
    loading: false,
    commentForm: false
  }

  componentDidMount = async () => {
    const { bookStore } = this.props;
    const { id } = this.props.match.params;

    this.setState({ loading: true });
    await bookStore.showBook(id);
   
    this.setState({ loading: false });
  }

  render() {
    const book = this.props.bookStore.book.data;
    const store = this.props.bookStore;
    const { loading } = this.state;

    const showComments = book.comments && book.comments.map(item =>
      <CommentView 
        key={item.id} 
        comment={store.book.assoc.get(`comments_${item.id}`)}
        data={store.book.assoc}
      />
    );

    if (loading) {
      return (
        <div className="center">
          <Icon type="loading" style={{ fontSize: 50 }} spin />
        </div>
      )
    }

    return (
      <React.Fragment>
        <Row className="book-show">
          <Col span={7}>
            <img 
              src={store.imageUrl(book.image, this.props.bookStore.book)} 
              alt={book.title} 
            />
          </Col>
          <Col span={17}>
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <div className="price">{book.price}</div>
            {book.released_on && 
              <p className="date">
                Released on {moment(book.released_on).format("MMMM Do YYYY")} by {store.book.assoc.get(`users_${book.user.id}`).attributes.username}
              </p>
            }
            <Button onClick={() => 
              this.setState({ comment: !this.state.comment })}>
              Add Comment
            </Button>
            {(book.user && this.props.authStore.currentUser.id === book.user.id) &&
              <Link 
                to={{
                  pathname: `/books/${book.id}/edit`,
                  state: { modal: true }
                }}
                className={`
                  ant-btn 
                  ant-btn-primary 
                  ant-btn-circle 
                  ml20-md
                  ant-btn-icon-only`
                }>
                <Icon type="edit" />
              </Link>
            }
          </Col>
        </Row>
        <Divider />
        <Row className="book-show-comments">
          <h1>All reviews for this book!</h1>
          <CommentNew
            store={store}
            commentForm={this.state.commentForm}
            bookId={this.props.match.params.id}
          />
          {showComments}
        </Row>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default inject('bookStore', 'authStore')(withRouter(observer(BookShow)));