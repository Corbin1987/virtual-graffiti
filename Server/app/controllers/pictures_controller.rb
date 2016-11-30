class PicturesController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  # def new
  #   picture = Picture.new
  # end

  def index
    # search for pictures in threshold of your lat long
    # pictures = Picture.find_by()

    lat = params[:lat].to_f
    long = params[:long].to_f

    locations = Location.coords_near_me(lat, long, 0.025)

    marker_data = []
    locations.each {|loc| marker_data << {latitude: loc.latitude, longitude: loc.longitude, drawn_image_url: loc.pictures.first.drawn_image.url, image_url: loc.pictures.first.image.url}}
    marker_data.to_json

    render json: marker_data

    # render json: pictures
  end

  def create


    @location = Location.create(latitude: params[:params][:coordData][:lat], longitude: params[:params][:coordData][:long])
    @picture = Picture.create(image: params[:params][:pictureData], drawn_image: params[:params][:canvasData], location_id: @location.id)
    p @picture
    p @location
    # picture = Picture.new

    check = {u: "you did it!"}
    render json: check

  end
end
