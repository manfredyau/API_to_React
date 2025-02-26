class Api::V1::SearchController < ApplicationController
  def posts
    posts_per_page = 2
    @posts = Post.where("title ILIKE ? or body ILIKE ?", "%#{params[:q]}%", "%#{params[:q]}%")
    posts_with_image = paginate_posts(@posts, posts_per_page)
    total_posts_count = @posts.count
    render json: {
      posts: posts_with_image,
      total_count: total_posts_count,
      per_page: posts_per_page
    }
  end
end
