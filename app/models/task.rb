class Task < ApplicationRecord
  has_one_attached :image

  def self.csv_attributes
    ["name", "description", "created_at", "updated_at"]
  end

  def self.generate_csv
    CSV.generate(headers: true) do |csv|
      csv << csv_attributes
      all.each do |task|
        csv << csv_attributes.map{ |attr| task.send(attr) }
      end
   end
 end

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      task = new
      task.attributes = row.to_hash.slice(*csv_attributes)
      task.save!
    end
  end

  def self.ransackable_attributes(auth_object = nil)
    %w[name created_at]
  end

  def self.ransackable_associations(auth_object = nil)
    []
  end

  validate :validate_name_not_includng_comma

  belongs_to :user

  scope :recent, -> { order(created_at: :desc)}
  scope :sort_user_id, -> { order(user_id: :asc)}


  validates :start, presence: true
  validates :end, presence: true


  private

  def validate_name_not_includng_comma
    errors.add(:name, 'にカンマを含めることはできません') if name&.include?(',')
  end
end
