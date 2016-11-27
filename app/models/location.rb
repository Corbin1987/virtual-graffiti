class Location < ActiveRecord::Base

  has_many :pictures

  validates :latitude, :longitude, { presence: true }

end
