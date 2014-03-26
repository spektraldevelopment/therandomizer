//////////////////////
////Spektral Tube
//////////////////////
function SpektralTube(id, container, paramObj) {

	//Private Var
	var player, stID = id,
		videoID,
		playerWidth, playerHeight,
		done = false, playerReadyEvent;

	//Public Var
	this.id = id;

	//Private functions
	function initPlayer() {
		//Create playerready event
		playerReadyEvent = createEvent('playerready')

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

	function onPlayerReady(event) {
		player = event.target;
		player.playVideo();
		triggerEvent(window, playerReadyEvent)
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
	window.onYouTubeIframeAPIReady = function() {
		player = new YT.Player(container, {
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
		trace('onYouTubeIframeAPIReady');
	}

	this.onReady = function(callback) {
		attachEventListener(window, 'playerready', callback);
	}

	this.play = function() {
		player.playVideo();
		trace('Play');
	}

	this.stop = function() {
		player.stopVideo();
		trace('Play');
	}

	this.volume = function(level) {
		trace('ID is: ' + id);
		trace("volume: " + level);
		player.setVolume(level);
	}

	this.getVolume = function() {
		return player.getVolume();
	}

	this.toggleMute = function() {
		var muted = player.isMuted();
		if (muted === true) {
			player.unMute();
		} else {
			player.mute();
		}
	}

	this.getMuted = function() {
		return player.isMuted;
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

	//////////////////
    ////CREATE EVENT
    /////////////////
    function createEvent(eventName, detail, bub, can) {
        detail = detail || null;
        bub = bub || true;
        can = can || true;

        var evt;
        evt = new CustomEvent(eventName, { detail: detail, bubbles: bub, cancelable: can });
        if(evt === undefined) {
            evt = new Event(eventName);
        }
        return evt;
    }

    //////////////////
    ////TRIGGER EVENT
    /////////////////
    function triggerEvent(obj, evt) {
        obj.dispatchEvent(evt);
    }

    //////////////////
    ////ATTACH EVENT LISTENER
    /////////////////
    function attachEventListener(eventTarget, eventType, eventHandler) {
        if (eventTarget.addEventListener) {
            eventTarget.addEventListener(eventType, eventHandler, false);
        } else if (eventTarget.attachEvent) {
            eventType = "on" + eventType;
            eventTarget.attachEvent(eventType, eventHandler);
        } else {
            eventTarget["on" + eventType] = eventHandler;
        }
    }

    //////////////////
    ////DETACH EVENT LISTENER
    /////////////////
    function detachEventListener(eventTarget, eventType, eventHandler) {
        if (eventTarget.removeEventListener) {
            eventTarget.removeEventListener(eventType, eventHandler, false);
        } else if (eventTarget.detachEvent) {
            eventType = "on" + eventType;
            eventTarget.detachEvent(eventType, eventHandler);
        } else {
            eventTarget["on" + eventType] = null;
        }
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
	videoID = getParameter(paramObj, 'videoID', 'b7mixrO2lzA');
	playerWidth = getParameter(paramObj, 'width', 640);
	playerHeight = getParameter(paramObj, 'height', 390);

	trace("Parameters:" +
		" videoID: " + videoID +
		" playerWidth: " + playerWidth +
		" playerHeight: " + playerHeight);

	//Constructor
	initPlayer();

	trace("Spektral Tube: id: " + stID + " info: " + JSON.stringify(this));
}(window);