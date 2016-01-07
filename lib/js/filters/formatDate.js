angular.module('fluro.util').filter('formatDate', function(DateTools){
  return function(dateString, format){

  	// //Create the date object
  	// var date = new Date(dateString);

  	// //If theres a timezone specified
  	// if(Fluro.timezone) {
  	// 	//Alter the date according to the timezone
   //  	return 
  	// } 
  	
  	//Get the Localized date
  	var date = DateTools.localDate(dateString);
    
    //Return the date in the requested format
    return date.format(format);
  	
  };
})


// app.filter('formatDate', function(Fluro){


//   return function(dateString, format){

//   	//Create the date object
//   	var date = new Date(dateString);

//   	//If theres a timezone specified
//   	if(Fluro.timezone) {
//   		//Alter the date according to the timezone
      

//       //console.log('UTC DATE', date.UTC());
//     	//date = date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
//   	}
    
//     //Return the date in the requested format
//     return date.format(format);
  	
//   };


// })