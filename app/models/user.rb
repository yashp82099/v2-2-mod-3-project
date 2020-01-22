class User < ApplicationRecord
    has_many :user_games
    has_many :games, through: :user_games
    validates :name, presence: true
    validates :name, uniqueness: true
end
