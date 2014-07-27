$('body').on({ mousemove: 
	function(event) {
	   
		// Get mouse location relative to the element's top left-most point
		var mouse_x = event.pageX - $(this).offset().left;
		var mouse_y = event.pageY - $(this).offset().top;

		// Get element's width and height
		var element_w = $(this).width();
		var element_h = $(this).height();

		// Shortest side will be used for circle of opacity change
		// We'll split it in half for later
		
		// Is element tall or wide?
		if(element_w <= element_h){
			var shortside_len = Math.round(parseInt(element_w) / 2);
		}
		else{
			var shortside_len = Math.round(parseInt(element_h) / 2);
		}

		// Find center of image x & y
		var center_x = Math.round(parseInt(element_w) / 2);
		var center_y = Math.round(parseInt(element_h) / 2);

		/*
			Treat the center of the element as x=0 y=0, but with no negative area
			so we'll have to math that out
		*/
		
		// Mouse to the left of center
		if(mouse_x <= center_x){
			var plane_x = parseInt(center_x) - parseInt(mouse_x);
		}
		else{
			// Mouse to right of center
			var plane_x = parseInt(mouse_x) - parseInt(center_x);
		}

		// Mouse above center
		if(mouse_y <= center_y){
			var plane_y = parseInt(center_y) - parseInt(mouse_y);
		}
		else{
			// Mouse below center
			var plane_y = parseInt(mouse_y) - parseInt(center_y);
		}

		/*
			Now we need to find the distance between the mouse 
			and the center of the element.
			Thanks to http://www.mathopenref.com/coorddist.html for the formula.
			Since we're only looking for the distance from the center
			dx = plane_x and dy = plane_y
		*/

		var distance = Math.round(Math.sqrt(Math.pow(parseInt(plane_x), 2) + Math.pow(parseInt(plane_y), 2)));

		/*
			Now we're going to use the distance from the center of the element to 
			the closest edge to create a circle of opacity change. Any time the
			mouse enters that circle, the opacity of the element will decrease as
			the mouse gets closer to 0;
		*/

		// Find average between 0% and 100% (0 and 1) distance from center to edge of circle
		var average = parseInt(distance) / parseInt(shortside_len);

		// Only adjust opacity if mouse is inside circle
		if(average < 1){
			$(this).fadeTo( 0, average);
		}
		
	}// click event
},'#your_element_id_here');
