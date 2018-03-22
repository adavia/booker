class UsersController < ApplicationController
  skip_before_action :authorize_request, only: [:create, :unique_field]

  # POST /auth/signup
  # Return authenticated token upon signup
  def create
    user = User.create!(user_params)
    auth_token = AuthUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token }
    render json: response, status: :created
  end

  # Verify username/email is unique
  def unique_field
    user = User.where(username: params[:field]).or(User.where(email: params[:field]))
    render json: user.present?, status: :ok
  end

  # Get current user
  def me
    render json: current_user, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(
      :username,
      :email,
      :password,
      :password_confirmation
    )
  end
end
