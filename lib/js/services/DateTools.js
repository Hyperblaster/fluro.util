
'use strict';


angular.module('fluro.util')


.factory('DateTools', function() {

    var controller = {};

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