class RemoveImageFromBooks < ActiveRecord::Migration[5.1]
  def change
    remove_column :books, :image, :string
  end
end
