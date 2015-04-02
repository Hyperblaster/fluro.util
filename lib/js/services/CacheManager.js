'use strict';


angular.module('fluro.util')

.service('CacheManager', function($resource, $cacheFactory) {

    //////////////////////////////////////////////////

    var controller = {}

    //////////////////////////////////////////////////
    
    controller.clear = function(type) {
        var cache = $cacheFactory.get(type +'-list');
        if(cache) {
            cache.removeAll();
        }
    }

    //////////////////////////////////////////////////

    return controller;


});