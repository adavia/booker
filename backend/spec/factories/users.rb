FactoryGirl.define do
  factory :user do
    username { "random_#{random_name}" }
    email { "#{username}@example.com".downcase }
    password 'foobar'
  end
end

def random_name
  ('a'..'z').to_a.shuffle.join
end