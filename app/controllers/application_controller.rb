class ApplicationController < ActionController::API
  private

  def paginate_posts(posts, posts_per_page)
    paginated_posts = posts.page(params[:page]).per(posts_per_page)
    paginated_posts.map do |post|
      augment_with_image(post)
    end
  end

  def augment_with_image(post)
    (post.image.attached?) ?
      post.as_json.merge(image_url: url_for(post.image.variant(resize_to_limit: [ 100, 100 ]))) :
      post.as_json.merge(image_url: nil)
  end
end

