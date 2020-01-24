class GamesController < ApplicationController
    def index 
        @games = Game.all
        render json: @games
    end

    def show
        @game = Game.find_by(id: params[:id])
        @top_three = @game.topThree
        render json: @top_three
    end



end
