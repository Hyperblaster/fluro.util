
angular.module('fluro.util').filter('divide', function() {
  
    var func = function(array, chunk) {
        
        if(!array) {
            array =[];
        }
        
        var div = Math.floor(array.length / chunk);

        if(!div) {
            div = 1;
        }
                
        var chunked = _.chunk(array, div);
            return chunked
    }
      return _.memoize(func);
})

//////////////////////////////////////////////////////////

angular.module('fluro.util').filter('chunk', function() {
  
    var func = function(array, chunk) {
        var chunked = _.chunk(array, chunk);
            return chunked
    }
    
      return _.memoize(func);
});
