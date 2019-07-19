var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
$(document).ready(function(){
	for (var i=0; i<channels.length; ++i)
	{
		getChannel(channels[i]);
	}
	
});

function getChannel(channel)
{
	
	$.ajax({
		type: "GET",
		url: 'https://wind-bow.gomix.me/twitch-api/channels/'+channel,
		dataType: 'jsonp',
		complete: function(){
			//console.log("Complete: ", this.url);				 
			return false;
		},
		success: processTwitchChannel
	});		
}

function getStream(stream)
{
	
	$.ajax({
		type: "GET",
		url: 'https://wind-bow.gomix.me/twitch-api/streams/'+stream,
		dataType: 'jsonp',
		complete: function(){
			//console.log("Complete: ", this.url);				 
			return false;
		},
		success: processTwitchStream
	});		
}


function processTwitchChannel(apiResult)
{
	//console.log(apiResult);

	if ((apiResult != undefined)||(apiResult != null))
	{
		var url ="'" + apiResult.url + "'";
		var channelName = apiResult.name;
		var idName = "#" + channelName;
		$('#outerbox').append('<div class="row">'); //begin new row

		$('#outerbox').append('<div class="col-xs-1"></div>');
		$('#outerbox').append('<div class="col-xs-10 streamDiv"  id="' + channelName + '"><div class="row></div></div>'); // nested row for channel info
		$('#outerbox').append('<div class="col-xs-1"></div>');
		$('#outerbox').append('</div>'); //end new row		
		if (apiResult.logo)
		{
			$(idName).append('<div class="col-xs-1 streamDiv" onclick="goToTwitch('+ url  + ')"><img class="logo" src="' + apiResult.logo + '"/></div>');			
		}
		else
		{
			$(idName).append('<div class="col-xs-1 streamDiv" onclick="goToTwitch('+ url  + ')"></div>');	
		}	

		$(idName).append('<div class="col-xs-3 streamDiv" onclick="goToTwitch('+ url  + ')"><span>' + channelName + '</span></div>') ;
		
		if (apiResult.status)
		{
			$(idName).append('<div class="col-xs-6 streamDiv" onclick="goToTwitch('+ url  + ')">' + apiResult.status + '</div>');
		}
		else
		{
			$(idName).append('<div class="col-xs-6 streamDiv" onclick="goToTwitch('+ url  + ')"><span>No status</span></div>');	
		}	
		
		$(idName).append('<div class="col-xs-2 streamDiv" onclick="goToTwitch('+ url  + ')" id="' + channelName +'Status"><span class="h4 text-danger"><b>OFFLINE</b></span></div>');		


	}
	getStream(channelName);

	return false;	
}

function processTwitchStream(apiResult)
{
	//console.log(apiResult);

	if ((apiResult != undefined)||(apiResult != null))
	{
		if ((apiResult.stream != undefined)||(apiResult.stream != null))
		{
			var divName = "#" + apiResult.stream.channel.name + "Status";
			$(divName).empty();
			$(divName).append('<span class="h4 text-success"><b>ONLINE</b></span>');
		}
	}
	return false;	
}

function goToTwitch(url)
{
	//console.log(url);
	window.open(url,"_blank");
	return false;
}