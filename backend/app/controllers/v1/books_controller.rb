module V1
  class BooksController < ApplicationController
    before_action :correct_user, only: [:update, :destroy]
    before_action :set_book, only: [:show, :update, :destroy]
    before_action :parse_tags, only: [:create, :update]

    # GET /books
    def index
      @books = Book
        .includes(:user, :tags, :image)
        .page(params[:page])
        .order(created_at: 'DESC')
      render( 
        json: @books, 
        include: [:user, :tags, :image], 
        links: pagination_data(@books),
        status: :ok
      )
    end

    # POST /books
    def create
      @book = current_user.books.create!(book_params)
      update_image(@book.id)
      render json: @book, include: [:user, :tags, :image], status: :created
    end

    # GET /books/:id
    def show
      render json: @book, include: [:user, :tags, :image, comments: :user], 
        serializer: BookCommentsSerializer, status: :ok
    end

    # PUT /books/:id
    def update
      @book.update(book_params)
      update_image(@book.id)
      render json: @book, include: [:user, :tags, :image, comments: :user],
        serializer: BookCommentsSerializer, status: :ok
    end

    # DELETE /books/:id
    def destroy
      @book.destroy
      head :no_content
    end

    # GET /books/own
    def own
      @books = current_user
        .books
        .includes(:user, :tags, :image)
        .page(params[:page])
        .order(created_at: 'DESC')
      render( 
        json: @books, 
        include: [:user, :tags, :image],
        links: pagination_data(@books),
        status: :ok
      )
    end

    # POST /books/upload
    def upload
      @image = Image.create(params.permit(:file).merge(imageable_type: "Book"))
      render(json: @image, status: :ok)
    end

    private

    def update_image(id)
      if params[:book][:file].present?
        Image.where(imageable_id: id).delete_all unless params[:action] != "update"
        Image.update(params[:book][:file], imageable_id: id)
      end
    end

    def parse_tags
      if (params[:book][:tag_ids]) 
        params[:book][:tag_ids] = params[:book][:tag_ids].map { |tag| tag["key"] }
      end
    end

    def pagination_data(data)
      {
        current: data.current_page,
        total_entries: data.total_entries,
        total_pages: data.total_pages,
        self: "?page=#{data.current_page}",
        first: "?page=#{1}",
        next: "?page=#{data.next_page}",
        prev: "?page=#{data.previous_page}",
        last: "?page=#{data.total_pages}"
      }
    end

    def book_params
      params.require(:book).permit(
        :id,
        :title, 
        :description,
        :price, 
        :released_on,
        :user,
        :file,
        tag_ids: []
      )
    end

    def set_book
      @book = Book.find(params[:id])
    end

    def correct_user
      @book = Book.find(params[:id])
      if @book.user != current_user
        render json: 'This is not allowed', status: 404
      end
    end
  end
end
