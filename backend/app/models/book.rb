class Book < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :user
  has_and_belongs_to_many :tags
  has_one :image, as: :imageable

  validates_presence_of :title, :description, :user

  # Pagination
  self.per_page = 10

  attr_accessor :file
end
