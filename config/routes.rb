Rails.application.routes.draw do
  root "home#index"
  resources :projects
  resources :skills
  resources :contacts, only: [ :new, :create ]
end
