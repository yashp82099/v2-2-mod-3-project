class UsersController < ApplicationController

    def index 
        @users = User.all 
        render json: @users, include: :user_games
    end

    def show 
        @user = User.find_by(name: params[:id])
        render json: @user, include: :user_games
    end

    def create
        @user = User.new(user_params)
        if @user.valid?
            @user.save
            render json: @user, include: :user_games
        else
            render json: {'message': 'INVALID', 'err': @user.errors.full_messages}
        end

    end

    def update
        @user = User.find_by(id: params[:id])
        @user.coin = user_params[:coin]
        @user.save!
        render json: @user, include: :user_games
    end

    private

    def user_params
        params.permit(:name, :coin)
    end



end
