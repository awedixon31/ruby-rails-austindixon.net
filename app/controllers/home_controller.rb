require "net/http"
require "json"
require "time"

class HomeController < ApplicationController
  def index
    @projects = Project.all
    @skills = Skill.all
    uri = URI("https://seeaustinssugar.herokuapp.com/api/v1/entries.json?count=1")
    nightscout_object = JSON.parse(Net::HTTP.get(uri)).first

    @date = Time.parse(nightscout_object["dateString"]).strftime("%B %d, %Y at %I:%M %p")
    @glucose_direction = nightscout_object["direction"]
    @current_glucose = nightscout_object["sgv"]
    # [{"type":"sgv","device":"nightscout-librelink-up","dateString":"2025-02-20T21:14:27.000Z","date":1740086067000,"direction":"Flat","sgv":158,"utcOffset":0,"sysTime":"2025-02-20T21:14:27.000Z","_id":"67b79b547a0c068db2da8459","mills":1740086067000}]
  end
end
