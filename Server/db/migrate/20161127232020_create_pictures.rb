class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.attachment :image, { null: false }
      t.attachment :drawn_image, { null: false }
      t.integer :location_id, { null: false }

      t.timestamps(null: false)
    end
  end
end
