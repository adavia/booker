require 'rails_helper'

RSpec.describe 'Comment API' do
  # Initialize the test data
  let(:user) { create(:user) }
  let!(:book) { create(:book, user_id: user.id) }
  let!(:comments) { create_list(:comment, 20, book_id: book.id, user_id: user.id) }
  let(:book_id) { book.id }
  let(:id) { comments.first.id }
  let(:headers) { valid_headers }

  # Test suite for GET /books/:book_id/comments
  describe 'GET /books/:book_id/comments' do
    before { get "/books/#{book_id}/comments", params: {}, headers: headers }

    context 'when book exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all book comments' do
        expect(json['data'].size).to eq(20)
      end
    end

    context 'when book does not exist' do
      let(:book_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Book/)
      end
    end
  end

  # Test suite for GET /books/:book_id/comments/:id
  describe 'GET /books/:book_id/comments/:id' do
    before { get "/books/#{book_id}/comments/#{id}", params: {}, headers: headers }

    context 'when book comment exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the comment' do
        expect(json['data']['id'].to_i).to eq(id)
      end
    end

    context 'when book comment does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Comment/)
      end
    end
  end

  # Test suite for POST /books/:book_id/comments
  describe 'POST /books/:book_id/comments' do
    let(:valid_attributes) do
      { 
        content: 'Visit Narnia', 
        user_id: user.id, 
        book_id: book_id
      }.to_json
    end

    context 'when request attributes are valid' do
      before { post "/books/#{book_id}/comments", params: valid_attributes, headers: headers }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/books/#{book_id}/comments", params: {}, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Content can't be blank/)
      end
    end
  end

  # Test suite for PUT /books/:book_id/comments/:id
  describe 'PUT /books/:book_id/comments/:id' do
    let(:valid_attributes) { { content: 'Mozart' }.to_json }

    before { put "/books/#{book_id}/comments/#{id}", params: valid_attributes, headers: headers }

    context 'when comment exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the comment' do
        updated_comment = Comment.find(id)
        expect(updated_comment.content).to match(/Mozart/)
      end
    end

    context 'when the comment does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Comment/)
      end
    end
  end

  # Test suite for DELETE /books/:book_id/comments/:id
  describe 'DELETE /books/:book_id/comments/:id' do
    before { delete "/books/#{book_id}/comments/#{id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end