angular.module('fluro.util').filter('capitalizename', function() {
        return function(text) {
            if (text) {
                return text.replace(/\w\S*/g, function(txt){

                    var name = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

                    //Fix Mc Names
                    name = name.replace(/Mc[a-z]/, function (k) {
                          return 'Mc' + k[2].toUpperCase();
                        });

                   return name;


                });
            } else {
                return text;
            }
        };
    });

