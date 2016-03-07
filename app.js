/*eslint-env node*/

//===============================================================================================
//	Required Node JS Modules
//===============================================================================================
var express		 = require('express');
var session		 = require('express-session');
var cfenv		 = require('cfenv');
var cookieParser = require('cookie-parser');
var bodyParser	 = require('body-parser');
var cors 		 = require('cors');
var fs 			 = require('fs');
var spawn = require('child_process').spawn;


//===============================================================================================
//	Required Local Modules
//===============================================================================================
var blocks 		 = require(__dirname+'/Server_Side/blockchain/blocks/blocks.js')
var block 		 = require(__dirname+'/Server_Side/blockchain/blocks/block/block.js')
var chaincode 	 = require(__dirname+'/Server_Side/blockchain/chaincode/chaincode.js')
var vehicles	 = require(__dirname+'/Server_Side/blockchain/assets/vehicles/vehicles.js')
var vehicle 	 = require(__dirname+'/Server_Side/blockchain/assets/vehicles/vehicle/vehicle.js')
var identity 	 = require(__dirname+'/Server_Side/admin/identity/identity.js')
var participants = require(__dirname+'/Server_Side/blockchain/participants/participants.js')
var vehicle_logs 		 = require(__dirname+'/Server_Side/blockchain/vehicle_logs/vehicle_logs.js')
var trace 		 = require(__dirname+'/Server_Side/tools/traces/trace.js')
var demo 	 = require(__dirname+'/Server_Side/admin/demo/demo.js')


//===============================================================================================
//	Setup
//===============================================================================================
var app = express();
	app.use(express.static(__dirname + '/Client_Side'));											// setup directory to serve the HTML pages											// get the app environment from Cloud Foundry
	app.use(cors());
	app.use(bodyParser.json());
	app.use(cookieParser())
	app.use(session({
						secret: 		   '123',		
						resave: 		   false, 
						saveUninitialized: true, 
						cookie: 		   
						{
						   maxAge: 36000000,
						   httpOnly: false
						}
					}));																			// creating a session instance

var appEnv = cfenv.getAppEnv();																	// UNCOMMENT FOR BLUEMIX					

		
//===============================================================================================
//	Routing
//===============================================================================================
//-----------------------------------------------------------------------------------------------
//	Admin - Identity
//-----------------------------------------------------------------------------------------------
app.post('/admin/identity', function(req, res) 														//Sets the session user to have the account address for the page they are currently on
{
	identity.create(req, res);
});

app.get('/admin/identity', function(req, res)
{
	identity.read(req, res);
});

//-----------------------------------------------------------------------------------------------
//	Admin - Identity
//-----------------------------------------------------------------------------------------------

// app.post('/admin/demo', function(req, res)
// {
// 	demo.create(req, res);
// });

// app.get('/admin/demo', function(req, res)
// {
// 	demo.read(req, res);
// });


//-----------------------------------------------------------------------------------------------
//	Tools - Traces
//-----------------------------------------------------------------------------------------------

app.get('/tools/traces', function(req, res) //Sets the session user to have the account address for the page they are currently on
{
	trace.read(req, res);
});

app.put('/tools/traces', function(req, res)
{
	trace.update(req, res);
});

//-----------------------------------------------------------------------------------------------
//	Blockchain - Blocks
//-----------------------------------------------------------------------------------------------
app.get('/blockchain/blocks', function(req, res){
	blocks.read(req, res);
});

app.get('/blockchain/blocks/:blockNum(\\d+)/', function(req, res){
	block.read(req, res);
});

//-----------------------------------------------------------------------------------------------
//	Blockchain - chaincode
//-----------------------------------------------------------------------------------------------
app.post('/blockchain/chaincode/vehicles', function(req, res){
	chaincode.vehicles.create(req, res)
})

app.post('/blockchain/chaincode/vehicle_logs', function(req, res){
	chaincode.vehicle_logs.create(req, res)
})

//-----------------------------------------------------------------------------------------------
//	Blockchain - Assets - Vehicles
//-----------------------------------------------------------------------------------------------
app.post('/blockchain/assets/vehicles/' , function(req,res)
{
	vehicles.create(req,res)
});
app.get('/blockchain/assets/vehicles/' , function(req,res)
{
	vehicles.read(req,res)
});

