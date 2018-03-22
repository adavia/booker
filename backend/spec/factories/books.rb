FactoryGirl.define do
  factory :book do
    title { Faker::Lorem.word }
    description { Faker::Lorem.word }
    price { Faker::Number.decimal(2) }
    released_on { Faker::Date.between(2.days.ago, Date.today) }
    user
  end
end 

