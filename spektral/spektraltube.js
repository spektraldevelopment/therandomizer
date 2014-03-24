//////////////////////
////Spektral Tube
//////////////////////
function SpektralTube(id, paramObj) {

	//Private Var
	var player, stID = id,
		videoID,
		playerWidth, playerHeight,
		done = false;

	//Public Var
	this.id = id;

	//Private functions
	function initPlayer() {
		//Inject iframe API
		injectIframeAPI();
		trace('initPlayer');
	}

	function injectIframeAPI() {
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		trace('injectIframeAPI');
	}

	function onYouTubeIframeAPIReady() {
		trace("onYouTubeIframeAPIReady start");
		player = new YT.Player('videoContainer', {
			width: playerWidth,
			height: playerHeight,
			videoId: videoID,
			events: {
				'onReady': onPlayerReady,
				'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
				'onStateChange': onPlayerStateChange,
				'onError': onPlayerError
			}
		});
		trace('player: ', 'dir', player);
		trace('onYouTubeIframeAPIReady');
	}

	function onPlayerReady(event) {
		event.target.playVideo();
		trace('onPlayerReady');
	}

	function onPlayerPlaybackQualityChange(event) {
		trace("Quality Change: " + event.data);
	}

	function onPlayerStateChange(event) {
		if (event.data == YT.PlayerState.PLAYING && !done) {
			setTimeout(this.stop, 6000);
			done = true;
		}
		trace('onPlayerStateChange');
	}

	function onPlayerError() {
		trace('Player Error');
	}

	//Public functions
	this.play = function() {
		player.playVideo();
		trace('Play');
	}

	this.stop = function() {
		player.stopVideo();
		trace('Play');
	}

	this.changeVolume = function(level) {
		player.setVolume(level);
	}

	//Utils
	////////////////////
	////GET PARAMETER
	////////////////////
	function getParameter(obj, val, defaultParam) {
		var retrievedParam;
		if (obj !== undefined) {
			if (obj[val] === undefined) {
				retrievedParam = defaultParam;
				//trace("getParameter: val was not found, setting to default.")
			} else {
				retrievedParam = obj[val];
				//trace("getParameter: val found.")
			}
		} else {
			retrievedParam = defaultParam;
			//trace("getParameter: object was not defined, setting val to default.")
		}
		return retrievedParam;
	}

	////////////////////
	////TRACE
	////////////////////
	function trace(message, method, obj) {
		message = 'SpektralTube: ' + stID + ": " + message;
		if (method === 'dir') {
			console.log(message);
			console.dir(obj);
		} else {
			console.log(message);
		}
	}

	//Parameters
	videoID = getParameter(paramObj, 'videoID', 'M7lc1UVf-VE');
	playerWidth = getParameter(paramObj, 'width', 640);
	playerHeight = getParameter(paramObj, 'height', 390);

	trace("Parameters:" +
		" videoID: " + videoID +
		" playerWidth: " + playerWidth +
		" playerHeight: " + playerHeight);

	//Constructor
	initPlayer();

	trace("Spektral Tube: id: " + stID + " info: " + JSON.stringify(this));
};