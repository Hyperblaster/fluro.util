'use strict';


angular.module('fluro.util')

.service('CollectionManager', function(Collection) {

    var controller = {}

    ////////////////////////////////////////////

    var collections = {}

    ////////////////////////////////////////////

    controller.collection = function(key) {
        if (!collections[key]) {
            collections[key] = new Collection();
        }

        return collections[key];
    }

    ////////////////////////////////////////////

    return controller;

})

////////////////////////////////////////////

.factory('Collection', function() {

    var Collection = function() {

        //keep track of this
        var collection = this;
        collection.items = [];
        collection.multiInstance = false;
        collection.trackValue = '_id';

        ////////////////////////////////////////////////////

        var _minimum = 0;
        var _maximum = 0;

        ////////////////////////////////////////////////////

        //Item or ID
        collection.contains = function(item) {
            var id = item;

            //Checking if an object is in the collection
            if (_.isObject(item)) {

                //Check if the item has a track value
                if(item.hasOwnProperty(collection.trackValue)) {
                    id = item[collection.trackValue];
                } else {
                    //Key is undefined on object
                    console.log('Undefined track value: ', collection.trackValue, 'For item', item);
                    return true;
                }
            }

            var result =  _.any(collection.items, function(existingItem) {

                if (_.isObject(existingItem)) {
                    if (existingItem.hasOwnProperty(collection.trackValue)) {
                        return existingItem[collection.trackValue] == id;
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
        collection.toggle = function(item) {
            //Check if this item is already selected
            var alreadySelected = collection.contains(item);

            if (alreadySelected) {
                collection.remove(item);
            } else {
                collection.add(item);
            }
        }


        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////

        //Item or ID
        collection.add = function(item) {


            if(_.isObject(item)) {
                //If the item does not have the track value
                if(!item.hasOwnProperty(collection.trackValue)) {
                    console.log('Track value ' + "'" + collection.trackValue + "'" + ' Not found on proposed item', item)
                    return;
                }
            }

            if (collection.contains(item)) {
                if (!collection.multiInstance) {
                    console.log('Only allowed one instance of item', item)
                    //Stop here because we are only allowed one instance of each item
                    return;
                }
            }

            


            //If we are already at the maximum
            if (_maximum) {
                if (collection.items.length >= _maximum) {
                    if (_maximum == 1) {
                        collection.only(item);
                    }
                    //We have hit the limit already
                    return;
                }
            }

            collection.items.push(item);
            return true;
        }

        ////////////////////////////////////////////////////

        collection.removeDuplicates = function() {

            //Only keep unique values
            collection.items = _.uniq(collection.items, function(item) {
                
                if (_.isObject(item)) {
                    if (item.hasOwnProperty(collection.trackValue)) {
                        return item[collection.trackValue];
                    } else {
                        return item;
                    }
                } else {
                    return item;
                }
            });
        }

        ////////////////////////////////////////////////////

        collection.addMultiple = function(array) {

            //Add the items to our collection
            collection.items = collection.items.concat(array);

            if (!collection.multiInstance) {
                collection.removeDuplicates();
            }
        }

        //////////////////////////////////////////////

        collection.only = function(item) {
            collection.items.length = 0;
            collection.add(item);
        }

        ////////////////////////////////////////////////////

        collection.onlyMultiple = function(items) {
            collection.items = items;

            if (!collection.multiInstance) {
                collection.removeDuplicates();
            }
        }

        ////////////////////////////////////////////////////

        //Item or ID
        collection.remove = function(item) {

            var id = item;
            if (_.isObject(item)) {
                id = item[collection.trackValue];
            }

            _.remove(collection.items, function(existingItem) {
               
                if (_.isObject(existingItem)) {
                    if (existingItem.hasOwnProperty(collection.trackValue)) {
                        return (existingItem[collection.trackValue] == id);
                    } else {
                        return existingItem == id;
                    }
                } else {
                    return existingItem == id;
                }
            });
        }

        //////////////////////////////////////////////

        collection.removeMultiple = function(array) {

            //Loop through each item to remove
            _.each(array, function(removeItem) {
                _.remove(collection.items, function(existingItem) {
                    return collection.contains(existingItem);
                })
            })
        }

        //////////////////////////////////////////////

        Object.defineProperty(collection, 'ids', {
            
            get: function() {

                return _.map(collection.items, function(item) {
                    
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

        collection.clear = function() {
            collection.items.length = 0;
        }

        //////////////////////////////////////////////

        Object.defineProperty(collection, 'length', {
            get: function() {
                return collection.items.length;
            }
        });


        //////////////////////////////////////////////

        Object.defineProperty(collection, 'minimum', {
            get: function() {
                return _minimum;
            },
            set: function(m) {
                _minimum = m;
            }
        });

        //////////////////////////////////////////////

        Object.defineProperty(collection, 'maximum', {
            get: function() {
                return _maximum;
            },
            set: function(m) {
                //console.log('Set Maximum to ', m)
                _maximum = m;
            }
        });

        //////////////////////////////////////////////

        collection.set = function(array) {
            collection.items = array;
        }

        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        //Return the instance
        return collection;
    }

    return Collection;

});
