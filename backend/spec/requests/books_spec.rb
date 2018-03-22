require 'rails_helper'

RSpec.describe 'Book API', type: :request do
  let(:user) { create(:user) }
  let!(:books) { create_list(:book, 10) }
  let(:book_id) { books.first.id }
  # Authorize request
  let(:headers) { valid_headers }

  # Test suite for GET /books
  describe 'GET /books' do
    # Make HTTP get request before each example
    before { get '/books', params: {}, headers: headers }

    it 'returns books' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json['data']).not_to be_empty
      expect(json['data'].size).to eq(10)
      expect(json['data'].first['relationships']['user']['data']['id']).not_to eq(user.id)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /books/:id
  describe 'GET /books/:id' do
    before { get "/books/#{book_id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the book' do
        expect(json['data']).not_to be_empty
        expect(json['data']['id'].to_i).to eq(book_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:book_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Book/)
      end
    end
  end

  # Test suite for POST /books
  describe 'POST /books' do
    # valid payload
    let(:valid_attributes) do
      # send stringify json payload
      { 
        "title": "Learn Elm", 
        "description": "Some good", 
        "price": 10.20, 
        "released_on": Time.now,
        "user_id": user.id,
        "image": "example.jpg"
      }.to_json
    end

    context 'when the request is valid' do
      before { post '/books', params: valid_attributes, headers: headers }

      it 'creates a books' do
        expect(json['data']['attributes']['title']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      let(:valid_attributes) { { title: nil, description: nil }.to_json }
      before { post '/books', params: valid_attributes, headers: headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Title can't be blank, Description can't be blank/)
      end
    end
  end

  # Test suite for PUT /books/:id
  describe 'PUT /books/:id' do
    let(:valid_attributes) { { title: 'Shopping' }.to_json }

    context 'when the record exists' do
      before { put "/books/#{book_id}", params: valid_attributes, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /books/:id
  describe 'DELETE /books/:id' do
    before { delete "/books/#{book_id}", params: {}, headers: headers }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end

  # Test suite for GET /books/own
  describe 'GET /books/own' do
    let!(:books) { create_list(:book, 10, user_id: user.id) }
    # Make HTTP get request before each example
    before { get '/books/own', params: {}, headers: headers }

    it 'returns books' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json['data']).not_to be_empty
      expect(json['data'].size).to eq(10)
      expect(json['data'].first['relationships']['user']['data']['id'].to_i).to eq(user.id)
      expect(json['data'].last['relationships']['user']['data']['id'].to_i).to eq(user.id)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end