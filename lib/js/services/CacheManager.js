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
       // console.log('Clear', type, 'cache');
        
        var cache = $cacheFactory.get(type +'-list');
        if(cache) {
            //console.log('CacheManager Clear Cache', type + '-list')
            cache.removeAll();
        }
    }

    //////////////////////////////////////////////////
    
    controller.clearAll = function() {
       // console.log('Clear all caches')
        _.each(_caches, function(cache) {
            //console.log('Clearing cache', cache);
            cache.removeAll();
        })
    }

    //////////////////////////////////////////////////

    return controller;


});