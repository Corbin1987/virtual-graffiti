class PicturesController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  # def new
  #   picture = Picture.new
  # end

  def create


    @location = Location.create(latitude: params[:params][:coordData][:lat], longitude: params[:params][:coordData][:long])
    @picture = Picture.create(image: params[:params][:pictureData], drawn_image: params[:params][:canvasData], location_id: @location.id)
    # p @picture
    # p @location
    # picture = Picture.new

    check = {u: "you did it!"}
    render json: check

  end
end
