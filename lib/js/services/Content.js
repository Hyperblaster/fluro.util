
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