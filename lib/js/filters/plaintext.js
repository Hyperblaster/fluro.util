angular.module('fluro.util')
.filter('plaintext', function() {
    return function(text) {
        if (text) {
            return String(text).replace(/<[^>]+>/gm, '');
        } else {
            return text;
        }
    };
});