module V1
  class ImagesController < ApplicationController
    before_action :set_image
    before_action :set_imageable_image, only: [:show, :update, :destroy]

    # GET /books/:book_id/images
    def index
      render json: @imageable.image, status: :ok
    end

    # GET /books/:book_id/images/:id
    def show
      render json: @image, status: :ok
    end

    # POST /books/:book_id/images
    def create
      @image = @imageable.image.create!(image_params)
      render json: @image, status: :created
    end

    # PUT /books/:book_id/images/:id
    def update
      @image.update(image_params)
      head :no_content
    end

    # DELETE /books/:book_id/images/:id
    def destroy
      @image.destroy
      head :no_content
    end

    private

    def image_params
      params.require(:image).permit(:file)
    end

    def set_image
      @image = Image.find(params[:id])
    end

    def set_imageable_image
      @klass = params[:imageable_type].capitalize.constantize
      @imageable = klass.find(params[:imageable_id])
    end
  end
end
