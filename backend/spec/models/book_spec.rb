require 'rails_helper'

RSpec.describe Book, type: :model do
  # Ensure Book model has a 1:m relationship with Comment
  it { should have_many(:comments).dependent(:destroy) }
  it { should belong_to(:user) }

  # Ensure attr are present
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:user) }
end
