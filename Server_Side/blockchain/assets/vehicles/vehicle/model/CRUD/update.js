var request = require('request');
var reload = require('require-reload')(require),
    configFile = reload(__dirname+'/../../../../../../configurations/configuration.js');
var tracing = require(__dirname+'/../../../../../../tools/traces/trace.js');
var cfenv  = require('cfenv');
var appEnv = cfenv.getAppEnv();	

var update = function(req, res)
{
	tracing.create('ENTER', 'PUT blockchain/assets/vehicles/vehicle/'+v5cID+'/model', []);
	configFile = reload(__dirname+'/../../../../../../configurations/configuration.js');
	
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
												  "function": 'update_model',
												  "args": [req.session.user, newValue.toString(), v5cID ]
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
	
	res.write('{"message":"Updating model value"}&&');
	request(options, function(error, response, body)
	{
		if (!error && response.statusCode == 200)
		{
			var j = request.jar();
			var str = "user="+req.session.user
			var cookie = request.cookie(str);
			var url = 'http://'+appEnv.bind+':'+appEnv.port+'/blockchain/assets/vehicles/'+v5cID+'/model';
			j.setCookie(cookie, url);
			var options = {
				url: url,
				method: 'GET',
				jar: j
			}
			res.write('{"message":"Confirming update"}&&');
			request(options, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					if(JSON.parse(body).model == newValue)
					{
						var result = {};
						result.message = 'Model updated'
						res.end(JSON.stringify(result))
					}
					else
					{
						res.status(400)
						tracing.create('ERROR', 'PUT blockchain/assets/vehicles/vehicle/'+v5cID+'/model', 'Unable to update model. v5cID: '+ v5cID)
						var error = {}
						error.error = true
						error.message = 'Unable to update model.'
						error.v5cID = v5cID;
						res.end(JSON.stringify(error))
					}
				}
				else
				{
					res.status(400)
					tracing.create('ERROR', 'PUT blockchain/assets/vehicles/vehicle/'+v5cID+'/model', 'Unable to update model. v5cID: '+ v5cID)
					var error = {}
					error.error = true
					error.message = 'Unable to update model.'
					error.v5cID = v5cID;
					res.end(JSON.stringify(error))
				}
			})
		}
		else 
		{
			res.status(400)
			tracing.create('ERROR', 'PUT blockchain/assets/vehicles/vehicle/'+v5cID+'/model', 'Unable to update model. v5cID: '+ v5cID)
			var error = {}
			error.error = true
			error.message = 'Unable to update model.'
			error.v5cID = v5cID;
			res.end(JSON.stringify(error))
		}
	})
}
exports.update = update;