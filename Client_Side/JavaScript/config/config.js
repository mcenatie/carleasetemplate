var config = {};

/******* Images *******/

// Variable Setup
config.logo = {};
config.logo.main = {};
config.logo.regulator = {};
config.logo.manufacturer = {};
config.logo.dealership = {};
config.logo.lease_company = {};
config.logo.leasee = {};
config.logo.scrap_merchant = {};

// Logo size
config.logo.width = '3.5em'
config.logo.height = '1.4em'

//Main Logo
config.logo.main.src = 'Icons/IBM_logo.svg'

// Regulator Logo
config.logo.regulator.src = 'Icons/Regulator/IBM_logo.svg'

// Manufacturer Logo
config.logo.manufacturer.src = 'Icons/Manufacturer/IBM_logo.svg'

// Dealership Logo
config.logo.dealership.src = 'Icons/Dealership/IBM_logo.svg'

// Lease Company Logo
config.logo.lease_company.src = 'Icons/Lease_Company/IBM_logo.svg'

// Leasee Logo
config.logo.leasee.src = 'Icons/Leasee/IBM_logo.svg'

// Scrap Merchant Logo
config.logo.scrap_merchant.src = 'Icons/Scrap_Merchant/IBM_logo.svg'

/******* Participants *******/
//This is where you can change whose name appears at the top of the pages
// When deploying Blockchain service on Bluemix ,8 users are created automatically
// 4 roles - 2 users per role
// The demo requires 5 roles (so we'll have to twick the chaincode to handle the 5 roles)

// Variable Setup
config.participants = {};
config.participants.regulator = {};
config.participants.manufacturer = {};
config.participants.dealership = {};
config.participants.lease_company = {};
config.participants.leasee = {};
config.participants.scrap_merchant = {};

// Regulator
config.participants.regulator.company = 'DVLA'
config.participants.regulator.user = 'Ronald'
config.participants.regulator.uid = 'USER_T0'
config.participants.regulator.password = 'PASSWORD_T0'

// Manufacturer
config.participants.manufacturer.company = 'Alfa Romeo'
config.participants.manufacturer.user = 'Martin'
config.participants.manufacturer.uid = "USER_T1"
config.participants.manufacturer.password = 'PASSWORD_T1'

// Dealership
config.participants.dealership.company = 'Beechvale Group'
config.participants.dealership.user = 'Deborah'
config.participants.dealership.uid = "USER_T2"
config.participants.dealership.password = 'PASSWORD_T2'

// Lease Company
config.participants.lease_company.company = 'LeaseCan'
config.participants.lease_company.user = 'Lesley'
config.participants.lease_company.uid = "USER_T3"
config.participants.lease_company.password = 'PASSWORD_T3'

// Leasee
config.participants.leasee.company = 'Joe Payne'
config.participants.leasee.user = 'Joe'
config.participants.leasee.uid = "USER_2T2"
config.participants.leasee.password = 'PASSWORD_2T2'

// Scrap Merchant
config.participants.scrap_merchant.company = 'Cray Bros (London) Ltd'
config.participants.scrap_merchant.user = 'Sandy'
config.participants.scrap_merchant.uid = "USER_T4"
config.participants.scrap_merchant.password = 'PASSWORD_T4'



function loadLogo(pageType)
{
	$('#logo').attr('src', config.logo[pageType].src)
	$('#logo').css('width', config.logo.width)
	$('#logo').css('height', config.logo.height)
}

function loadParticipant(pageType)
{
	$('#username').html(config.participants[pageType].user);
	$('#company').html(config.participants[pageType].company);
}



















