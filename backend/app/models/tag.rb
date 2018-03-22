class Tag < ApplicationRecord
  has_and_belongs_to_many :books

  scope :search, -> (name) { where("name ILIKE ?", "#{name}%") }
end
