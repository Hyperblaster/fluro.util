
'use strict';


angular.module('fluro.util')


.filter('formatDate', function(){
  return function(dateString, format){
    return new Date(dateString).format(format)
  };
})



.filter("matchDate", function() {

    return function(items, dateString, style) {

        var date = new Date(dateString)

        return _.reduce(items, function(results, item) {

            var startDate;
            var endDate;

            //Get the start of the day
            if (item.startDate) {
                startDate = new Date(item.startDate);
                startDate.setHours(0, 0, 0, 0);
            }

            //Get the start of the day
            if (item.endDate) {
                endDate = new Date(item.endDate);
            }

            //Get the end of the day
            endDate.setHours(23, 59, 59, 999);

            //Turn into integers
            var checkTimestamp = date.getTime();
            var startTimestamp = startDate.getTime();
            var endTimestamp = endDate.getTime();
            
            switch (style) {
                case 'upcoming':
                    if(checkTimestamp <= startTimestamp || checkTimestamp <= endTimestamp) {
                        results.push(item);
                    }
                    break;
                default:
                    if(checkTimestamp >= startTimestamp && checkTimestamp <= endTimestamp) {
                        results.push(item)
                    }
                    break;
            }


            return results;
        }, []);

    };
})


.factory('DateTools', function() {

    var controller = {};

    ///////////////////////////////////////

    controller.isValidDate = function(d) {
        if (Object.prototype.toString.call(d) !== "[object Date]")
            return false;
        return !isNaN(d.getTime());
    }

    ///////////////////////////////////////

    controller.readableDateRange = function(startDate, endDate) {


        if(!_.isDate(startDate)) {
            startDate = new Date(startDate);
        }

        if(!_.isDate(endDate)) {
            endDate = new Date(endDate);
        }



        var today = new Date();
        var string = '';

        //We have a range
        if (startDate.format('d/m/y') != endDate.format('d/m/y')) {
            if (startDate.format('M Y') == endDate.format('M Y')) {
                string = startDate.format('l j') + ' - ' + endDate.format('l j F');
            } else {
                string = startDate.format('l j F') + ' until ' + endDate.format('l j F');
            }

            //Append the year if the year is different from now
            if (today.format('Y') != endDate.format('Y')) {
                string = string + ' ' + endDate.format('Y');
            }
        } else {
            if (startDate) {
                string = startDate.format('l j F');

                //Append the year if the year is different from now
                if (today.format('Y') != startDate.format('Y')) {
                    string = string + ' ' + startDate.format('Y');
                }
            }
        }



        return string;
    }

    ///////////////////////////////////////

    return controller;

});