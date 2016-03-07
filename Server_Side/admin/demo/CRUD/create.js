var request = require('request');
var reload = require('require-reload')(require),
    configFile = reload(__dirname+'/../../../configurations/configuration.js');
var tracing = require(__dirname+'/../../../tools/traces/trace.js');	
var spawn = require('child_process').spawn;

var users = ["DVLA", "Toyota", "Alfa_Romeo", "Jaguar_Land_Rover", "Beechvale_Group", "Milescape", "Viewers_Alfa_Romeo", "LeaseCan", "Every_Car_Leasing", "Regionwide_Vehicle_Contracts", "Joe_Payne", "Andrew_Hurt", "Anthony_O'Dowd", "Cray_Bros_(London)_Ltd", "Aston_Scrap_Centre", "ScrapIt!_UK"]
var counter = 0;

var create = function(req,res)
{
	tracing.create('ENTER', 'POST admin/demo', []);
	configFile = reload(__dirname+'/../../../configurations/configuration.js');

	res.write(JSON.stringify({"message":"Resetting demo"}) + '&&')
	counter = 0;
	var deploySh = spawn('sh', [__dirname+'/../reset_demo.sh'],{
		uid:1000,
		close: setTimeout(function(){confComplete(res);},60000)
	});

}

exports.create = create;

function confComplete(res)
{
	var interval = setInterval(function(){
		if(counter < 5){
			var options = 	{
				url: configFile.config.api_url+'/chain',
				body: {},
				json: true,
				method: "GET"
			};
	
			request(options, function (error, response, body){
				if (!error && response.statusCode == 200) {
					if(body.height > 0){
						res.write(JSON.stringify({"message":"Demo reset"}) + '&&')
						clearInterval(interval);
						counter = 0;
						res.write(JSON.stringify({"message":"Logging in users"})+'&&')					
						loginUsers(res)
					}
				}
				else {
					if(counter == 4){
						res.status(400)
						tracing.create('ERROR', 'POST admin/demo', 'Unable to get blockchain information')
						var error = {}
						error.message = 'Unable to get blockchain information';
						res.end(JSON.stringify(error))
						clearInterval(interval);
					}
				}
			});
			counter++
		}
		else{
			res.status(400)
			tracing.create('ERROR', 'POST admin/demo', 'Unable to confirm reset. Request timed out.')
			var error = {}
			error.message = 'Unable to confirm reset. Request timed out.';
			res.end(JSON.stringify(error))
			clearInterval(interval);
		}
	},5000)
}

function loginUsers(res)
{
	var enrollmentDetails = {
					"enrollId":users[counter],
					"enrollSecret":"ibm4you2"
				}
	
	var options = 	{
				url: configFile.config.api_url+'/registrar',
				body: enrollmentDetails,
				json: true,
				method: "POST"
			};
	
	request(options, function (error, response, body){
		if (!error && response.statusCode == 200) {
			if(counter < users.length - 1)
			{
				counter++;
				setTimeout(loginUsers(res), 500);
			}
			else
			{
				res.end(JSON.stringify({"message":"Users logged in"}))
			}
		}
		else
		{
			res.status(400)
			tracing.create('ERROR', 'POST admin/identity', 'Unable to log user in: '+users[counter]);
			var error = {}
			error.message = 'Unable to log user in: '+users[counter];
			res.end(JSON.stringify(error))
		}
	});		
}
