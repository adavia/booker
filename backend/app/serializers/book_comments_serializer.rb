class BookCommentsSerializer < BookSerializer
  has_many :comments do
    object.comments.ordered_by_creation
  end
end
