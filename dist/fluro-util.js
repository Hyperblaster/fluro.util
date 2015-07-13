
//Create Fluro UI With dependencies
angular.module('fluro.util', [
	'fluro.config',
	]);



app.filter('formatDate', function(){
  return function(dateString, format){
    return new Date(dateString).format(format)
  };
});

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


.filter('formatDate', function(){
  return function(dateString, format){
    return new Date(dateString).format(format)
  };
})


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
angular.module('fluro.util')
.provider('TypeConfig', function() {


    //Define all of our Content Types
    var controller = {
        types: []
    };

    controller.types.push({
        singular: 'Role',
        plural: 'Roles',
        path: 'role',
        columns: [{
            title: 'Applications',
            key: 'applicationKeys'
        }],
    })

    controller.types.push({
        singular: 'Code',
        plural: 'Code',
        path: 'code',
        columns: [{
            title: 'Syntax',
            key: 'syntax'
        }],
        filters: [{
            title: 'Syntax',
            key: 'syntax'
        }]
    })

    controller.types.push({
        singular: 'Component',
        plural: 'Components',
        path: 'component',
        /*columns: [{
            title: 'Syntax',
            key: 'syntax'
        }],
        filters: [{
            title: 'Syntax',
            key: 'syntax'
        }]*/
    })


    controller.types.push({
        singular: 'Query',
        plural: 'Queries',
        path: 'query',
    })

    controller.types.push({
        singular: 'Package',
        plural: 'Packages',
        path: 'package',
    })

    controller.types.push({
        singular: 'Contact',
        plural: 'Contacts',
        path: 'contact',
        columns: [{
            title: 'First Name',
            key: 'firstName'
        }, {
            title: 'Last Name',
            key: 'lastName'
        }, {
            title: 'Gender',
            key: 'gender'
        }],
        filters: [{
            title: 'Gender',
            key: 'gender'
        }]
    })

    controller.types.push({
        singular: 'Purchase',
        plural: 'Purchases',
        path: 'purchase',
        columns: [{
            title: 'Customer',
            key: 'owner.name'
        }, {
            title: 'Amount',
            key: 'transaction.amount'
        }, {
            title: 'Transaction',
            key: 'transaction._id'
        }]
    })

    controller.types.push({
        singular: 'Product',
        plural: 'Products',
        path: 'product',
        columns: [{
            title: 'Amount',
            key: 'amount'
        }, {
            title: 'License',
            key: 'license'
        }],
        filters: [{
            title: 'License',
            key: 'license'
        }]
    })


    controller.types.push({
        singular: 'Transaction',
        plural: 'Transactions',
        path: 'transaction',
        columns: [{
            title: 'Amount',
            key: 'amount'
        }, {
            title: 'Payment',
            key: 'paymentStatus'
        }, {
            title: 'Mode',
            key: 'mode'
        }, ],
        filters: [{
            title: 'Payment Status',
            key: 'paymentStatus'
        }, {
            title: 'Mode',
            key: 'mode'
        }]
    })

    controller.types.push({
        singular: 'Application',
        plural: 'Applications',
        path: 'application',
        columns: [{
            title: 'Type',
            key: 'applicationType'
        }, {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi'
        }, {
            title: 'Domain',
            key: 'domain',
        }, ]
    })


    controller.types.push({
        singular: 'Integration',
        plural: 'Integrations',
        path: 'integration',
        columns: [{
            title: 'Module',
            key: 'module'
        }, ],
        filters: [{
            title: 'Module',
            key: 'module'
        }]
    })


    controller.types.push({
        singular: 'Interaction',
        plural: 'Interactions',
        path: 'interaction',
        columns: [{
            title: 'First Name',
            key: 'contact.firstName'
        }, {
            title: 'Last Name',
            key: 'contact.lastName'
        }, ]
    })

    controller.types.push({
        singular: 'Definition',
        plural: 'Definitions',
        path: 'definition',
        columns: [{
            title: 'Type',
            key: 'parentType'
        }, {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi'

        }, ],
        filters: [{
            title: 'Basic Type',
            key: 'parentType'
        }]
    })

    controller.types.push({
        singular: 'Realm',
        plural: 'Realms',
        path: 'realm',
    })

    controller.types.push({
        singular: 'User',
        plural: 'Users',
        path: 'user',
        columns: [{
            title: 'Roles',
            key: 'permissionSets',
            renderer: 'permissionSet',
        }, {
            title: 'Realm',
            key: 'realms'
        }, {
            title: 'Status',
            key: 'status'
        }]
    })

    controller.types.push({
        singular: 'Event',
        plural: 'Events',
        path: 'event',
        /*columns: [{
            title: 'Start Date',
            key: 'startDate',
            filter: 'date',
        },
        {
            title: 'Realms',
            key: 'realms',
            renderer:'multi',
        }],
        */
        filters: [{
            title: 'Locations',
            key: 'locations',
        }, {
            title: 'Rooms',
            key: 'rooms',
        }],
        viewModes: ['calendar', 'cards']
    })

    controller.types.push({
        singular: 'Location',
        plural: 'Locations',
        path: 'location',
        columns: [{
            title: 'Address',
            key: 'addressLine1'
        }, {
            title: 'Suburb',
            key: 'suburb'
        }, {
            title: 'State',
            key: 'state'
        }, {
            title: 'Country',
            key: 'country'
        }, ],
        filters: [{
            title: 'State',
            key: 'state'
        }, {
            title: 'Country',
            key: 'country'
        }],
        viewModes: ['map']

    })

    controller.types.push({
        singular: 'Endpoint',
        plural: 'Endpoints',
        path: 'endpoint',
    })

    controller.types.push({
        singular: 'Account',
        plural: 'Accounts',
        path: 'account',
    })

    controller.types.push({
        singular: 'Collection',
        plural: 'Collections',
        path: 'collection',
        columns: [{
            title: 'Items',
            key: 'items.length'
        }, ]
    })

    controller.types.push({
        singular: 'Article',
        plural: 'Articles',
        path: 'article',
        columns: [{
            title: 'Author',
            key: 'author.name'
        }, {
            title: 'Tags',
            key: 'tags',
            renderer: 'multi',
        }, {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi',
        }]
    })

    controller.types.push({
        singular: 'Asset',
        plural: 'Assets',
        path: 'asset',
        columns: [{
            title: 'File Type',
            key: 'extension'
        }, {
            title: 'Tags',
            key: 'tags',
            renderer: 'multi',
        }, {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi',
        }, ],
        filters: [{
            title: 'File Type',
            key: 'extension'
        }]
    })

    controller.types.push({
        singular: 'Tag',
        plural: 'Tags',
        path: 'tag',
        filters: [{
            title: 'Type',
            key: 'restrictType'
        }]
    })

    controller.types.push({
        singular: 'Image',
        plural: 'Images',
        path: 'image',
        columns: [{
            title: 'Tags',
            key: 'tags',
            renderer: 'multi',
        },
        {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi',
        }, ],
        filters: [{
            title: 'Asset Type',
            key: 'assetType'
        }],
        viewModes: ['grid']

    })

    controller.types.push({
        singular: 'Audio',
        plural: 'Audio',
        path: 'audio',
        columns: [{
            title: 'File Type',
            key: 'extension'
        }, {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi',
        }, ],
        filters: [{
            title: 'File Type',
            key: 'extension'
        }, {
            title: 'Asset Type',
            key: 'assetType'
        }]
    })

    controller.types.push({
        singular: 'Video',
        plural: 'Videos',
        path: 'video',
        columns: [{
            title: 'File Type',
            key: 'extension'
        }, ],
        filter: [{
            title: 'Asset Type',
            key: 'assetType'
        }],
        viewModes: ['grid']
    })

    controller.types.push({
        singular: 'Site',
        plural: 'Sites',
        path: 'site',
        columns: [{
            title: 'Realms',
            key: 'realms',
            renderer: 'multi',
        }, ]
    })

    /////////////////////////////////////

    return {
        $get: function() {
            return controller;
        }
    };
})


