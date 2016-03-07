/*eslint-env node*/

var request = require("request")
var reload = require('require-reload')(require),
    configFile = reload(__dirname+'/../../../configurations/configuration.js');
//var tracing = require(__dirname+'/../../../tools/traces/trace.js');

function makeAccount(req, res)
{
	configFile = reload(__dirname+'/../../../configurations/configuration.js');
	
	var enrollmentDetails = {
								"enrollId":req.body.account,
								"enrollSecret":req.body.password
							}
	
	var options = 	{
						url: configFile.config.api_url+'/registrar',
						body: enrollmentDetails,
						json: true,
						method: "POST"
					};
	
	request(options, function (error, response, body){
		if (!error && response.statusCode == 200) {
			req.session.user = req.body.account;
			res.send(JSON.parse('{"persona_id":"'+req.session.user+'"}'));
		}
		else
		{
			res.status(400)
			var error = {}
			error.error = true;
			error.message = 'Unable to log user in';
			res.send(error)
		}
	});

}

exports.create = makeAccount;