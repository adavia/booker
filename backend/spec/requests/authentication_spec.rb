require 'rails_helper'

RSpec.describe 'Authentication', type: :request do
  # Authentication test suite
  describe 'POST /auth/signin' do
    # Create test user
    let!(:user) { create(:user) }
    # Set headers for authorization
    let(:headers) { valid_headers.except('Authorization') }
    # Set test valid and invalid credentials
    let(:valid_credentials) do
      {
        email: user.email,
        password: user.password
      }.to_json
    end
    let(:invalid_credentials) do
      {
        email: Faker::Internet.email,
        password: Faker::Internet.password
      }.to_json
    end

    # Set request.headers to our custon headers
    # Before { allow(request).to receive(:headers).and_return(headers) }

    # Returns auth token when request is valid
    context 'when request is valid' do
      before { post '/auth/signin', params: valid_credentials, headers: headers }

      it 'returns an authentication token' do
        expect(json['auth_token']).not_to be_nil
      end
    end

    # Returns failure message when request is invalid
    context 'when request is invalid' do
      before { post '/auth/signin', params: invalid_credentials, headers: headers }

      it 'returns a failure message' do
        expect(json['message']).to match(/Credentials are not valid/)
      end
    end
  end
end