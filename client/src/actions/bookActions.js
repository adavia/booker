import request from '../utils/config';

class BookActions {
  async fetchBooks(params, headers) {
    const response = await request.get(`/books/${params}`, headers);
    return response;
  }

  async fetchOwnBooks(params, headers) {
    const response = await request.get(`/books/own/${params}`, headers);
    return response;
  }

  async showBook(id, headers) {
    const response = await request.get(`/books/${id}`, headers);
    return response;
  }

  async createBook(values, headers) {
    const response = await request.post(`/books`, values, headers);
    return response;
  }

  async updateBook(id, values, headers) {
    const response = await request.put(`/books/${id}`, values, headers);
    return response;
  }

  async createComment(values, headers) {
    const response = await request.post(`/books/${values.comment.book_id}/comments`, values, headers);
    return response;
  }
}

const bookActions = new BookActions();
export default bookActions;