require 'rails_helper'

RSpec.describe Comment, type: :model do
  # Association test
  # ensure an item record belongs to a single todo record
  it { should belong_to(:book) }
  it { should belong_to(:user) }
  # Validation test
  # ensure column name is present before saving
  it { should validate_presence_of(:content) }
  it { should validate_presence_of(:book) }
  it { should validate_presence_of(:user) }
end
