class SlotsController < ApplicationController
    def index 
        @img = Slot.all
        render json: @img
    end
    def show
        @img = Slot.find(params[:id])
        render json: @img
    end
end