.service('TypeService', function($q, Fluro, FluroContent, FluroAccess, TypeConfig, $resource) {

    var controller = {};

    ///////////////////

    controller.types = TypeConfig.types;

    ///////////////////

    controller.allTypes = function() {
        return [].concat(controller.types, controller.definedTypes);
    }


    ///////////////////

    controller.getTypeFromPath = function(path) {
        var primitive = _.find(TypeConfig.types, {
            path: path
        });

        if (primitive) {
            return primitive;
        } else {

            var defined = _.find(controller.definedTypes, {
                definitionName: path
            });

            if (defined) {
                return {
                    singular: defined.title,
                    plural: defined.plural,
                    path: defined.definitionName,
                    parentType: defined.parentType,
                }
            }

        }
    }

    ///////////////////

    controller.isBasicType = function(typeName) {
        return _.some(controller.types, function(type) {
            return type.path == typeName;
        })
    }

    ///////////////////

    controller.sideLoadDefinition = function(definition) {
        if(controller.definedTypes) {
            console.log('Side loaded', definition)
            controller.definedTypes.push(definition);
            controller.refreshMenuTree();
        }
    }

    ///////////////////

    controller.refreshDefinedTypes = function() {

        console.log('Refresh defined types')
        //if (controller.definedTypes) {
         //   return controller.definedTypes;
        //}

        //Make a new request
        controller.definedTypes = FluroContent.endpoint('defined', true, true).query();

        //Create the refresh request
        //controller.refreshRequest = true;

        //Clean up once done
        controller.definedTypes.$promise.then(function() {
            controller.refreshMenuTree();
            //delete controller.refreshRequest;
        })

        return controller.definedTypes;

    }

    ///////////////////

    controller.requiredBasicTypes = function() {

        return _.map(controller.definedTypes, function(def) {
            return def.parentType;
        })

    }


    ///////////////////

    controller.refreshMenuTree = function() {


        var grouped = _.groupBy(controller.definedTypes, function(defined) {
            return defined.parentType;
        });

        controller.menuTree = _.chain(controller.types)
            .map(function(type) {
                var children = grouped[type.path];


                var canAccess = FluroAccess.canAccess(type.path);

                if (canAccess && children) {
                    children.unshift(type);
                }

                type.children = children;

                if (canAccess || (children && children.length)) {
                    return type;
                } else {
                    return null;
                }
            })
            .compact()
            .value();

    }

    ///////////////////

    controller.getIcon = function(type) {
        if (type.parentType) {
            return type.parentType;
        } else {
            return type.path;
        }
    }

    ///////////////////

    controller.getAllCreateableTypes = function() {

        var primitives = _.chain(controller.types)
            .filter(function(type) {
                return FluroAccess.can('create', type.path);
            })
            .map(function(type) {
                type.icon = type.path;
                return type;
            })
            .value();

        var defined = _.chain(controller.definedTypes)
            .filter(function(type) {
                return FluroAccess.can('create', type.definitionName);
            })
            .each(function(type) {
                type.singular = type.title;
                type.path = type.definitionName;
                type.icon = type.parentType;
            })
            .value();

        return primitives.concat(defined);
    }


    ///////////////////

    return controller;
});