var fs = require('fs')
var tracing = require(__dirname+'/../../../../tools/traces/trace.js');
var read = function(res)
{
	tracing.create('ENTER', 'GET blockchain/participants/regulators', []);
	fs.readFile(__dirname+"/../../participants.json", "utf8", function(err, data)
	{
		if(err)
		{
			res.status(404)
			tracing.create('ERROR', 'GET blockchain/participants/regulators', 'Unable to retrive regulators');
			var error = {}
			error.message = 'Unable to retrive regulators';
			res.send(error)
		}
		else
		{
			try
			{
				data = JSON.parse(data)
			}
			catch(e)
			{
				res.status(400)
				tracing.create('ERROR', 'GET blockchain/participants/regulators', 'Invalid JSON object');
				var error = {}
				error.message = 'Invalid JSON object';
				res.send(error)
				return;
			}
			res.send(data.regulators)
		}
	})
}
exports.read = read;