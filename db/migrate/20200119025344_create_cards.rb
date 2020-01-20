class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :suit
      t.string :value
      t.string :code
      t.string :image

      t.timestamps
    end
  end
end
