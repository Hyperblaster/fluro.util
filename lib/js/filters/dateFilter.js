


app.filter('formatDate', function(){
  return function(dateString, format){
    return new Date(dateString).format(format)
  };
});
