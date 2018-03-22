class Comment < ApplicationRecord
  belongs_to :book
  belongs_to :user

  validates_presence_of :content, :book, :user

  scope :ordered_by_creation, -> { order(created_at: "DESC").includes(:user).limit(5) }
end
