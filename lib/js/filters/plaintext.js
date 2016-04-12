angular.module('fluro.util')
    .filter('plaintext', function(FluroSanitize) {
        return function(text) {
            if (text) {

                //Strip Line breaks and replace with new lines
                 var lineBreakReg = /<br\s*[\/]?>/gi;
                text = text.replace(lineBreakReg, "\n");


                //return strip_tags(html, "<br><p><img><a><h1><h2><h3><h4><h5><h6><ol><ul><li>");

                return FluroSanitize.stripTags(text);
            } else {
                return text;
            }
        };
    });