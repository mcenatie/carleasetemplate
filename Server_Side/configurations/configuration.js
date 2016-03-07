var config = {};

config.trace = true;
config.api_url = 'BLC_API_URL'//JSON.parse(process.env.VCAP_SERVICES)["ibm-blockchain-4-staging"][0]["credentials"]["peers"][0]["api_url"];;
config.traceFile = __dirname+'/../logs/trace.log'

config.roles = "https://github.com/mcenatie/car-lease-demo/roles_code"
config.vehicle = "https://github.com/mcenatie/car-lease-demo/vehicle_code"

config.event_address = 'VEHICLE_LOG_CODE_CC_ID'
config.vehicle_address = 'VEHICLE_CODE_CC_ID'

exports.config = config;
