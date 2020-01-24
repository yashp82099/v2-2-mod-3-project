class CreateSlots < ActiveRecord::Migration[6.0]
  def change
    create_table :slots do |t|
      t.integer :value
      t.string :image

      t.timestamps
    end
  end
end
