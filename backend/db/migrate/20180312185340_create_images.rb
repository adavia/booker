class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.string :file
      t.references :imageable, polymorphic: true

      t.timestamps
    end
  end
end
