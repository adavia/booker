class User < ApplicationRecord
  # Encrypt password
  has_secure_password

  # Model associations
  has_many :books
  has_many :comments

  # Validations
  validates_presence_of :username, :email, :password_digest
  validates_uniqueness_of :username, :email
end
