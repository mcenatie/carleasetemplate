var request = require('request');
var reload = require('require-reload')(require),
    configFile = reload(__dirname+'/../../../../../configurations/configuration.js');
var tracing = require(__dirname+'/../../../../../tools/traces/trace.js');
var cfenv  = require('cfenv');
var appEnv = cfenv.getAppEnv();	

var update = function(req, res)
{
	tracing.create('ENTER', 'DELETE blockchain/assets/vehicles/vehicle/'+v5cID+'/scrap', []);
	configFile = reload(__dirname+'/../../../../../configurations/configuration.js');
	
	var newValue = req.body.value;
	var v5cID = req.params.v5cID;
	
	res.write('{"message":"Formatting request"}&&');
	
	var chaincodeInvocationSpec = {
									  "chaincodeSpec": {
											"type": "GOLANG",
											"chaincodeID": {
												"name": configFile.config.vehicle_address
											},
											"ctorMsg": {
												  "function": 'scrap_vehicle',
												  "args": [req.session.user, v5cID ]
											},
											"secureContext": req.session.user,
											"confidentialityLevel": "PUBLIC"
										  }
									}
	
	var options = 	{
						url: configFile.config.api_url+'/devops/invoke',
						method: "POST", 
						body: chaincodeInvocationSpec,
						json: true
					}
	
	res.write('{"message":"Updating scrap value"}&&');
	request(options, function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var j = request.jar();
			var str = "user="+req.session.user
			var cookie = request.cookie(str);
			var url = 'http://'+appEnv.bind+':'+appEnv.port+'/blockchain/assets/vehicles/'+v5cID+'/scrap';
			j.setCookie(cookie, url);
			var options = {
				url: url,
				method: 'GET',
				jar: j
			}
			res.write('{"message":"Confirming update"}&&');
			request(options, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					if(JSON.parse(body).scrapped)
					{
						var result = {};
						result.message = 'Scrap updated'
						res.end(JSON.stringify(result))
					}
					else
					{
						res.status(400)
						tracing.create('ERROR', 'DELETE blockchain/assets/vehicles/vehicle/'+v5cID+'/scrap', 'Unable to update scrap. v5cID: '+ v5cID)
						var error = {}
						error.error = true
						error.message = 'Unable to update scrap.'
						error.v5cID = v5cID;
						res.end(JSON.stringify(error))
					}
				}
				else
				{
					res.status(400)
					tracing.create('ERROR', 'DELETE blockchain/assets/vehicles/vehicle/'+v5cID+'/scrap', 'Unable to update scrap. v5cID: '+ v5cID)
					var error = {}
					error.error = true
					error.message = 'Unable to update scrap.'
					error.v5cID = v5cID;
					res.end(JSON.stringify(error))
				}
			})
		}
		else 
		{
			res.status(400)
			tracing.create('ERROR', 'DELETE blockchain/assets/vehicles/vehicle/'+v5cID+'/scrap', 'Unable to update scrap. v5cID: '+ v5cID)
			var error = {}
			error.error = true
			error.message = 'Unable to update scrap.'
			error.v5cID = v5cID;
			res.end(JSON.stringify(error))
		}
	})
}
exports.delete = update;