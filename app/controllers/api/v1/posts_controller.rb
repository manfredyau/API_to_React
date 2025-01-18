module Api
  module V1
    class PostsController < ApplicationController
      before_action :set_post, only: %i[ show update destroy ]

      # GET /posts
      def index
        @posts = Post.all
        posts_with_image = @posts.map do |post|
          post.image.attached? ? post.as_json.merge(image: url_for(post.image)) : post.as_json.merge(image: nil)

        end

        render json: posts_with_image
      end

      # GET /posts/1
      def show
        if @post.image.attached?
          render json: @post.as_json.merge(image: url_for(@post.image.variant(resize_to_limit: [300, 300])))
        else
          render json: @post.as_json.merge(image: nil)
        end
      end

      # POST /posts
      def create
        @post = Post.new(post_params)

        if @post.save
          render json: @post, status: :created, location: api_v1_post_url(@post)
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /posts/1
      def update
        if @post.update(post_params)
          render json: @post
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end

      # DELETE /posts/1
      def destroy
        @post.destroy!
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_post
        @post = Post.find(params[:id])
      end

      # Only allow a list of trusted parameters through.
      def post_params
        params.require(:post).permit(:title, :body, :image)
      end
    end
  end
end
