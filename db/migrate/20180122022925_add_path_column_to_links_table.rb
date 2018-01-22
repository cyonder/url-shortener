class AddPathColumnToLinksTable < ActiveRecord::Migration[5.1]
  def change
      add_column :links, :path, :string
  end
end
