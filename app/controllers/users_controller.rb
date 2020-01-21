class UsersController < ApplicationController

    def index 
        @users = User.all 
        render json: @users, include: :user_games
    end

    def show 
        @user = User.find_by(name: params[:id])
        render json: @user, include: :user_games
    end

    def update
        @user = User.find_by(id: params[:id])
        @user.update(user_params)
        render json: @user, include: :user_games
    end

    private

    def user_params
        params.permit(:name, :coin)
    end



end
