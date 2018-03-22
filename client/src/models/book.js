import { extendObservable } from 'mobx';

class Book {
  constructor(data) {
    this.initialState(data);
  }

  initialState(data) {
    const { attributes } = data;
    const user = data.relationships.user;
    const image = data.relationships.image;
    const tags = data.relationships.tags;
    const comments = data.relationships.comments;

    extendObservable(this, {
      id: data.id,
      type: data.type,
      title: attributes.title,
      description: attributes.description,
      price: attributes.price,
      released_on: attributes.released_on,
      created_at: attributes.created_at,
      user: user ? user.data : {},
      image: image ? image.data : {},
      tags: tags ? tags.data : [],
      comments: comments ? comments.data : [],
    });
  }
}

export default Book;