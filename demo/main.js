(function($){
	'use strict';

	$(document).ready(function(){
		var settings = {
			selectors: {
				container: '.container'
			}
		};

		$('[data-detect]').each(function(i, element){
			$(element).inBounds(settings);
			console.log(element);
			console.log(element.InBounds);
			console.log(element.InBounds.checkBounds());

			switch(element.InBounds.detectState()){
				case 1:
					console.log(i + ': hidden');
				break;
				case 2:
					console.log(i + ': visible');
				break;
				case 3:
					console.log(i + ': partial');
				break;
				default:
					console.log(i + ': fail');
			}
		});
	});
})(jQuery);