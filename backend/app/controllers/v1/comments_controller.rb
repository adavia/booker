module V1
  class CommentsController < ApplicationController
    before_action :set_book
    before_action :set_book_comment, only: [:show, :update, :destroy]

    # GET /books/:book_id/comments
    def index
      render json: @book.comments, status: :ok
    end

    # GET /books/:book_id/comments/:id
    def show
      render json: @comment, status: :ok
    end

    # POST /books/:book_id/comments
    def create
      @comment = current_user.comments.create!(comment_params)
      render json: @comment, include: [:user], status: :created
    end

    # PUT /books/:book_id/comments/:id
    def update
      @comment.update(comment_params)
      head :no_content
    end

    # DELETE /books/:book_id/comments/:id
    def destroy
      @comment.destroy
      head :no_content
    end

    private

    def comment_params
      params.require(:comment).permit(:content, :book_id, :user)
    end

    def set_book
      @book = Book.find(params[:book_id])
    end

    def set_book_comment
      @comment = @book.comments.find_by!(id: params[:id]) if @book
    end
  end
end
