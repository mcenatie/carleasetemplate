var addr;
var peersArr = [];
var minBool = true;

peersArr.push(addr);

$(document).ready(function(){
	loadLogo('main')
	getTrace();	
	getRunning();
})

function getRunning()
{
	$.ajax({
		type: 'GET',
		dataType : 'json',
		contentType: 'application/json',
		crossDomain:true,
		url: '/admin/demo',
		success: function(d) {			
			if(!d.message)
			{
				$('#resBlock').html('Start Demo')
				$('#resBlock').addClass('pgBtn');
			}
			else
			{
				$('#resBlock').html('Reset Demo')
				$('#resBlock').addClass('pgBtn');
			}
		},
		error: function(e) {
			console.log(e)
		},
		async: false
	});
}

function getTrace()
{
	$.ajax({
		type: 'GET',
		dataType : 'json',
		contentType: 'application/json',
		crossDomain:true,
		url: '/tools/traces',
		success: function(d) {
			if(d.trace)
			{
				trace = 'On'
				traceCrc = "grCrc"
				
			}
			else
			{
				trace = 'Off'
				traceCrc = "rdCrc"
			}
		},
		error: function(e){
			console.log(e)
		},
		async: false
	});
	$('<div class="confs" ><div class="bordTLRB blueBack">Configuration:</div><div class="bordLRB ">Trace: <span class="alR" ><span id="traceTog" class="toggler" onclick="toggleTrace();">'+trace+'<span class="'+traceCrc+'" ></span></span></span></div></div>').insertBefore('#addConfigPrnt');
}


function toggleTrace()
{
	$.ajax({
		type: 'PUT',
		dataType : 'json',
		contentType: 'application/json',
		crossDomain:true,
		url: '/tools/traces',
		success: function(d) {
			$('.confs').remove();
			getTrace();
		},
		error: function(e){
			console.log(e)
		},
		async: false
	});

}

function deployChaincodes()
{
	
	$('#fade').show();
	$('#loader').show();
	
	var data = {}
	var found = [];
	var xhr = new XMLHttpRequest()
	xhr.open("POST", "/admin/demo",true)
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhr.overrideMimeType("text/plain");
	xhr.onprogress = function () {
		var data = xhr.responseText;
		var array = data.split("&&");
		for(var i = 0; i < array.length; i++)
		{
			if(array[i] != "")
			{
				var fnd = false;
				for(var j = 0; j < found.length; j++)
				{
					if(JSON.parse(array[i]).message == found[j])
					{
						fnd = true;
					}
				}
				if(!fnd)
				{
					$('#latestSpan').html('&#10004');
					$('#latestSpan').attr('id','');
					$('#loaderMessages').append('<i>'+JSON.parse(array[i]).message+' </i><span id="latestSpan">...</span><br>');
					console.log(JSON.parse(array[i]).message)
					found.push(JSON.parse(array[i]).message)
				}
			}
		}
	}
	xhr.onreadystatechange = function (){
		if(xhr.readyState === 4)
		{
			var data = xhr.responseText;
			var array = data.split("&&");
			$('#latestSpan').html('&#10004');
			$('#loaderMessages').append('<br /><br /><span id="okTransaction" onclick="confTrans();">OK</span>');
			$('#chooseConfHd').html('<span>Demo Reset Complete</span>');
			$('#confTxt').html('Demo reset!');
		}
	}
	xhr.send(JSON.stringify(data))
}
function doneReset()
{
	$('#confTbl').hide();
	$('#fade').hide();
	window.location.reload();
}

