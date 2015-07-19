angular.module('fluro.util')
.factory('ObjectSelection', function() {

    var ObjectSelection = function() {

        var controller = {
        	items:[],
        	item:null,
        }
       

        //////////////////////////////////
        controller.multiple = true;
        controller.minimum = 0;
        controller.maximum = 0;

        //////////////////////////////////

        controller.select = function(item) {
            if (controller.multiple) {
                if (!_.contains(controller.items, item)) {
                    controller.items.push(item);
                }
            } else {
                controller.item = item;
            }
        }

        //////////////////////////////////

        controller.deselect = function(item) {
            if (controller.multiple) {
                _.pull(controller.items, item);
            } else {
            	controller.item = null;
            }
        }

        //////////////////////////////////

        controller.toggle = function(item) {
        	if (controller.multiple) {
	            if (_.contains(controller.items, item)) {
	                controller.deselect(item);
	            } else {
	                controller.select(item);
	            }
	        } else {
	        	if(controller.item == item) {
	        		controller.item = null;
	        	} else {
	        		controller.item = item;
	        	}
	        }
        }

        //////////////////////////////////

        controller.contains = function(item) {
        	if(controller.multiple) {
            	return _.contains(controller.items, item)
        	} else {
            	return controller.item == item;
        	}
        }

        //////////////////////////////////

        return controller;
    }

    return ObjectSelection;

});