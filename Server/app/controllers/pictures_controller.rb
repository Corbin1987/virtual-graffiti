class PicturesController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  # def new
  #   picture = Picture.new
  # end



  def create
    p params
    # picture = Picture.new

    check = {u: "you did it!"}
    render json: check

  end
end