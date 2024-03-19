require 'httparty'

class SugarLevelsController < ApplicationController
  def show
    begin
      response = HTTParty.get('http://seeaustinssugar.herokuapp.com/api/v1/entries.json?count=1')
      @data = response.parsed_response.first
      # Handle case when API response is not as expected
      unless @data && @data.key?('sgv') && @data.key?('direction')
        @error_message = 'Invalid data received from the API.'
      end
    rescue => e
      @error_message = "Failed to fetch data: #{e.message}"
    end
  end
end
