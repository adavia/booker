import { extendObservable } from 'mobx';
import { asyncAction } from "mobx-utils"

import appStore from './appStore';
import bookActions from '../actions/bookActions';

import defaultImg from '../images/default.png';
import Book from '../models/book';
import Assoc from '../models/assoc';

class BookStore {
  constructor() {
    this.initialState();
  }

  initialState() {
    extendObservable(this, {
      books: {
        data: [],
        assoc: [],
        links: {}
      },
      ownBooks: {
        data: [],
        assoc: [],
        links: {}
      },
      book: {
        data: {},
        assoc: [],
        links: {}
      },
    });
  }

  imageUrl(image, collection) {
    if (image) {
      const imageUrl = collection.assoc.get(`images_${image.id}`);
      return appStore.HOST + imageUrl.attributes.file.thumb.url;
    } else {
      return defaultImg;
    }
  }

  get tags() {
    const { data, assoc } = this.book;
    const tags = data.tags;

    const mappedTags = tags && tags.map(item => {
      return {
        key: item.id,
        label: assoc.get(`tags_${item.id}`).attributes.name
      }
    });

    return mappedTags;
  }

  setItem(collection, assoc) {
    if (assoc instanceof Array) {
      assoc.forEach(item => {
        this[collection].assoc.set(`${item.type}_${item.id}`, item);
      });
    } else {
      this[collection].assoc.set(`${assoc.type}_${assoc.id}`, assoc);
    }
  }

  fetchBooks = asyncAction('fetchBooks', function* (path) {
    try {
      const response = yield bookActions.fetchBooks(path, appStore.headers);
      this.books.data = response.data.data.map(data => new Book(data));
      this.books.assoc = new Map(response.data.included.map(data => new Assoc(data).toMap));
      this.books.links = response.data.links;
      return response;
    } catch ({ response }) {
      return response;
    }
  });

  fetchOwnBooks = asyncAction('fetchOwnBooks', function* (path) {
    try {
      const response = yield bookActions.fetchOwnBooks(path, appStore.headers);
      this.ownBooks.data = response.data.data.map(data => new Book(data));
      this.ownBooks.assoc = new Map(response.data.included.map(data => new Assoc(data).toMap));
      this.ownBooks.links = response.data.links;
      return response;
    } catch ({ response }) {
      return response;
    }
  });

  showBook = asyncAction('showBook', function* (id) {
    try {
      const response = yield bookActions.showBook(id, appStore.headers);
      this.book.data = new Book(response.data.data);
      this.book.assoc = new Map(response.data.included.map(data => new Assoc(data).toMap));
      return response;
    } catch ({ response }) {
      return response;
    }
  });

  createBook = asyncAction('createBook', function* (values) {
    try {
      const response = yield bookActions.createBook(values, appStore.headers);
      this.setItem('books', response.data.included);
      this.books.data.unshift(new Book(response.data.data));
      return response;
    } catch ({ response }) {
      return response;
    }
  });

  updateBook = asyncAction('updateBook', function* (id, values) {
    try {
      const response = yield bookActions.updateBook(id, values, appStore.headers);
      this.book.assoc = new Map(response.data.included.map(data => new Assoc(data).toMap));
      this.book.data = new Book(response.data.data);
      return response;
    } catch ({ response }) {
      return response;
    }
  });

  createComment = asyncAction('createComment', function* (values) {
    try {
      const response = yield bookActions.createComment(values, appStore.headers);
      this.setItem('book', response.data.data);
      this.setItem('book', response.data.included);
      this.book.data.comments.unshift({ id: response.data.data.id, type: 'comments' });
      return response;
    } catch ({ response }) {
      return response;
    }
  });
}

const bookStore = new BookStore();
export default bookStore;

