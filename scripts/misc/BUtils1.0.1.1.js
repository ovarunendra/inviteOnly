//Prevent console logging errors in unsupported browsers with dummy object:

	

(function(w){


var B = {};

//HARDWARE FUNCTIONS

var isDroid = false;

function isAndroid(){isDroid = true;}

function isAndroid2(){isDroid = true;}

B.isLive = true;//Should app functions actually be called


var __isBoxed = false;//Has this been letterboxed?
var __boxH = 0;//If __isBoxed, this is the height to sizeFont to 


function __goURL(url){
	if(B.isLive){
		window.location.href=url;
	} else {	
	}
}

function __goDroid(func){
	if(B.isLive){
		Android[func];
	}else{
	}
}

B.freeze = function()
{
	__freeze();
	return B;
}

function __freeze()
{
	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function_pause');
	} 
	else 
	{
		Android.pause();
	}
}


B.release = function()
{
	__release();
	return B;
}

function __release()
{
	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function_resume');
	}
	else
	{
		Android.resume();
	}
}


B.share = function()
{
	__share();
	return B;
}

function __share()
{
	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function_share');
	}
	else
	{
		Android.share();
	}
}

B.shareLandscape = function()
{
	__shareLandscape();
	return B;
}

function __shareLandscape()
{
	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function_share?landscape=yes');
	}
	else
	{
		Android.rotateShare();
		Android.share();
	}
}

B.photo = function()
{
	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function_takePhoto');
	}
	else
	{
		Android.takePhoto();
	}
	return B;
}
B.showModel = function(modelID)
{
	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function_showModel?model='+modelID);
	} 
	else
	{
		Android.showModel(modelID);
	}
	return B;
}
B.hideModel = function(modelID){
	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function_hideModel?model='+modelID);
	}
	else
	{
		Android.hideModel(modelID);
	}
	return B;
}
B.closeHTML = function(){

	if(navigator.userAgent.match(new RegExp("IEMobile", "i"))){
		__goURL('https://www3.blippar.com/blippar_function_softClose');
		return B;
	}
	

	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function_softClose');
	}
	else
	{
		Android.close();
	}
	return B;
}

B.closeBlipp = function(){
	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function?function=close');
	}
	else
	{
		Android.blippFunctions('close','');
	}
	return B;
}

B.hide = function(object)
{
	if(!B.chkArr(object))
	{
		object = [object];
	}
	for(var i = 0; i<object.length; i++)
	{
		if(typeof(object[i])=='string'){object[i] = document.getElementById(object[i]);}
		object[i].style.visibility = 'hidden';
	}
	return B;
}

B.show = function(object)
{
	if(!B.chkArr(object))
	{
		object = [object];
	}
	for(var i = 0; i<object.length; i++)
	{
		if(typeof(object[i])=='string'){object[i] = document.getElementById(object[i]);}
		object[i].style.visibility = 'visible';
	}
	return B;
}

B.chkArr = function(obj){return Object.prototype.toString.call(obj) === '[object Array]'};

B.id = function(object){if(typeof(object)=='string'){object = document.getElementById(object);}; return object;}








B.cache = function(links, _onload)
{
	var tempImgs = [];
	
	//This function is used to preload images
	if(B.chkArr(links))
	{
		for(var x = tempImgs.length; x < (tempImgs.length + links.length); x++) 
		{
			tempImgs[x] = new Image();
			if(onload) tempImgs[x].onload = _onload;
			tempImgs[x].src = links[x-tempImgs.length];
		}
	}
	else if(typeof(object[i])=='string')
	{
		var x = tempImgs.length;	
		tempImgs[x] = new Image();
		tempImgs[x].src = links;
	}
	return tempImgs;
}


B.runCallApp = function(func,args)
{
	var argString = "";
	args = args || [];
	for(var i = 0; i < args.length; i++)
	{
		argString += "&arg"+(i+1)+"="+args[i];
	}
	
	
	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function?function='+ func + argString);
	}
	else
	{
		Android.blippFunctions(func,argString);
	}
	return B;
}

B.launchCallApp = function(func, args, time) {
	var funcTimeString = "&arg1=" + encodeURIComponent(func) + "&arg2=" + encodeURIComponent(time);
	var argString = "";

	for (var key in args) {
		if (args.hasOwnProperty(key)) {
			argString += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(args[key]);
		}
	}
	if (!isDroid) {
		__goURL('http://blippar.com/blippar_function?function=call' + funcTimeString + argString);
	} else {
		Android.blippFunctions('call', funcTimeString + argString);
	}
	return B;
}

B.closeBlipp = function(){
	if(!isDroid)
	{
		__goURL('http://blippar.com/blippar_function?function=close');
	}
	else
	{
		Android.blippFunctions('close','');
	}
	return B;
}

