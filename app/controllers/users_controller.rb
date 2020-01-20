class UsersController < ApplicationController

    def index 
        @users = User.all 
        render json: @users, include: :user_games
    end

    def show 
        @user = User.find_by(id: params[:id])
        render json: @user, include: :user_games
    end





end
