class Picture < ActiveRecord::Base

  belongs_to :location

  has_attached_file :image, styles: {
    small: "64x64",
    medium: "300x500",
    large: "500x700"
  }

  validates_attachment :image, {
    presence: true,
    content_type: {content_type: ["image/jpeg", "image/png"]}

  }

  has_attached_file :drawn_image, styles: {
    small: "64x64",
    medium: "300x500",
    large: "500x700"
  }

  validates_attachment :drawn_image, {
    presence: true,
    content_type: {content_type: ["image/jpeg", "image/png"]}

  }





end
