var request = require('request');
var reload = require('require-reload')(require),
    configFile = reload(__dirname+'/../../../configurations/configuration.js');
var tracing = require(__dirname+'/../../../tools/traces/trace.js');

var read = function(req, res)
{
	tracing.create('ENTER', 'GET blockchain/vehicle_logs', []);
	configFile = reload(__dirname+'/../../../configurations/configuration.js');
	
	var chaincodeInvocationSpec = 	{
										"chaincodeSpec": {
											"type": "GOLANG",
											"chaincodeID": {
												"name": configFile.config.event_address
											},
											"ctorMsg": {
											  "function": "get_vehicle_logs",
											  "args": [req.session.user]
											},
											"secureContext": req.session.user,
											"confidentialityLevel": "PUBLIC"
										}
									};
									
	var options = 	{
						url: configFile.config.api_url+'/devops/query',
						method: "POST", 
						body: chaincodeInvocationSpec,
						json: true
					}
	
	request(options, function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{ 
			var result = body.OK.vehicle_logs;
			for(var i = 0; i < result.length; i++)
			{
				result[i].v5c_ID = result[i].obj_id;
				delete result[i]['obj_id'];
			}
			tracing.create('EXIT', 'GET blockchain/vehicle_logs', JSON.stringify(result));
			res.send(result)
		}
		else 
		{
			console.log(response)
			res.status(400)
			tracing.create('ERROR', 'GET blockchain/vehicle_logs', 'Unable to get blockchain vehicle_logs')
			var error = {}
			error.message = 'Unable to get blockchain vehicle_logs';
			res.send(error)
		}
	});
}
exports.read = read;
