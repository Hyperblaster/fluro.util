

angular.module('fluro.util').filter("matchDate", function(Fluro, DateTools) {

    return function(items, dateString, style) {

        var date = new Date(dateString)

        return _.reduce(items, function(results, item) {

            var startDate;
            var endDate;


            ////////////////////////////////////////

            //Get the start of the day
            if (item.startDate) {

                if(Fluro.timezoneOffset) {
                   startDate = DateTools.localDate(item.startDate);
                } else {
                    startDate = new Date(item.startDate);
                }
                startDate.setHours(0, 0, 0, 0);
            }

            ////////////////////////////////////////

            //Get the start of the day
            if (item.endDate) {
                if(Fluro.timezoneOffset) {
                   startDate = DateTools.localDate(item.endDate);
                } else {
                    startDate = new Date(item.endDate);
                }
               // endDate = new Date(item.endDate);
            }

            //Get the end of the day
            endDate.setHours(23, 59, 59, 999);

            ////////////////////////////////////////

            //Turn into integers
            var checkTimestamp = date.getTime();
            var startTimestamp = startDate.getTime();
            var endTimestamp = endDate.getTime();

            switch (style) {
                case 'upcoming':
                    if (checkTimestamp <= startTimestamp || checkTimestamp <= endTimestamp) {
                        results.push(item);
                    }
                    break;
                default:
                    if (checkTimestamp >= startTimestamp && checkTimestamp <= endTimestamp) {
                        results.push(item)
                    }
                    break;
            }


            return results;
        }, []);

    };
});

angular.module('fluro.util').service('DateTools', function(Fluro) {


    var controller = {};

    ///////////////////////////////////////

    controller.calculateAge = function(d) {
        var today; //= new Date();
        var birthDate;// = new Date(d);


        if(Fluro.timezoneOffset) {
            today = controller.localDate();
            birthDate = controller.localDate(d);
        } else {
            today = new Date();
            birthDate = new Date(d);
        }

        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;

    }

    ///////////////////////////////////////

    controller.localDate = function(d, specifiedTimezone) {

        //Date
        var date;// = new Date(d);

        if(!d) {
            date = new Date();
        } else {
            date = new Date(d);
        }

        ///////////////////////////////////////////

        var timezoneOffset;
        var browserOffset = date.getTimezoneOffset();

        ///////////////////////////////////////////

        if(!specifiedTimezone) {
            specifiedTimezone = Fluro.timezone;
        }

        if(specifiedTimezone) {

            if(!window.moment) {
                console.log('Moment is not defined')
                return date;
            }
            // console.log('MOMENT TIMEZONE 2', moment.tz(date, Fluro.timezone).utcOffset());
            timezoneOffset = window.moment.tz(date, specifiedTimezone).utcOffset();
            browserOffset = window.moment(date).utcOffset();

            var difference = (timezoneOffset - browserOffset);
            var offsetDifference = difference * 60 * 1000;

            var prevDate = new Date(date);


            date.setTime(date.getTime() + offsetDifference);
            //console.log('TIMEZONE', timezoneOffset, browserOffset, timezoneOffset - browserOffset, 'hours');
        }

        return date;
    }

    ///////////////////////////////////////

    controller.expired = function(d, specifiedTimezone) {
        var today;// = new Date();
        var checkDate;// = new Date(d);


        if(Fluro.timezoneOffset) {
            today = controller.localDate();
            checkDate = controller.localDate(d);
        } else {
            today = new Date();
            checkDate = new Date(d);
        }

        return today > checkDate;
    }

    ///////////////////////////////////////

    controller.isValidDate = function(d) {
        if (Object.prototype.toString.call(d) !== "[object Date]")
            return false;
        return !isNaN(d.getTime());
    }

    ///////////////////////////////////////

    controller.readableDateRange = function(startDate, endDate, options) {

        if(!options) {
            options = {};
        }

        if(!options.timezone) {
            options.timezone = Fluro.timezone;
        }

    


        //////////////////////////////////////////

        if (!_.isDate(startDate)) {
            if(options.timezone) {
                startDate = controller.localDate(startDate);
            } else {
                startDate = new Date(startDate);
            }
        }

        if (!_.isDate(endDate)) {
            if(options.timezone) {
                endDate = controller.localDate(endDate);
            } else {
                endDate = new Date(endDate);
            }
        }

        //////////////////////////////////////////

        var today;

        if(options.timezone) {
            today = controller.localDate();
        } else {
            today = new Date();
        }

        //////////////////////////////////////////

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