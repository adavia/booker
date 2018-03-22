class AuthenticationController < ApplicationController
  skip_before_action :authorize_request, only: :authenticate

  # Return auth token once user is authenticated
  def authenticate
    auth_token = AuthUser.new(auth_params[:email], auth_params[:password]).call
    render json: { auth_token: auth_token }, status: :ok
  end

  private

  def auth_params
    params.require(:authentication).permit(:email, :password)
  end
end
