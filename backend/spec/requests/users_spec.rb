require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  let(:user) { create(:user) }
  let(:new_user) { build(:user) }
  let(:headers) { valid_headers }
  let(:unauthenticate_headers) { valid_headers.except('Authorization') }
  let(:valid_attributes) do
    attributes_for(:user, password_confirmation: new_user.password)
  end

  # User signup test suite
  describe 'POST /auth/signup' do
    context 'when valid request' do
      before { post '/auth/signup', params: valid_attributes.to_json, headers: unauthenticate_headers }

      it 'creates a new user' do
        expect(response).to have_http_status(201)
      end

      it 'returns success message' do
        expect(json['message']).to match(/Account created successfully/)
      end

      it 'returns an authentication token' do
        expect(json['auth_token']).not_to be_nil
      end
    end

    context 'when invalid request' do
      before { post '/auth/signup', params: {}, headers: unauthenticate_headers }

      it 'does not create a new user' do
        expect(response).to have_http_status(422)
      end

      it 'returns failure message' do
        expect(json['message'])
          .to match(/Validation failed: Password can't be blank, Username can't be blank, Email can't be blank, Password digest can't be blank/)
      end
    end

    describe 'GET unique username /users/unique/:field' do
      context 'when username is already taken' do
        before { get "/users/unique?field=#{user.username}", params: valid_attributes.to_json, headers: unauthenticate_headers }

        it 'returns true' do
          expect(response.body).to eq("true")
        end
      end

      context 'when username is not taken' do
        before { get "/users/unique?field='johnny'", params: valid_attributes.to_json, headers: unauthenticate_headers }

        it 'returns false' do
          expect(response.body).to eq("false")
        end
      end
    end

    describe 'GET unique email /users/unique/:field' do
      context 'when email is already taken' do
        before { get "/users/unique?field=#{user.email}", params: valid_attributes.to_json, headers: unauthenticate_headers }

        it 'returns true' do
          expect(response.body).to eq("true")
        end
      end

      context 'when email is not taken' do
        before { get "/users/unique?field='johnny@gmail.com'", params: valid_attributes.to_json, headers: unauthenticate_headers }

        it 'returns false' do
          expect(response.body).to eq("false")
        end
      end
    end
  end

  describe 'GET /users/me' do
    # Make HTTP get request before each example
    context 'when the user exists' do
      before { get '/users/me', params: {}, headers: headers }

      it 'returns current user' do
        # Note `json` is a custom helper to parse JSON responses
        expect(json['data']).not_to be_empty
        expect(json['data']['id'].to_i).to eq(user.id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the request is not authenticated' do
      before { get '/users/me', params: {}, headers: unauthenticate_headers }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end
    end
  end
end