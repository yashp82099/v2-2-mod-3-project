class UserGamesController < ApplicationController
    def index
        @usergames = UserGame.all
        render json: @usergames
    end

    def create
        @usergame = UserGame.create(user_game_params)
        render json: @usergame
    end

    def update
        @usergame = UserGame.find_by(user_id: params[:id])
        @usergame.update(user_game_params)
        render json: @usergame
    end



    private 
    def user_game_params
        params.permit(:user_id,:game_id,:score)
    end


end
