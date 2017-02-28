// Requires 2.0.0+ version of the app
// Can function with BlippBasic or Javascript. 
// NB. In JS - you can call user defined functions in your scene or defined blipp functions
// All arguments come through to the blipp as strings to you may need to convert to the right type in the blipp

(function(w){

var B = {};

// Should app functions actually be called
// If set to false all calls will be logged on hhe console
B.isLive = true; 

// 'functionName' the name of the blipp or scene js function
// 'args' matches the order of parameters in the Bible/Dev porta
// 'params' key-value named parameters, only relevant in BlippBasic
function getJSONObject(functionName, args, params) {
	var jsonObject = {};
	jsonObject["version"] = 1.0;
	jsonObject["type"] = 'blipp_function';
	jsonObject["function_name"] = functionName;
	if (args) {
		jsonObject["arguments"] = args;
	} else {
		jsonObject["arguments"] = [];
	}
	
	if (params) {
		jsonObject["params"] = params;
	} else {
		jsonObject["params"] = {};
	}
	return jsonObject;
}

function callAppFunction(json) {
	
	if (B.isLive &&
		window.webkit && 
		window.webkit.messageHandlers &&
		window.webkit.messageHandlers.Blippar) {
		window.webkit.messageHandlers.Blippar.postMessage(json);
	} else if (B.isLive &&
			window.Android) {
		var jsonStr = "";
		try {
			// Android can only accept 'primitive' types
			// The string is re-converted again into a js type on the Android side
			jsonStr = JSON.stringify(json);
			Android.postMessage(jsonStr);
		} catch (ex) {
			console.log("unable to send object to Android due to stringify exception");
		}
	} else {
		var jsonStr = "";
		try {
			jsonStr = JSON.stringify(json);
		} catch (ex) {
			jsonStr = "unknown";
		}
		console.log("callAppFunction with json " + jsonStr);
	}
}

B.runBlippFunction = function(func, args) {

	var json = getJSONObject(func, args);
	callAppFunction(json);
	
	return B;
}

w.B = B;

})(window);