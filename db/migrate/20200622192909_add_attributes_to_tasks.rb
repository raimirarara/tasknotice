class AddAttributesToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :date, :date

    add_column :tasks, :start, :time

    add_column :tasks, :end, :time
  end
end
