module V1
  class TagsController < ApplicationController
    before_action :set_tag, only: [:show, :update, :destroy]

    # GET /tags
    def index
      if params[:name].present?
        @tags = Tag.search(params[:name])
      else
        @tags = Tag.all
      end

      render json: @tags, status: :ok
    end

    # POST /tags
    def create
      @tag = Tag.create!(tag_params)
      render json: @tag, status: :created
    end

    # GET /tags/:id
    def show
      render json: @tag, status: :ok
    end

    # PUT /tags/:id
    def update
      @tag.update(tag_params)
      head :no_content
    end

    # DELETE /tags/:id
    def destroy
      @tag.destroy
      head :no_content
    end

    private

    def tag_params
      params.require(:tag).permit(:name)
    end

    def set_tag
      @tag = Tag.find(params[:id])
    end
  end
end
