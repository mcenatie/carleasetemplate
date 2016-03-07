var request = require('request');
var reload = require('require-reload')(require),
    configFile = reload(__dirname+'/../../../configurations/configuration.js');
var tracing = require(__dirname+'/../../../tools/traces/trace.js');	
var spawn = require('child_process').spawn;

var read = function(req,res)
{
	tracing.create('ENTER', 'GET admin/demo', []);
	configFile = reload(__dirname+'/../../../configurations/configuration.js');
	
	var deploySh = spawn('sh', [__dirname+'/../check_running.sh'],{
		uid:1000
	});

	deploySh.stdout.on('data', function(data) {

		if(data.toString().trim() == 'true') {
			result = {}
			result.message = true				
			res.send(result)
			tracing.create('EXIT', 'GET admin/demo', JSON.stringify(result));
		}
		else if(data.toString().trim() == 'false') {
			result = {}
			result.message = false				
			res.send(result)
			tracing.create('EXIT', 'GET admin/demo', JSON.stringify(result));
		}
		else {
			res.status(400)
			result = {}
			result.message = "Unable to read vagrant processes"
			result.error = true			
			res.send(result)
			tracing.create('ERROR', 'GET admin/demo', "Unable to read vagrant processes");
		}
	})

}

exports.read = read;
