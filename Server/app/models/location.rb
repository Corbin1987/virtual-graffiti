class Location < ActiveRecord::Base

  has_many :pictures

  validates :latitude, :longitude, { presence: true }


  def self.coords_near_me(lat, long, radius)
    lat_min = lat - radius
    lat_max = lat + radius
    long_min = long - radius
    long_max = long + radius

    Location.all.select{ |loc| (loc.latitude.to_f > lat_min && loc.latitude.to_f < lat_max) && (loc.longitude.to_f > long_min && loc.longitude.to_f < long_max)}
  end

end
