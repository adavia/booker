class CommentSerializer < ApplicationSerializer
  attributes :id, :content, :created_at

  belongs_to :user
end
