var inviteCodeError, requestCodeSuccess, slideInPage;

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

	var currentPage;
	var inviteCodeSI, inviteCodeOB, requestCodeNameSI, requestCodeEmailSI, requestCodeOB;
	var $inviteCode, $inviteCodeNext, $requestCodeName, $requestCodeEmail, $requestCodeNext;
	var $backingDiv = $("#backing-div")

	$inviteCodeNext = $("#invite-code-button");
	$requestCodeNext = $("#request-code-button");

	function validateEmail(email) {
		// var val = this[0].__ns_input.value;
		// console.log(this);
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

	slideInPage = function (newPage){
		if(newPage == currentPage)
			return;
		var $page = $("#" + newPage + "-page");

		var css = {
			display : "inline",
			visibility : "visible"
		};

		$page.css(css);

		var totalDelay = 0;
        console.log("OUtside")
		if(currentPage){
			console.log("Inside")
			var $cPage = $("#" + currentPage + "-page");
			$cPage.children().each(function(j){
				var $elem = $(this);
				$elem.css({
					opacity : 1,
				}).stop().delay().animate({
					opacity : 0
				}, 600, "easeInOutBack");
			});
			totalDelay = $cPage.children.length * 200;
			$cPage.delay(totalDelay).queue(function(){
				$cPage.css({
					visibility : "hidden"
				});
			});
		}

		$page.children().each(function(i){
			var $elem = $(this);
			$elem.css({
				opacity : 0
			}).stop().delay(totalDelay + i * 150).animate({
				opacity : 1
			}, 600, "easeInOutBack");
		});

		currentPage = newPage;
	};

	function initInputs() {
		inviteCodeOB = new OrangeButton($inviteCodeNext, inviteCodeValidator);
		requestCodeOB = new OrangeButton($requestCodeNext, requestCodeValidator);

		inviteCodeSI = new SuperInput(($inviteCode = $("#invite-code-pc")), {
			after : checkInviteCodeButton,
			check :function(val){
				if(val.length && val.length < 6){
					//this.html("Please Enter 6 digit invite code!");
					return false;
				}
				if (val.length === 6) {
					//this.html("");
					return true;
				}
				//this.html("");
				return false;
			}
		});

		requestCodeNameSI = new SuperInput(($requestCodeName = $("#request-code-name-pc")), {
			after : checkRequestCodeButton,
			check :function(val){
				if (val.length) {
					return true;
				}
				return false;
			}
		});

		requestCodeEmailSI = new SuperInput(($requestCodeEmail = $("#request-code-email-pc")), {
			after : checkRequestCodeButton,
			check :function(val){
				var html = "", isValid = false;
				if(val.length){
					isValid = validateEmail(val);
					//Check is valid
					if(!isValid)
						html = "Please enter a valid email address";
				}
				this.html(html);
				return isValid;
			}
		});

		$(".request-code").on("mousedown", function(){
			slideInPage('request-code');
			var $firstElem;
			$firstElem = $("#request-code-name");

			if($firstElem){
				setTimeout(function(){
					$firstElem.focus().trigger("focus");
				}, 1000);
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

		$backingDiv.animate({
			opacity : 1
		}, 500, function(){
			slideInPage('invite');
		});
	}

	function inviteCodeValidator(){
		return inviteCodeSI.correct();
	}

	function requestCodeValidator() {
		return requestCodeNameSI.correct() && requestCodeEmailSI.correct();
	}

	function checkInviteCodeButton() {
		inviteCodeOB.validate();
	}

	function checkRequestCodeButton() {
		requestCodeOB.validate();
	}

	$inviteCodeNext.on("mousedown", function(){
			var e = inviteCodeSI.value();
			B.runBlippFunction("proceedInviteCode", [e]);
			
		});

	$requestCodeNext.on("mousedown", function(){
			var name = requestCodeNameSI.value();
			var email = requestCodeEmailSI.value();
			B.runBlippFunction("requestInviteCode", [name, email]);
			
		});

   inviteCodeError = function () {
	openDialog("Oh no, something's gone wrong", 
            "Looks like it's our fault. <br/> Try agian later", 
			"Try Again",
            function(){

        });
   };

   requestCodeSuccess = function () {
	openDialog("Thanks!", 
            "", 
			"Done",
            function(){
				B.runBlippFunction("close_html", []);
        });
   };

	var $dText = $("#dialog-text"), 
		$dTitle = $("#dialog-title"),
	    $dialogBox = $("#dialog-box"), 
		$dialogBacking = $("#dialog-backing"),
		$dialogOK = $("#dialog-ok");

	dialogOut = false;

	var dialogCloseHandler;

	function openDialog(title, message, button, closeHandler){

		if(dialogOut){
			return;
		}

		$dTitle.html(title);
		$dText.html(message);
		$dialogOK.html(button);
		dialogCloseHandler = closeHandler;

		$dialogBox.css({
			left: "0%",
			opacity : 0,
			visibility : "visible"
		}).animate({
			left : "10%",
			opacity : 1
		}, 400, "easeInOutBack");
		$dialogBacking.css({
			opacity : 0,
			visibility : "visible"
		}).animate({
			opacity : 0.5
		}, 400);
		
		dialogOut = false;

	};

	$dialogOK.on("mousedown", function(){
		$dialogBox.animate({
			left : "20%",
			opacity : 0
		}, 400, "easeInOutBack");
		$dialogBacking.animate({
			opacity : 0.0
		}, 400, function(){
			$dialogBox.css({
				visibility : "hidden"
			});
			$dialogBacking.css({
				visibility : "hidden"
			});
			if(dialogCloseHandler)
				dialogCloseHandler();
			dialogCloseHandler = null;
		});
	});

	initInputs();
	animateInStart();
})