class Game < ApplicationRecord
    has_many :user_games
    has_many :users, through: :user_games


    def topThree
        top_three = self.user_games.sort{|a,b| b.score <=> a.score}[0..2]
        topList = []
        top_three.each do |ug|
            topList.push({name:User.find(ug.user_id).name ,score: ug.score})
        end
        return topList
    end


end
