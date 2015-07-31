app.filter('trusted', ['$sce',
    function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }
]);



app.filter('trustedResource', ['$sce',
    function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }
]);