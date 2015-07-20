angular.module('fluro.util').service('FluroStorage', function($rootScope, $localStorage, $sessionStorage) {


    /////////////////////////////////////////////////////

    var controller = {}

    /////////////////////////////////////////////////////
    
    controller.resetSessionStorage = function() {
        if($rootScope.user) {
            $sessionStorage[$rootScope.user._id] = {};
        }
    }

    /////////////////////////////////////////////////////
    
    controller.resetLocalStorage = function() {
        if($rootScope.user) {
            $localStorage[$rootScope.user._id] = {};
        }
    }

    /////////////////////////////////////////////////////

    controller.sessionStorage = function(key) {
        if($rootScope.user) {
            if(!$sessionStorage[$rootScope.user._id]) {
                $sessionStorage[$rootScope.user._id] = {}
            }

            if(!$sessionStorage[$rootScope.user._id][key]) {
                $sessionStorage[$rootScope.user._id][key] = {}
            }

            return $sessionStorage[$rootScope.user._id][key];
        }
    }

    controller.localStorage = function(key) {
        if($rootScope.user) {
            if(!$localStorage[$rootScope.user._id]) {
                $localStorage[$rootScope.user._id] = {}
            }

            if(!$localStorage[$rootScope.user._id][key]) {
                $localStorage[$rootScope.user._id][key] = {}
            }

            return $localStorage[$rootScope.user._id][key];
        }
    }

    /////////////////////////////////////////////////////

    return controller;
});