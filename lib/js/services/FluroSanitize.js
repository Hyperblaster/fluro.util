

angular.module('fluro.util')
    .service('FluroSanitize', function() {
        var controller = {};

        //////////////////////////////////////////////////

        controller.stripTags = function(input, allowed) {

            //Replace All BR tags with \n
           
           


            //Check allowed tags
            allowed = (((allowed || '') + '')
                .toLowerCase()
                .match(/<[a-z][a-z0-9]*>/g) || [])
                .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)

            //Filter through tags
            var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
                commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

            //Replace all stuff that is scary
            var result = input.replace(commentsAndPhpTags, '')
                .replace(/\u00A0/g, ' ') //Replace &nbsp;
                .replace(/&nbsp;/g, ' ') //Replace &nbsp;
                .replace(tags, function($0, $1) {
                    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
                });
            /**/


            var element = angular.element('<div>' + result + '</div>');

            //Remove all style attributs
            element.find('*')
                .removeAttr('style');
            //.removeAttr('class');

            //Get the string
            var htmlString = element.eq(0).html();
            return htmlString;
        }

        //////////////////////////////////////////////////

        return controller;
    });