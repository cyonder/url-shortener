Rails.application.routes.draw do
  root to: 'home#index'

  namespace :api, defaults: { format: 'json' } do
      namespace :v1 do
          resources :links, only: [:index, :show, :create]
      end
  end

  get '*path', to: 'home#index'
end
