class Api::V1::SearchController < ApplicationController
  def posts
    @posts = Post.where("title ILIKE ? or body ILIKE ?", "%#{params[:q]}%", "%#{params[:q]}%")
    posts_with_image = @posts.map do |post|
      (post.image.attached?) ?
        post.as_json.merge(image_url: url_for(post.image.variant(resize_to_limit: [ 100, 100 ]))) :
        post.as_json.merge(image_url: nil)
    end
    render json: posts_with_image
  end
end
