angular.module('fluro.util')
.factory('ContentSelection', function() {

    var ContentSelection = function() {

        //keep track of this
        var controller = this;
        controller.items = [];
        controller.multiInstance = false;
        controller.trackValue = '_id';

        ////////////////////////////////////////////////////

        var _minimum = 0;
        var _maximum = 0;

        ////////////////////////////////////////////////////

        //Item or ID
        controller.contains = function(item) {
            var id = item;

            //Checking if an object is in the controller
            if (_.isObject(item)) {

                //Check if the item has a track value
                if (item.hasOwnProperty(controller.trackValue)) {
                    id = item[controller.trackValue];
                } else {
                    //Key is undefined on object
                    console.log('Undefined track value: ', controller.trackValue, 'For item', item);
                    return true;
                }
            }

            var result = _.any(controller.items, function(existingItem) {

                if (_.isObject(existingItem)) {
                    if (existingItem.hasOwnProperty(controller.trackValue)) {
                        return existingItem[controller.trackValue] == id;
                    } else {
                        return existingItem;
                    }
                } else {
                    return existingItem == id;
                }
            });



            return result;
        }

        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////

        //Item or ID
        controller.toggle = function(item) {
            //Check if this item is already selected
            var alreadySelected = controller.contains(item);

            if (alreadySelected) {
                controller.remove(item);
            } else {
                controller.add(item);
            }
        }


        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////

        //Item or ID
        controller.add = function(item) {


            if (_.isObject(item)) {
                //If the item does not have the track value
                if (!item.hasOwnProperty(controller.trackValue)) {
                    console.log('Track value ' + "'" + controller.trackValue + "'" + ' Not found on proposed item', item)
                    return;
                }
            }

            if (controller.contains(item)) {
                if (!controller.multiInstance) {
                    console.log('Only allowed one instance of item', item)
                    //Stop here because we are only allowed one instance of each item
                    return;
                }
            }




            //If we are already at the maximum
            if (_maximum) {
                if (controller.items.length >= _maximum) {
                    if (_maximum == 1) {
                        controller.only(item);
                    }
                    //We have hit the limit already
                    return;
                }
            }

            controller.items.push(item);
            return true;
        }

        ////////////////////////////////////////////////////

        controller.removeDuplicates = function() {

            //Only keep unique values
            controller.items = _.uniq(controller.items, function(item) {

                if (_.isObject(item)) {
                    if (item.hasOwnProperty(controller.trackValue)) {
                        return item[controller.trackValue];
                    } else {
                        return item;
                    }
                } else {
                    return item;
                }
            });
        }

        ////////////////////////////////////////////////////

        controller.addMultiple = function(array) {

            //Add the items to our controller
            controller.items = controller.items.concat(array);

            if (!controller.multiInstance) {
                controller.removeDuplicates();
            }
        }

        //////////////////////////////////////////////

        controller.only = function(item) {
            controller.items.length = 0;
            controller.add(item);
        }

        ////////////////////////////////////////////////////

        controller.onlyMultiple = function(items) {
            controller.items = items;

            if (!controller.multiInstance) {
                controller.removeDuplicates();
            }
        }

        ////////////////////////////////////////////////////

        //Item or ID
        controller.remove = function(item) {

            var id = item;
            if (_.isObject(item)) {
                id = item[controller.trackValue];
            }

            _.remove(controller.items, function(existingItem) {

                if (_.isObject(existingItem)) {
                    if (existingItem.hasOwnProperty(controller.trackValue)) {
                        return (existingItem[controller.trackValue] == id);
                    } else {
                        return existingItem == id;
                    }
                } else {
                    return existingItem == id;
                }
            });
        }

        //////////////////////////////////////////////

        controller.removeMultiple = function(array) {

            _.remove(controller.items, function(existingItem) {
               return _.contains(array, existingItem);
            })
        }

        //////////////////////////////////////////////

        Object.defineProperty(controller, 'ids', {

            get: function() {

                return _.map(controller.items, function(item) {

                    if (_.isObject(item)) {
                        if (item.hasOwnProperty('_id')) {
                            return item._id;
                        } else {
                            return item;
                        }
                    } else {
                        return item;
                    }
                })
            }
        });

        //////////////////////////////////////////////

        controller.clear = function() {
            controller.items.length = 0;
        }

        //////////////////////////////////////////////

        Object.defineProperty(controller, 'length', {
            get: function() {
                return controller.items.length;
            }
        });


        //////////////////////////////////////////////

        Object.defineProperty(controller, 'minimum', {
            get: function() {
                return _minimum;
            },
            set: function(m) {
                _minimum = m;
            }
        });

        //////////////////////////////////////////////

        Object.defineProperty(controller, 'maximum', {
            get: function() {
                return _maximum;
            },
            set: function(m) {
                //console.log('Set Maximum to ', m)
                _maximum = m;
            }
        });

        //////////////////////////////////////////////

        controller.set = function(array) {
            controller.items = array;
        }

        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        //Return the instance
        return controller;
    }

    return ContentSelection;

});