require "test_helper"

class SugarLevelsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get sugar_levels_show_url
    assert_response :success
  end
end
