include ActionView::Helpers::NumberHelper

class BookSerializer < ApplicationSerializer
  attributes :id, 
    :title, 
    :description, 
    :price, 
    :released_on,
    :created_at
  
  belongs_to :user
  has_one :image, polymorphic: true
  has_many :tags
end
