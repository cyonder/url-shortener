class Api::V1::LinksController < Api::V1::BaseController
    def index # Remove this later (from routers as well!)
        render json: Link.all
    end

    def show
        @link = Link.find_by(:path => params[:id])

        if @link
            render json: @link
        else
            render json: @link = { error: "URL invalid" }
        end

    end

    def create
        @link = Link.new(link_params)

        if @link.save
            render json: @link
        end
    end

    private

    def link_params
        params.require(:link).permit(:original_url, :short_url, :path)
    end
end
