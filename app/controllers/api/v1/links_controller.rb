class Api::V1::LinksController < Api::V1::BaseController
    def index # Remove this later (from routers as well!)
        render json: Link.all 
    end

    def show
    end

    def create
        @link = Link.new(link_params)

        if @link.save
            render json: @link
        end
    end

    private

    def link_params
        params.require(:link).permit(:original_url, :short_url)
    end
end
