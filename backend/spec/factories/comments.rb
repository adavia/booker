FactoryGirl.define do
  factory :comment do
    content { Faker::StarWars.character }
    book_id nil
  end
end