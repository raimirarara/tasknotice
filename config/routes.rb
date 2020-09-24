Rails.application.routes.draw do
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/today', to: 'tasks#today'
  delete '/logout', to: 'sessions#destroy'
  resources :users
  namespace :admin do
    resources :users
  end
  root to: 'tasks#index'
  resources :tasks do
    post :confirm, action: :confirm_new, on: :new
    post :import, on: :collection
  end
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
