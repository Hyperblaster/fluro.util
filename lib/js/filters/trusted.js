angular.module('fluro.util')
.filter('trusted', ['$sce',
    function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }
]);



angular.module('fluro.util')
.filter('trustedResource', ['$sce',
    function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }
]);