B.windowSize = function() 
{
	var dimensions = new Array(2);
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	dimensions[0] = width;
	dimensions[1] = height;
	return dimensions;
}

B.iterate = function(array, func)
{
	//This function iterates over an array, passing the value at each position as argument
	//to the function called. Saves having to write out for...loops
	
	//Allow safe-fail if types are wrong:
	
	if(B.chkArr(array) && typeof(func)=="function")
	{
		for(var i = 0; i < array.length; i++)
		{
			func(array[i], i);
		}
	}
	return B;
}

__w = -1;
__h = -1;

B.sizeFont = function(object, perc, byWid)
{
	__w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	__h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	var size = ((byWid ? __w : __h)/100)*perc;
	B.id(object).style.fontSize = size+'px';
	return B;
}


B.letterbox = function(div, aspect, borderData)
{
	/**
	 * Send this function your parent div (will be converted to absolute layout if not already)
	 * and the aspect ratio you'd like it to fix at (width/height)  
	 **/
	 __isBoxed = true;
	 
	 div = B.id(div);
	div.style.position = 'absolute';
	div.style.overflow = 'hidden';
	
	var w = 0;
	var h = 0;
	var isH = false;
	
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	if((width/height) < aspect)
	{
		isH = true;
		w = width;
		div.style.width = '100%';
		h = width/aspect;
		div.style.height = 	h+'px';
		__boxH = h;
		div.style.top = (height-h)/2 + 'px';
	}
	else
	{
		isH = false;
		h = height;
		div.style.height = '100%';
		w = height*aspect;
		div.style.width = w+'px';
		__boxH = height;
		div.style.left = (width-w)/2 + 'px';
	}
	__w = w;
	__h = h;
	
	if(borderData != undefined)
	{
		//console.log('drawing border');
		var parent = borderData.parent || document.body;
		var colour = '#000';
		if(borderData.colour.indexOf('#') == 0 && borderData.colour.length > 1)
		{
			colour = borderData.colour;
			while(colour.length < 4)
			{
				colour += (""+borderData.colour.charAt(1));
			}
		}
		
		var opacity = borderData.opacity === undefined ? 0 : parseFloat(borderData.opacity);
		parent = B.id(parent);
		var a = document.createElement('div');
		var b = document.createElement('div');
		
		a.style.backgroundColor = b.style.backgroundColor = colour;
		a.style.position = b.style.position = 'absolute';
		a.style.opacity = b.style.opacity = opacity;
		
		if(isH)
		{
			a.style.width = b.style.width = w + 'px';
			a.style.height = b.style.height = ((height-h)/2 + 4) + 'px'; 
			b.style.top = ((height-(height-h)/2) - 2) + 'px';
		}
		else
		{
			a.style.height = b.style.height = h + 'px';
			a.style.width = b.style.width = ((width-w)/2 + 4) + 'px';
			b.style.left = ((width-(width-w)/2) - 2) + 'px';
		}
		
		parent.appendChild(a);
		parent.appendChild(b);
		return [a,b];
		
	}
	
}



B.lockScroll = function()
{
	document.addEventListener('touchmove',function(e){e.preventDefault;});
	document.body.style.overflow = 'hidden';
	return B;
}


B.link = function(url)
{
	
	url = encodeURIComponent(url);
	
	if(isDroid)
	{
		Android.goToLink(url);
	}
	else
	{
		__goURL('http://blippar_function_gotolink?url='+url);
	}
}


function Q() {
	for(var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		if(typeof(arg) == 'function' || typeof(arg) == 'string')
			Q.__queue.push(arg);
		else if(typeof(arg) == 'boolean'){
			if(Q.__running || Q.__queue.length)
				Q.__terminate = !arg;
			else{
				// B.closeHTML();
				B.runCallApp("closeMainBlipp", []);
			}
		}
	}
	
	//Now, if queue has items, begin cycle:
	if(Q.__queue.length > 0 && !Q.__running){
		Q.__running = true;
		Q.__timer = setInterval(Q.__newTask, Q.interval);
	}
}

Q.__newTask = function() {
	var task = Q.__queue[0];
	if(typeof(task) == 'function')
		task();
	else
		eval(task);
	//Cut the array:
	Q.__queue.splice(0, 1);
	if(Q.__queue.length <= 0){
		clearInterval(Q.__timer);
		Q.__running = false;
		if(Q.__terminate){
			// B.closeHTML();
			B.runCallApp("closeMainBlipp", []);
		}
	}
}


Q.interval = 300;

Q.__timer = null;
Q.__running = false;
Q.__terminate = false;
Q.__queue = [];


w.B = B;
w.Q = Q;

})(window);
