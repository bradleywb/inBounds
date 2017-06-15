(function($){
	'use strict';

	function InBounds(element, options){
		if(!(this instanceof InBounds)){
			throw('inBounds must be constructed with new');
		}

		var _ = this;
		
		var defaults = Object.freeze({
			selectors: {
				container: 'body'
			}
		});

		_.settings = $.extend(true, {}, defaults, options);

		_.stateMap = Object.freeze({
			hidden: 1,
			visible: 2,
			partial: 3
		});

		_.element = element;
		_.container = $(element).closest(_.settings.selectors.container)[0];

		return _;
	}

	InBounds.prototype.detectState = function(){
		var _ = this;

		var bounds = _.checkBounds();

		if(bounds.top && bounds.bottom && bounds.left && bounds.right){
			return _.stateMap.visible;
		}

		if((!bounds.top && !bounds.bottom && !bounds.vertical) || (!bounds.left && !bounds.right && !bounds.horizontal)){
			return _.stateMap.hidden;
		}

		return _.stateMap.partial;
	};

	InBounds.prototype.checkBounds = function(){
		var _ = this;

		var elementRect = _.element.getBoundingClientRect();
		var containerRect = _.container.getBoundingClientRect();

		var top = (elementRect.top >= containerRect.top && elementRect.top <= containerRect.bottom);
		var bottom = (elementRect.bottom <= containerRect.bottom && elementRect.bottom >= containerRect.top);
		var left = (elementRect.left >= containerRect.left && elementRect.left <= containerRect.right);
		var right = (elementRect.right <= containerRect.right && elementRect.right >= containerRect.left);

		var vertical = ((top && bottom) || (elementRect.top < containerRect.top && elementRect.bottom > containerRect.bottom));
		var horizontal = ((left && right) || (elementRect.left < containerRect.left && elementRect.right > containerRect.right));

		return {
			top: top,
			bottom: bottom,
			left: left,
			right: right,
			vertical: vertical,
			horizontal: horizontal
		};
	};

	$.fn.inBounds = function(options){
		return this.each(function(i, element){
			this.InBounds = new InBounds(element, options);

			return this;
		});
	};

	return InBounds;
})(jQuery);