//-----------------------------------------------------------------------------------------------
//	Blockchain - Assets - Vehicles - Vehicle - Owner
//-----------------------------------------------------------------------------------------------
app.get('/blockchain/assets/vehicles/:v5cID/owner' , function(req,res)
{
	vehicle.owner.read(req,res)
});

app.put('/blockchain/assets/vehicles/:v5cID/owner' , function(req,res)
{
	vehicle.owner.update(req,res)
});

//-----------------------------------------------------------------------------------------------
//	Blockchain - Assets - Vehicles - Vehicle - VIN
//-----------------------------------------------------------------------------------------------
app.get('/blockchain/assets/vehicles/:v5cID/VIN' , function(req,res)
{
	vehicle.VIN.read(req,res)
});

app.put('/blockchain/assets/vehicles/:v5cID/VIN' , function(req,res)
{
	vehicle.VIN.update(req,res)
});

//-----------------------------------------------------------------------------------------------
//	Blockchain - Assets - Vehicles - Vehicle - Make
//-----------------------------------------------------------------------------------------------
app.get('/blockchain/assets/vehicles/:v5cID/make' , function(req,res)
{
	vehicle.make.read(req,res)
});

app.put('/blockchain/assets/vehicles/:v5cID/make' , function(req,res)
{
	vehicle.make.update(req,res)
});

//-----------------------------------------------------------------------------------------------
//	Blockchain - Assets - Vehicles - Vehicle - Model
//-----------------------------------------------------------------------------------------------
app.get('/blockchain/assets/vehicles/:v5cID/model' , function(req,res)
{
	vehicle.model.read(req,res)
});

app.put('/blockchain/assets/vehicles/:v5cID/model' , function(req,res)
{
	vehicle.model.update(req,res)
});

//-----------------------------------------------------------------------------------------------
//	Blockchain - Assets - Vehicles - Vehicle - Reg
//-----------------------------------------------------------------------------------------------
app.get('/blockchain/assets/vehicles/:v5cID/reg' , function(req,res)
{
	vehicle.reg.read(req,res)
});

app.put('/blockchain/assets/vehicles/:v5cID/reg' , function(req,res)
{
	vehicle.reg.update(req,res)
});

//-----------------------------------------------------------------------------------------------
//	Blockchain - Assets - Vehicles - Vehicle - Colour
//-----------------------------------------------------------------------------------------------
app.get('/blockchain/assets/vehicles/:v5cID/colour' , function(req,res)
{
	vehicle.colour.read(req,res)
});

app.put('/blockchain/assets/vehicles/:v5cID/colour' , function(req,res)
{
	vehicle.colour.update(req,res)
});

//-----------------------------------------------------------------------------------------------
//	Blockchain - Assets - Vehicles - Vehicle - Scrapped
//-----------------------------------------------------------------------------------------------
app.delete('/blockchain/assets/vehicles/:v5cID' , function(req,res)
{
	vehicle.delete(req,res)
});

app.get('/blockchain/assets/vehicles/:v5cID/scrap' , function(req,res)
{
	vehicle.scrapped.read(req,res)
});

//-----------------------------------------------------------------------------------------------
//	Blockchain - Vehicle Logs
//-----------------------------------------------------------------------------------------------
app.post('/blockchain/vehicle_logs', function(req,res)
{
	vehicle_logs.create(req, res)
})

app.get('/blockchain/vehicle_logs', function(req,res)
{
	vehicle_logs.read(req, res)
})

//-----------------------------------------------------------------------------------------------
//	Blockchain - Participants
//-----------------------------------------------------------------------------------------------
app.get('/blockchain/participants', function(req,res)
{
	participants.read(res)
})

app.get('/blockchain/participants/regulators', function(req,res)
{
	participants.regulators.read(res)
})

app.get('/blockchain/participants/manufacturers', function(req,res)
{
	participants.manufacturers.read(res)
})

app.get('/blockchain/participants/dealerships', function(req,res)
{
	participants.dealerships.read(res)
})

app.get('/blockchain/participants/lease_companies', function(req,res)
{
	participants.lease_companies.read(res)
})

app.get('/blockchain/participants/leasees', function(req,res)
{
	participants.leasees.read(res)
})

app.get('/blockchain/participants/scrap_merchants', function(req,res)
{
	participants.scrap_merchants.read(res)
})

//===============================================================================================
//	Start listening (appEnv.port)
//===============================================================================================
app.listen(appEnv.port, '0.0.0.0', function() {
	console.log('NodeJS Running',appEnv.port)
});