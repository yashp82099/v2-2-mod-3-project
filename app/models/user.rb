class User < ApplicationRecord
    has_many :user_games
    has_many :games, through: :user_games
    validates :name, presence: true, on: :create
    validates :name, uniqueness: true, on: :create

    



end
