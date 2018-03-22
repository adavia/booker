class AddImageToBooks < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :image, :string
    add_column :books, :price, :decimal
    add_column :books, :released_on, :date
  end
end
