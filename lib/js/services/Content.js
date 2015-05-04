
'use strict';


angular.module('fluro.util')


.service('Content', function($resource, $cacheFactory, Fluro) {


    //////////////////////////////////////////////////

    var controller = {}

    //////////////////////////////////////////////////

    controller.genericResource = function(type, ignoreLoadingBar, noCache) {

        var cache = $cacheFactory.get(type + '-list');


        if(!cache) {
            console.log('Creating ', type + '-list')
            cache = $cacheFactory(type + '-list');
        }

        if(noCache) {
            cache = false;
        }

        console.log('Get Generic', type)
        return $resource(Fluro.apiURL + '/generic/' + type + '/:id', {}, {
            update: {
                method: 'PUT' // this method issues a PUT request
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

    //////////////////////////////////////////////////

    controller.resource = function(type, ignoreLoadingBar, noCache) {

        var cache = $cacheFactory.get(type + '-list');

        console.log('CACHE FOR', type, cache);
        if(!cache) {
        console.log('Creating ', type + '-list')

            cache = $cacheFactory(type + '-list');
        }
        
        if(noCache) {
            cache = false;
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