$(function(){
	//Possible fix for iOS10+ overriding meta-tags, double-stirred:

	document.documentElement.addEventListener('touchstart', function (event) {
		  if (event.touches.length > 1) {
		    event.preventDefault();
		  }
	}, false);
	document.addEventListener('gesturestart', function (e) {
	    e.preventDefault();
	});
	var lastTouchEnd = 0;
	document.documentElement.addEventListener('touchend', function (event) {
	  var now = (new Date()).getTime();
	  if (now - lastTouchEnd <= 300) {
	    event.preventDefault();
	  }
	  lastTouchEnd = now;
	}, false);

	//Set up scrolling box for android
	var $container = $("#content-holder");	
	var ww = $(window).width(), wh = $(window).height();
	$container.css({
		width : ww + "px",
		height : wh + "px"
	});

	var inviteCodeSI, inviteCodeOB;
	var $inviteCode, $inviteCodeNext;

	$inviteCodeNext = $("#invite-code-button");

	function initInputs() {
		inviteCodeOB = new OrangeButton($inviteCodeNext, inviteCodeValidator);

		inviteCodeSI = new SuperInput(($inviteCode = $("#invite-code-pc")), {
			after : checkInviteCodeButton,
			check :function(val){
				// if(!checkForAdjacentSpaces(val)){
				// 	this.html("Nicknames cannot contain adjacent spaces!");
				// 	return false;
				// }
				if(val.length && val.length < 6){
					this.html("Please Enter 6 digit invite code!");
					return false;
				}
				if (val.length === 6) {
					this.html("");
					return true;
				}
				this.html("");
				return false;
			}
		});
	}

	function animateInStart() {
		var $firstElem;
		$firstElem = $("#input-invite-code");

		if($firstElem){
			setTimeout(function(){
				$firstElem.focus().trigger("focus");
			}, 2000);
		}
	}

	function inviteCodeValidator(){
		return inviteCodeSI.correct();
	}

	function checkInviteCodeButton() {
		inviteCodeOB.validate();
	}

	$inviteCodeNext.on("mousedown", function(){
			var e = inviteCodeSI.value();
			B.runBlippFunction("proceedInviteCode", [e]);
		});

	initInputs();
	animateInStart();
})