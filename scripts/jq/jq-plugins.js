
	function OrangeButton($parentElem, validator){

		var self = this;

		var validated = false;

		this.validate = function(){
			var valid = validator();
			console.log("valid result", valid);
			if(validated != valid){
				console.log("parent", $parentElem, $parentElem.length);
				$parentElem.stop().css({
					visibility : "visible",
					opacity : +(!valid)
				}).animate({
					opacity : +valid 
				}, 500, function(){
					$parentElem.css({
						visibility : valid ? "visible" : "hidden"
					});
				});
			}
			validated = valid;
		};
	};


	//TODO 'manualverify' calls will not work in account-create

	function SuperInput($parentElem, data){

		var self = this;

		data = data || {};

		var $input = $parentElem.find(".pc-input");
		var $label = $parentElem.find(".pc-label");
		var input = $input[0];
		var $sub = $parentElem.find(".pc-sub");

		var check = data.check;
		var after = data.after;
		var focus = data.focus;
		var show  = data.showPW;

		var $show;

		var isError = false;
		var isCorrect = false;
		var isOpen = false;
		var isShowTouch = false;

		if(show){

			$show = $('<div class="pc-show-pw-button">SHOW</div>');
			$parentElem.append($show);


			$show.on("touchstart", function(e){
				isShowTouch = true;
				setTimeout(function(){
					$show.stop().animate({
						opacity : 1
					});
				}, 500);
				var isPW = !($input[0].__ns_showPW = !$input[0].__ns_showPW);
				$input.attr("type", isPW ? "password" : "text");
				$show.html(isPW ? "SHOW" : "HIDE");
			}).css({
				opacity : 0
			});
			$input.on("focus focusin", function(e){
				$show.stop().animate({
					opacity : 1
				});
			}).on("blur focusout", function(e){

				if(!isShowTouch)
					$show.stop().animate({
						opacity : 0
					});
				isShowTouch = false;
			});
		}

		$parentElem.focus(function(){
			$input.focus();
		});

		function focusStyle(){
			if(!isCorrect){
				$input.animate({
					"border-bottom-color" : "rgb(255, 170, 15)"
				});
			}

			if(!isOpen){
				$label.stop().animate({
					"font-size" : "0.85em",
					"top" : "-0.5em",
					"color" : "rgba(0, 0, 0, 0.4)"
				}, 300, "easeInOutBack");
				isOpen = true;
			}
		};

		$input.focus(focusStyle);

		function weFadeToGrey(){
			if(isOpen && !$input.val().length){
				$label.stop().animate({
					"font-size" : "1em",
					"top" : "1.3em",
					"color" : "rgba(0, 0, 0, 0.2)"
				}, 500, "easeInOutBack");
				$input.animate({
					"border-bottom-color" : "#ddd"
				});
				isOpen = false;
			}
		}

		$input.blur(weFadeToGrey);

		this.error = function(msg){//Set this to error mode
			$sub.html(msg);
			if(!isError){
				$sub.stop().animate({
					color : "#FF0000"
				});
				$input.stop().animate({
					"border-bottom-color" : "#FF0000"
				});
			}
		};

		this.validate = function(){

			var val = $input.val();

			var prevCorrect = isCorrect;

			if(check)
				isCorrect = check.call($sub, val);

			if(isError){
				isError = false;
				$sub.stop().animate({
					color : "rgba(0, 0, 0, 0.25)"
				});
			}

			if(prevCorrect != isCorrect)
				$input.stop().animate({
					"border-bottom-color" : isCorrect ? "rgb(15,188,36)" : "rgb(255, 170, 15)",
					"background" : isCorrect ? "red" : "blue"
				});

			if(after)
				after();
		};

		this.value = function(val){//Get value, and check if correct as well
			if(val){
				$input.val(val);
				focusStyle();
				self.validate();
			}
			return $input.val();
		};

		this.correct = function(val){
			return isCorrect;
		};

		this.focus = function(){
			$input.focus();
		};

		$input.on("input propertychange", self.validate);
		$input.on("manualverify", self.validate);


	};

