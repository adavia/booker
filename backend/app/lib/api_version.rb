class ApiVersion
  attr_reader :version, :default

  def initialize(version, default = false)
    @version = version
    @default = default
  end

  # Check whether version is specified or is default
  def matches?(request)
    check_headers(request.headers) || default
  end

  private

  def check_headers(headers)
    # Check version from Accept headers;
    accept = headers[:accept]
    accept && accept.include?("application/vnd.booker.#{version}+json")
  end
end