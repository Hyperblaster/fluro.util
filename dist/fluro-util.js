
//Create Fluro UI With dependencies
angular.module('fluro.util', [
	'fluro.config',
	]);
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


'use strict';


angular.module('fluro.util')


.service('Content', function($resource, $cacheFactory, Fluro) {


    //////////////////////////////////////////////////

    var controller = {}

    //////////////////////////////////////////////////

    controller.genericResource = function(type) {

        console.log('Get Generic', type)
        return $resource(Fluro.apiURL + '/generic/' + type + '/:id', {}, {
            update: {
                method: 'PUT' // this method issues a PUT request
            },
            query: {
                method: 'GET',
                isArray: true,
                ignoreLoadingBar: true
            },
            batch: {
                method: 'POST',
                ignoreLoadingBar: true
            }
        });
    }

    //////////////////////////////////////////////////

    controller.resource = function(type, ignoreLoadingBar) {

        var cache = $cacheFactory.get(type + '-list');
        if(!cache) {
            cache = $cacheFactory(type + '-list');
        }

        
        return $resource(Fluro.apiURL + '/' + type + '/:id', {}, {
            update: {
                method: 'PUT', // this method issues a PUT request
                ignoreLoadingBar:ignoreLoadingBar,
            },
            save: {
                method: 'POST', // this method issues a PUT request
                ignoreLoadingBar:ignoreLoadingBar,
            },
            query: {
                method: 'GET',
                isArray: true,
                cache: cache,
                ignoreLoadingBar: true
            },
            batch: {
                method: 'POST',
                ignoreLoadingBar: true
            }
        });
    }


    return controller;

});

'use strict';


angular.module('fluro.util')


.factory('DateTools', function() {

    var controller = {};

    ///////////////////////////////////////

    controller.readableDateRange = function(startDate, endDate) {


        if(!_.isDate(startDate)) {
            startDate = new Date(startDate);
        }

        if(!_.isDate(endDate)) {
            endDate = new Date(endDate);
        }



        var today = new Date();
        var string = '';

        //We have a range
        if (startDate.format('d/m/y') != endDate.format('d/m/y')) {
            if (startDate.format('M Y') == endDate.format('M Y')) {
                string = startDate.format('j') + ' - ' + endDate.format('j F');
            } else {
                string = startDate.format('l j F') + ' until ' + endDate.format('l j F');
            }

            //Append the year if the year is different from now
            if (today.format('Y') != endDate.format('Y')) {
                string = string + ' ' + endDate.format('Y');
            }
        } else {
            if (startDate) {
                string = startDate.format('l j F');

                //Append the year if the year is different from now
                if (today.format('Y') != startDate.format('Y')) {
                    string = string + ' ' + startDate.format('Y');
                }
            }
        }



        return string;
    }

    ///////////////////////////////////////

    return controller;

});
'use strict';


angular.module('fluro.util')
.factory('Playlist', function() {

    function Playlist() {

        //Scope
        var _this = this;

        //Items
        var _items = [];
        var _index = 0;
        var _loop = true;
        var _direction = 'forwards';

        /////////////////////////////

        this.__defineSetter__("index", function(i) {

            if(i < _index) {
                _direction = 'backwards';
            } else {
                _direction = 'forwards';
            }

            if (i != _index) {

                _index = i;
            }
        });

        this.__defineGetter__("index", function() {
            return _index;
        });


        /////////////////////////////

        this.__defineGetter__("direction", function() {
            return _direction;
        });

        /////////////////////////////

        this.__defineGetter__("currentItem", function() {
            return _items[_index];
        });

        /////////////////////////////

        this.__defineGetter__("length", function() {
            return _items.length;
        });

        /////////////////////////////

        this.indexOf = function(object) {
            return _items.indexOf(object);
        }

        /////////////////////////////

        this.select = function(object) {

           var i = _items.indexOf(object);
           if(i != -1) {
                _this.index = i;
           }
        }

        /////////////////////////////

        this.__defineGetter__("items", function() {
            return _items;
        });

        this.__defineSetter__("items", function(array) {
            _items = array;
            _index = 0;
        });


        /////////////////////////////

        this.__defineGetter__("previousEnabled", function() {
            if(_loop) {
                return true;
            } else {
                return (_index > 0);
            }
        });

        this.__defineGetter__("nextEnabled", function() {
            if(_loop) {
                return true;
            } else {
                return (_index < (_items.length-1));
            }
        });


        /////////////////////////////

        this.__defineGetter__("loop", function() {
            return _loop;
        });

        this.__defineSetter__("loop", function(bol) {
            _loop = bol;
        });

        /////////////////////////////

        this.next = function() {

            if (_index < (_items.length - 1)) {
                _this.index = _index + 1;
            } else if (_loop) {
                _this.index = 0;
            }
        };

        /////////////////////////////

        this.previous = function() {

            if (_index > 0) {
                _this.index = _index - 1;
            } else if (_loop) {
                _this.index = (_items.length - 1);
            }
        };

        /////////////////////////////

        this.addItem = function(item) {
            _items.push(item);
            return item;
        }

        /////////////////////////////

        this.addItemAt = function(item, pos) {
            _items.splice(pos, 0, item);
            return item;
        }

        /////////////////////////////

        this.removeItem = function(item) {

            var _itemIndex = _items.indexOf(item);
            var _result = _items[_itemIndex];

            if (_itemIndex != -1) {
                _items.splice(_itemIndex, 1);
            }

            return _result;
        }

        /////////////////////////////

        this.clear = function() {
            _items = new Array();
            _index = 0;
        }

        /////////////////////////////
        /////////////////////////////
        /////////////////////////////

        return _this;
    }

    return Playlist;

});