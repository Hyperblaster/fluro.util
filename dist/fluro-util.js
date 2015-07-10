
//Create Fluro UI With dependencies
angular.module('fluro.util', [
	'fluro.config',
	]);
'use strict';


angular.module('fluro.util')

.service('CacheManager', function($resource, $cacheFactory) {

    //////////////////////////////////////////////////

    var controller = {}

    //////////////////////////////////////////////////
    
    var _caches = [];

    //////////////////////////////////////////////////

    controller.get = function(type) {

        var cache = $cacheFactory.get(type + '-list');

        
        if(!cache) {
            //console.log('Creating ', type + '-list')
            cache = $cacheFactory(type + '-list');
            _caches.push(cache);
        }

        return cache;
    }

    //////////////////////////////////////////////////
    
    controller.clear = function(type) {
        console.log('Clear', type, 'cache');
        
        var cache = $cacheFactory.get(type +'-list');
        if(cache) {
            //console.log('CacheManager Clear Cache', type + '-list')
            cache.removeAll();
        }
    }

    //////////////////////////////////////////////////
    
    controller.clearAll = function() {
        console.log('Clear all caches')
        _.each(_caches, function(cache) {
            console.log('Clearing cache', cache);
            cache.removeAll();
        })
    }

    //////////////////////////////////////////////////

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
                string = startDate.format('l j') + ' - ' + endDate.format('l j F');
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
angular.module('fluro.util')

.service('Asset', function(Fluro, $window) {

    var controller = {}

    /////////////////////////////////////////////////////
   
    controller.getUrl = function(id) {
        // console.log('Get Asset URL', id)
        return Fluro.apiURL + '/get/' + id;
    }

    /////////////////////////////////////////////////////

    controller.thumbnailUrl = function(id) {
        // console.log('Get Asset URL', id)
        return Fluro.apiURL + '/get/' + id + '?w=50';
    }

    //////////////////////////////////////////////////

    controller.imageUrl = function(_id, w, h) {
        var url = Fluro.apiURL + '/get/' + _id + '?dimensions';


        var limitWidth = 1200;

        if ($window.screen.width <= 768) {
            limitWidth = 768;
        }

        if ($window.screen.width <= 320) {
            limitWidth = 320;
        }

        if (!w && !h) {
            url += '&w=' + limitWidth;
        } else {

            if (w) {
                url += '&w=' + w;
            }

            if (h) {
                url += '&h=' + h;
            }
        }

        if (Fluro.token) {
            url += '&access_token=' + Fluro.token;
        }

        return url;
    }


    /////////////////////////////////////////////////////
   
    controller.downloadUrl = function(id) {

        var url = Fluro.apiURL + '/download/' + id;

        if (Fluro.token) {
            url += '&access_token=' + Fluro.token;
        }

        return url;

    }

    /////////////////////////////////////////////////////
   
    controller.isAssetType = function(object) {
       
        switch(object._type) {
            case 'asset':
            case 'video':
            case 'audio':
            case 'image':
                return true;
            break;
            default:
                return false;
            break;
        }
    }

    /////////////////////////////////////////////////////

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