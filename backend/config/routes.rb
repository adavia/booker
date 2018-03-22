Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post "auth/signin",  to: "authentication#authenticate"
  post "auth/signup",  to: "users#create"
  get  "users/unique", to: "users#unique_field"
  get  "users/me",     to: "users#me"

  # Namespace the controllers without affecting the URI
  scope module: :v1, constraints: ApiVersion.new("v1", true) do
    resources :books do
      collection do
        get "own"
      end
      collection do
        post "upload"
      end
      resources :comments
      resources :images
    end
    resources :tags
  end
end
