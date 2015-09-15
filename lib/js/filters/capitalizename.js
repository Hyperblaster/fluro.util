angular.module('fluro.util').filter('capitalizename', function() {
        return function(text) {
            if (text) {
                return text.replace(/\w\S*/g, function(txt){

                    console.log('REPLACE',txt);
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            } else {
                return text;
            }
        };
    });

