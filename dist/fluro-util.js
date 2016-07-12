
//Create Fluro UI With dependencies
angular.module('fluro.util', [
	'fluro.config',
	'ngStorage',
	]);

(function() {
    
    Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    Date.longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    Date.shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    Date.longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // defining patterns
    var replaceChars = {
        // Day
        d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
        D: function() { return Date.shortDays[this.getDay()]; },
        j: function() { return this.getDate(); },
        l: function() { return Date.longDays[this.getDay()]; },
        N: function() { return (this.getDay() == 0 ? 7 : this.getDay()); },
        S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
        w: function() { return this.getDay(); },
        z: function() { var d = new Date(this.getFullYear(),0,1); return Math.ceil((this - d) / 86400000); }, // Fixed now
        // Week
        W: function() { 
            var target = new Date(this.valueOf());
            var dayNr = (this.getDay() + 6) % 7;
            target.setDate(target.getDate() - dayNr + 3);
            var firstThursday = target.valueOf();
            target.setMonth(0, 1);
            if (target.getDay() !== 4) {
                target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
            }
            return 1 + Math.ceil((firstThursday - target) / 604800000);
        },
        // Month
        F: function() { return Date.longMonths[this.getMonth()]; },
        m: function() { return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1); },
        M: function() { return Date.shortMonths[this.getMonth()]; },
        n: function() { return this.getMonth() + 1; },
        t: function() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, // Fixed now, gets #days of date
        // Year
        L: function() { var year = this.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
        o: function() { var d  = new Date(this.valueOf());  d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
        Y: function() { return this.getFullYear(); },
        y: function() { return ('' + this.getFullYear()).substr(2); },
        // Time
        a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
        A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
        B: function() { return Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
        g: function() { return this.getHours() % 12 || 12; },
        G: function() { return this.getHours(); },
        h: function() { return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12); },
        H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
        i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
        s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
        u: function() { var m = this.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ?
    '0' : '')) + m; },
        // Timezone
        e: function() { return "Not Yet Supported"; },
        I: function() {
            var DST = null;
                for (var i = 0; i < 12; ++i) {
                        var d = new Date(this.getFullYear(), i, 1);
                        var offset = d.getTimezoneOffset();
    
                        if (DST === null) DST = offset;
                        else if (offset < DST) { DST = offset; break; }                     else if (offset > DST) break;
                }
                return (this.getTimezoneOffset() == DST) | 0;
            },
        O: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00'; },
        P: function() { return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
        T: function() { return this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); },
        Z: function() { return -this.getTimezoneOffset() * 60; },
        // Full Date/Time
        c: function() { return this.format("Y-m-d\\TH:i:sP"); }, // Fixed now
        r: function() { return this.toString(); },
        U: function() { return this.getTime() / 1000; }
    };

    // Simulates PHP's date function
    Date.prototype.format = function(format) {
        var date = this;
        return format.replace(/(\\?)(.)/g, function(_, esc, chr) {
            return (esc === '' && replaceChars[chr]) ? replaceChars[chr].call(date) : chr;
        });
    };

}).call(this);

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



angular.module('fluro.util').filter('divide', function() {
  
    var func = function(array, chunk) {
        
        if(!array) {
            array =[];
        }
        
        var div = Math.floor(array.length / chunk);
                
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
angular.module('fluro.util')
.filter('trusted', ['$sce',
    function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }
])
.filter('trustedResource', ['$sce',
    function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }
]);
'use strict';


angular.module('fluro.util')

.service('CacheManager', function($resource, $cacheFactory) {

    //////////////////////////////////////////////////

    var controller = {}

    //////////////////////////////////////////////////
    
    var _caches = [];

    //////////////////////////////////////////////////

    controller.get = function(type) {

        var cache = $cacheFactory.get(type + '-list');

        
        if(!cache) {
            //console.log('Creating ', type + '-list')
            cache = $cacheFactory(type + '-list');
            _caches.push(cache);
        }

        return cache;
    }

    //////////////////////////////////////////////////
    
    controller.clear = function(type) {
       // console.log('Clear', type, 'cache');
        
        var cache = $cacheFactory.get(type +'-list');
        if(cache) {
            //console.log('CacheManager Clear Cache', type + '-list')
            cache.removeAll();
        }
    }

    //////////////////////////////////////////////////
    
    controller.clearAll = function() {
       // console.log('Clear all caches')
        _.each(_caches, function(cache) {
            //console.log('Clearing cache', cache);
            cache.removeAll();
        })
    }

    //////////////////////////////////////////////////

    return controller;


});
angular.module('fluro.util')
.factory('ContentSelection', function() {

    var ContentSelection = function() {

        //keep track of this
        var controller = this;
        controller.items = [];
        controller.multiInstance = false;
        controller.trackValue = '_id';

        ////////////////////////////////////////////////////

        var _minimum = 0;
        var _maximum = 0;

        ////////////////////////////////////////////////////

        //Item or ID
        controller.contains = function(item) {
            var id = item;

            //Checking if an object is in the controller
            if (_.isObject(item)) {

                //Check if the item has a track value
                if (item.hasOwnProperty(controller.trackValue)) {
                    id = item[controller.trackValue];
                } else {
                    //Key is undefined on object
                    console.log('Undefined track value: ', controller.trackValue, 'For item', item);
                    return true;
                }
            }

            var result = _.any(controller.items, function(existingItem) {

                if (_.isObject(existingItem)) {
                    if (existingItem.hasOwnProperty(controller.trackValue)) {
                        return existingItem[controller.trackValue] == id;
                    } else {
                        return existingItem;
                    }
                } else {
                    return existingItem == id;
                }
            });



            return result;
        }

        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////

        //Item or ID
        controller.toggle = function(item) {
            //Check if this item is already selected
            var alreadySelected = controller.contains(item);

            if (alreadySelected) {
                controller.remove(item);
            } else {
                controller.add(item);
            }
        }


        ////////////////////////////////////////////////////
        ////////////////////////////////////////////////////

        //Item or ID
        controller.add = function(item) {


            if (_.isObject(item)) {
                //If the item does not have the track value
                if (!item.hasOwnProperty(controller.trackValue)) {
                    console.log('Track value ' + "'" + controller.trackValue + "'" + ' Not found on proposed item', item)
                    return;
                }
            }

            if (controller.contains(item)) {
                if (!controller.multiInstance) {
                    console.log('Only allowed one instance of item', item)
                    //Stop here because we are only allowed one instance of each item
                    return;
                }
            }




            //If we are already at the maximum
            if (_maximum) {
                if (controller.items.length >= _maximum) {
                    if (_maximum == 1) {
                        controller.only(item);
                    }
                    //We have hit the limit already
                    return;
                }
            }

            controller.items.push(item);
            return true;
        }

        ////////////////////////////////////////////////////

        controller.removeDuplicates = function() {

            //Only keep unique values
            controller.items = _.uniq(controller.items, function(item) {

                if (_.isObject(item)) {
                    if (item.hasOwnProperty(controller.trackValue)) {
                        return item[controller.trackValue];
                    } else {
                        return item;
                    }
                } else {
                    return item;
                }
            });
        }

        ////////////////////////////////////////////////////

        controller.addMultiple = function(array) {

            //Add the items to our controller
            controller.items = controller.items.concat(array);

            if (!controller.multiInstance) {
                controller.removeDuplicates();
            }
        }

        //////////////////////////////////////////////

        controller.only = function(item) {
            controller.items.length = 0;
            controller.add(item);
        }

        ////////////////////////////////////////////////////

        controller.onlyMultiple = function(items) {
            controller.items = items;

            if (!controller.multiInstance) {
                controller.removeDuplicates();
            }
        }

        ////////////////////////////////////////////////////

        //Item or ID
        controller.remove = function(item) {

            var id = item;
            if (_.isObject(item)) {
                id = item[controller.trackValue];
            }

            _.remove(controller.items, function(existingItem) {

                if (_.isObject(existingItem)) {
                    if (existingItem.hasOwnProperty(controller.trackValue)) {
                        return (existingItem[controller.trackValue] == id);
                    } else {
                        return existingItem == id;
                    }
                } else {
                    return existingItem == id;
                }
            });
        }

        //////////////////////////////////////////////

        controller.removeMultiple = function(array) {

            _.remove(controller.items, function(existingItem) {
               return _.contains(array, existingItem);
            })
        }

        //////////////////////////////////////////////

        Object.defineProperty(controller, 'ids', {

            get: function() {

                return _.map(controller.items, function(item) {

                    if (_.isObject(item)) {
                        if (item.hasOwnProperty('_id')) {
                            return item._id;
                        } else {
                            return item;
                        }
                    } else {
                        return item;
                    }
                })
            }
        });

        //////////////////////////////////////////////

        controller.clear = function() {
            controller.items.length = 0;
        }

        //////////////////////////////////////////////

        Object.defineProperty(controller, 'length', {
            get: function() {
                return controller.items.length;
            }
        });


        //////////////////////////////////////////////

        Object.defineProperty(controller, 'minimum', {
            get: function() {
                return _minimum;
            },
            set: function(m) {
                _minimum = m;
            }
        });

        //////////////////////////////////////////////

        Object.defineProperty(controller, 'maximum', {
            get: function() {
                return _maximum;
            },
            set: function(m) {
                //console.log('Set Maximum to ', m)
                _maximum = m;
            }
        });

        //////////////////////////////////////////////

        controller.set = function(array) {
            controller.items = array;
        }

        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////
        //////////////////////////////////////////////

        //Return the instance
        return controller;
    }

    return ContentSelection;

});
'use strict';


angular.module('fluro.util')

.filter("matchDate", function(Fluro, DateTools) {

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
})

.service('DateTools', function(Fluro) {


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

    controller.localDate = function(d) {

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

        if(Fluro.timezone) {
            // console.log('MOMENT TIMEZONE 2', moment.tz(date, Fluro.timezone).utcOffset());
            timezoneOffset = moment.tz(date, Fluro.timezone).utcOffset();
            browserOffset = moment(date).utcOffset();

            var difference = (timezoneOffset - browserOffset);
            var offsetDifference = difference * 60 * 1000;

            var prevDate = new Date(date);


            date.setTime(date.getTime() + offsetDifference);
            //console.log('TIMEZONE', timezoneOffset, browserOffset, timezoneOffset - browserOffset, 'hours');
        }

        return date;
    }

    ///////////////////////////////////////

    controller.expired = function(d) {
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

        //////////////////////////////////////////

        if (!_.isDate(startDate)) {
            if(Fluro.timezoneOffset) {
                startDate = controller.localDate(startDate);
            } else {
                startDate = new Date(startDate);
            }
        }

        if (!_.isDate(endDate)) {
            if(Fluro.timezoneOffset) {
                endDate = controller.localDate(endDate);
            } else {
                endDate = new Date(endDate);
            }
        }

        //////////////////////////////////////////

        var today;

        if(Fluro.timezoneOffset) {
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
// angular.module('fluro.util')

// .service('Asset', function(Fluro, $window) {

//     var controller = {}

//     /////////////////////////////////////////////////////

//     controller.getUrl = function(id, params) {

//         var extension;

//         ////////////////////////////////////

//         if (params && _.isString(params)) {
//             extension = params;
//         }

//         ////////////////////////////////////
        
//         if (!params) {
//             params = {};
//         }

//         ////////////////////////////////////

//         // console.log('Get Asset URL', id)
//         var url = Fluro.apiURL + '/get/' + id;

//         ////////////////////////////////////

//         //Monkey patch for now
//         if (extension) {
//             params.extension = extension;
//         }

//         ////////////////////////////////////
       
//         if(params.extension && params.extension.length) {
//             url += '/file/file.' + params.extension;

//             //Dont need to include it anymore
//             delete params.extension;
//         }

//         ////////////////////////////////////////

//         //If we haven't requested without token
//         if(!params.withoutToken) {

//             //Check to see if we have a token and none has been explicity set
//             if (!params['access_token'] && Fluro.token) {
//                 params['access_token'] = Fluro.token;
//             }
//         }

//         ////////////////////////////////////////

//         var queryParams = _.map(params, function(v, k) {
//             return encodeURIComponent(k) + '=' + encodeURIComponent(v);
//         }).join('&');

//         if (queryParams.length) {
//             url += '?' + queryParams;
//         }

//         return url;
//     }

//     /////////////////////////////////////////////////////

//     controller.thumbnailUrl = function(id) {
//         // console.log('Get Asset URL', id)
//         var url = Fluro.apiURL + '/get/' + id + '?w=50';

//         if (Fluro.token) {
//             url += '?access_token=' + Fluro.token;
//         }

//         return url;
//     }

//     //////////////////////////////////////////////////

//     controller.imageUrl = function(_id, w, h, params) {

//         if (!params) {
//             params = {};
//         }

//         var url = Fluro.apiURL + '/get/' + _id; // + '?dimensions';

//         //////////////////////////////////////

//         var limitWidth = 1920;

//         if ($window.screen.width <= 768) {
//             limitWidth = 1536;
//         }

//         if ($window.screen.width <= 320) {
//             limitWidth = 640;
//         }

//         ////////////////////////////////////
//         if (!w && !h) {
//             //url += '&w=' + limitWidth;
//             params['w'] = limitWidth;
//         } else {

//             if (w) {
//                 // url += '&w=' + w;
//                 params['w'] = w;
//             }

//             if (h) {
//                 //url += '&h=' + h;
//                 params['h'] = h;
//             }
//         }


//         ////////////////////////////////////
       
//         if(params.extension && params.extension.length) {
//             url += '/file/file.' + params.extension;

//             //Dont need to include it anymore
//             delete params.extension;
//         }

//         ////////////////////////////////////////

//         //If we haven't requested without token
//         if(!params.withoutToken) {

//             //Check to see if we have a token and none has been explicity set
//             if (!params['access_token'] && Fluro.token) {
//                 params['access_token'] = Fluro.token;
//             }
//         }

//         ////////////////////////////////////////


//         var queryParams = _.map(params, function(v, k) {
//             return encodeURIComponent(k) + '=' + encodeURIComponent(v);
//         }).join('&');


//         if (queryParams.length) {
//             url += '?' + queryParams;
//         }


//         // if (Fluro.token) {
//         //     url += '&access_token=' + Fluro.token;
//         // }

//         return url;
//     }


//     /////////////////////////////////////////////////////

//     controller.downloadUrl = function(id) {

//         var url = Fluro.apiURL + '/download/' + id;

//         if (Fluro.token) {
//             url += '?access_token=' + Fluro.token;
//         }

//         return url;

//     }

//     /////////////////////////////////////////////////////

//     controller.isAssetType = function(object) {

//         switch (object._type) {
//             case 'asset':
//             case 'video':
//             case 'audio':
//             case 'image':
//                 return true;
//                 break;
//             default:
//                 return false;
//                 break;
//         }
//     }

//     /////////////////////////////////////////////////////

//     return controller;
// });


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


            var element = $('<div>' + result + '</div>');

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
angular.module('fluro.util').service('FluroStorage', function($rootScope, $localStorage, $sessionStorage) {


    /////////////////////////////////////////////////////

    var controller = {}

    /////////////////////////////////////////////////////
    
    controller.resetSessionStorage = function() {
        if($rootScope.user) {
            $sessionStorage[$rootScope.user._id] = {};
        }
    }

    /////////////////////////////////////////////////////
    
    controller.resetLocalStorage = function() {
        if($rootScope.user) {
            $localStorage[$rootScope.user._id] = {};
        }
    }

    /////////////////////////////////////////////////////

    controller.sessionStorage = function(key) {
        if($rootScope.user) {
            if(!$sessionStorage[$rootScope.user._id]) {
                $sessionStorage[$rootScope.user._id] = {}
            }

            if(!$sessionStorage[$rootScope.user._id][key]) {
                $sessionStorage[$rootScope.user._id][key] = {}
            }

            return $sessionStorage[$rootScope.user._id][key];
        }
    }

    controller.localStorage = function(key) {
        if($rootScope.user) {
            if(!$localStorage[$rootScope.user._id]) {
                $localStorage[$rootScope.user._id] = {}
            }

            if(!$localStorage[$rootScope.user._id][key]) {
                $localStorage[$rootScope.user._id][key] = {}
            }

            return $localStorage[$rootScope.user._id][key];
        }
    }

    /////////////////////////////////////////////////////

    return controller;
});
angular.module('fluro.util')
.factory('ObjectSelection', function() {

    var ObjectSelection = function() {

        var controller = {
        	items:[],
        	item:null,
        }
       

        //////////////////////////////////
        controller.multiple = true;
        controller.minimum = 0;
        controller.maximum = 0;

        //////////////////////////////////

        controller.select = function(item) {
            if (controller.multiple) {
                if (!_.contains(controller.items, item)) {
                    controller.items.push(item);
                }
            } else {
                controller.item = item;
            }
        }

        //////////////////////////////////

        controller.deselect = function(item) {
            if (controller.multiple) {
                _.pull(controller.items, item);
            } else {
            	controller.item = null;
            }
        }

        //////////////////////////////////

        controller.toggle = function(item) {
        	if (controller.multiple) {
	            if (_.contains(controller.items, item)) {
	                controller.deselect(item);
	            } else {
	                controller.select(item);
	            }
	        } else {
	        	if(controller.item == item) {
	        		controller.item = null;
	        	} else {
	        		controller.item = item;
	        	}
	        }
        }

        //////////////////////////////////

        controller.contains = function(item) {
        	if(controller.multiple) {
            	return _.contains(controller.items, item)
        	} else {
            	return controller.item == item;
        	}
        }

        //////////////////////////////////

        return controller;
    }

    return ObjectSelection;

});
'use strict';


angular.module('fluro.util')
.factory('Playlist', function() {

    function Playlist() {

        //Scope
        var _this = this;

        //Items
        var _items = [];
        var _index = 0;
        var _loop = true;
        var _direction = 'forwards';

        /////////////////////////////

        this.__defineSetter__("index", function(i) {

            if(i < _index) {
                _direction = 'backwards';
            } else {
                _direction = 'forwards';
            }

            if (i != _index) {

                _index = i;
            }
        });

        this.__defineGetter__("index", function() {
            return _index;
        });


        /////////////////////////////

        this.__defineGetter__("direction", function() {
            return _direction;
        });

        /////////////////////////////

        this.__defineGetter__("currentItem", function() {
            return _items[_index];
        });

        /////////////////////////////

        this.__defineGetter__("length", function() {
            return _items.length;
        });

        /////////////////////////////

        this.indexOf = function(object) {
            return _items.indexOf(object);
        }

        /////////////////////////////

        this.select = function(object) {

           var i = _items.indexOf(object);
           if(i != -1) {
                _this.index = i;
           }
        }

        /////////////////////////////

        this.__defineGetter__("items", function() {
            return _items;
        });

        this.__defineSetter__("items", function(array) {
            _items = array;
            _index = 0;
        });


        /////////////////////////////

        this.__defineGetter__("previousEnabled", function() {
            if(_loop) {
                return true;
            } else {
                return (_index > 0);
            }
        });

        this.__defineGetter__("nextEnabled", function() {
            if(_loop) {
                return true;
            } else {
                return (_index < (_items.length-1));
            }
        });


        /////////////////////////////

        this.__defineGetter__("loop", function() {
            return _loop;
        });

        this.__defineSetter__("loop", function(bol) {
            _loop = bol;
        });

        /////////////////////////////

        this.next = function() {

            if (_index < (_items.length - 1)) {
                _this.index = _index + 1;
            } else if (_loop) {
                _this.index = 0;
            }
        };

        /////////////////////////////

        this.previous = function() {

            if (_index > 0) {
                _this.index = _index - 1;
            } else if (_loop) {
                _this.index = (_items.length - 1);
            }
        };

        /////////////////////////////

        this.addItem = function(item) {
            _items.push(item);
            return item;
        }

        /////////////////////////////

        this.addItemAt = function(item, pos) {
            _items.splice(pos, 0, item);
            return item;
        }

        /////////////////////////////

        this.removeItem = function(item) {

            var _itemIndex = _items.indexOf(item);
            var _result = _items[_itemIndex];

            if (_itemIndex != -1) {
                _items.splice(_itemIndex, 1);
            }

            return _result;
        }

        /////////////////////////////

        this.clear = function() {
            _items = new Array();
            _index = 0;
        }

        /////////////////////////////
        /////////////////////////////
        /////////////////////////////

        return _this;
    }

    return Playlist;

});
/**
angular.module('fluro.util')
.service('TypeService', function($q, Fluro, FluroContent, FluroAccess, TypeConfig, $resource) {


	var controller = {};

	////////////////////////////////////

	controller.refresh = function() {

	}

});

/**/
// angular.module('fluro.util')
//     .provider('TypeConfig', function() {


//         //Define all of our Content Types
//         var controller = {
//             types: []
//         };

//         controller.types.push({
//             singular: 'Role',
//             plural: 'Roles',
//             path: 'role',
//             columns: [{
//                 title: 'Applications',
//                 key: 'applicationKeys'
//             }],
//         })


//         controller.types.push({
//             singular: 'Family',
//             plural: 'Families',
//             path: 'family',
//             columns: [{
//                 title: 'Names',
//                 key: 'firstLine'
//             }],
//         })



//         controller.types.push({
//             singular: 'Scheduled Task',
//             plural: 'Scheduled Tasks',
//             path: 'task',
//         })

//         controller.types.push({
//             singular: 'Checkin',
//             plural: 'Checkins',
//             path: 'checkin',
//             columns: [{
//                     title: 'Event',
//                     key: 'event'
//                 }, {
//                     title: 'Contact',
//                     key: 'contact'
//                 },

//                 {
//                     title: 'Check in date',
//                     key: 'created',
//                     renderer: 'date'
//                 }, {
//                     title: 'Checked in time',
//                     key: 'created',
//                     renderer: 'time'
//                 }, {
//                     title: 'Checked out',
//                     key: 'checkout.date',
//                     renderer: 'time'
//                 }
//             ],
//         })

//         controller.types.push({
//             singular: 'Reaction',
//             plural: 'Reactions',
//             path: 'reaction',
//         })

//         controller.types.push({
//             singular: 'Policy',
//             plural: 'Permission Policies',
//             path: 'policy',
//             columns: [{
//                 title: 'Permissions',
//                 key: 'permissionSets',
//                 renderer: 'permissionSet',
//             }, {
//                 title: 'Realm',
//                 key: 'realms'
//             }, {
//                 title: 'Status',
//                 key: 'status'
//             }]
//         })

//         controller.types.push({
//             singular: 'Team',
//             plural: 'Teams',
//             path: 'team',
//             columns: [
//             /**{
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'multi'

//             }, /**/
//             {
//                 title: 'Tags',
//                 key: 'tags',
//                 renderer: 'multi'

//             }],
//             filters: [
//                 /**
//         {
//             title: 'Team members',
//             key: 'assignments.contacts'
//         },
       
//         {
//             title: 'Title',
//             key: 'title'
//         },

//         {
//             title: 'Assignment count',
//             key: 'assignments'
//         }
//         /**/
//             ]
//         })

//         controller.types.push({
//             singular: 'Plan',
//             plural: 'Plans',
//             path: 'plan',
//             columns: [
//                 /**  
//         {

//             title: 'Event',
//             key: 'event',
//             renderer: 'multi'
//         },
//         /**/
//                 {
//                     title: 'Time',
//                     key: 'startDate',
//                     renderer: 'time'
//                 }, {
//                     title: 'Date',
//                     key: 'startDate',
//                     renderer: 'date'
//                 }, 
// /**
//                 {
//                     title: 'Realms',
//                     key: 'realms',
//                     renderer: 'multi'

//                 }, 
//                 /**/
//                 {
//                     title: 'Tags',
//                     key: 'tags',
//                     renderer: 'multi'

//                 }
//             ]
//         })

//         controller.types.push({
//             singular: 'Code',
//             plural: 'Code',
//             path: 'code',
//             columns: [{
//                 title: 'Syntax',
//                 key: 'syntax'
//             }],
//             filters: [{
//                 title: 'Syntax',
//                 key: 'syntax'
//             }]
//         })

//         controller.types.push({
//             singular: 'Component',
//             plural: 'Components',
//             path: 'component',
//             /*columns: [{
//             title: 'Syntax',
//             key: 'syntax'
//         }],
//         filters: [{
//             title: 'Syntax',
//             key: 'syntax'
//         }]*/
//         })


//         controller.types.push({
//             singular: 'Query',
//             plural: 'Queries',
//             path: 'query',
//             columns: [{
//                 title: 'Limit',
//                 key: 'limit'
//             }]
//         })

//         controller.types.push({
//             singular: 'Package',
//             plural: 'Packages',
//             path: 'package',
//         })

//         controller.types.push({
//             singular: 'Contact',
//             plural: 'Contacts',
//             path: 'contact',
//             columns: [{
//                 title: 'First Name',
//                 key: 'firstName',
//                 filter: 'capitalizename'
//             }, {
//                 title: 'Last Name',
//                 key: 'lastName',
//                 filter: 'capitalizename'
//             }, {
//                 title: 'Gender',
//                 key: 'gender'
//             }, {
//                 title: 'Family',
//                 key: 'family'
//             }, 
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'realm'
//             }
// /**/
//             ],
//             filters: [{
//                 title: 'Gender',
//                 key: 'gender'
//             }]
//         })

//         controller.types.push({
//             singular: 'Contact Details',
//             plural: 'Contact Details',
//             path: 'contactdetail',
//             columns: [{
//                 title: 'First Name',
//                 key: 'contact.firstName'
//             }, {
//                 title: 'Last Name',
//                 key: 'contact.lastName'
//             }]
//         })



//         controller.types.push({
//             singular: 'Purchase',
//             plural: 'Purchases',
//             path: 'purchase',
//             columns: [{
//                 title: 'Customer',
//                 key: 'owner.name'
//             }, {
//                 title: 'Amount',
//                 key: 'transaction.amount'
//             }, {
//                 title: 'Tags',
//                 key: 'tags',
//                 renderer: 'multi',
//             }, 
//             {
//                 title: 'Collection Email',
//                 key: 'collectionEmail'
//             }, {
//                 title: 'Transaction',
//                 key: 'transaction._id'
//             }],
//             filters: [{
//                 title: 'Tags',
//                 key: 'tags'
//             }]
//         })

//         controller.types.push({
//             singular: 'Product',
//             plural: 'Products',
//             path: 'product',
//             columns: [{
//                 title: 'Amount',
//                 key: 'amount'
//             }, {
//                 title: 'License',
//                 key: 'license'
//             }],
//             filters: [{
//                 title: 'License',
//                 key: 'license'
//             }]
//         })


//         controller.types.push({
//             singular: 'Transaction',
//             plural: 'Transactions',
//             path: 'transaction',
//             columns: [{
//                 title: 'Amount',
//                 key: 'amount'
//             }, {
//                 title: 'Payment',
//                 key: 'paymentStatus'
//             }, {
//                 title: 'Mode',
//                 key: 'mode'
//             }, {
//                 title: 'Date',
//                 key: 'created',
//                 renderer: 'datetime'
//             }, 
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'realm'
//             }
// /**/
//             ],
//             filters: [{
//                 title: 'Payment Status',
//                 key: 'paymentStatus'
//             }, {
//                 title: 'Mode',
//                 key: 'mode'
//             }]
//         })

//         controller.types.push({
//             singular: 'Application',
//             plural: 'Applications',
//             path: 'application',
//             columns: [{
//                 title: 'Type',
//                 key: 'applicationType'
//             }, 
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'multi'
//             }
// /**/
//              {
//                 title: 'Domain',
//                 key: 'domain',
//             }, ]
//         })


//         controller.types.push({
//             singular: 'Integration',
//             plural: 'Integrations',
//             path: 'integration',
//             columns: [{
//                 title: 'Module',
//                 key: 'module'
//             }, ],
//             filters: [{
//                 title: 'Module',
//                 key: 'module'
//             }]
//         })


//         controller.types.push({
//             singular: 'Interaction',
//             plural: 'Interactions',
//             path: 'interaction',
//             columns: [{
//                 title: 'First Name',
//                 key: 'contact.firstName'
//             }, {
//                 title: 'Last Name',
//                 key: 'contact.lastName'
//             }, ]
//         })

//         controller.types.push({
//             singular: 'Definition',
//             plural: 'Definitions',
//             path: 'definition',
//             columns: [{
//                 title: 'Type',
//                 key: 'parentType'
//             }, {
//                 title: 'Machine Name',
//                 key: 'definitionName'
//             }, 
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'multi'

//             }, 
// /**/
//             ],
//             filters: [{
//                 title: 'Basic Type',
//                 key: 'parentType'
//             }]
//         })

//         controller.types.push({
//             singular: 'Realm',
//             plural: 'Realms',
//             path: 'realm',
//         })


//         controller.types.push({
//             singular: 'User Persona',
//             plural: 'User Personas',
//             path: 'persona',
//             columns: [{
//                 title: 'Permission Policies',
//                 key: 'policies'
//             }, {
//                 title: 'Extra permissions',
//                 key: 'permissionSets',
//                 renderer: 'permissionSet',
//             }, {
//                 title: 'Realm',
//                 key: 'realms'
//             }, {
//                 title: 'Status',
//                 key: 'status'
//             }],
//             filters: [{
//                 title: 'Policies',
//                 key: 'policies'
//             }],
//         })

//         controller.types.push({
//             singular: 'User',
//             plural: 'Users',
//             path: 'user',
//             columns: [
//                 /*{
//             title: 'Roles',
//             key: 'permissionSets',
//             renderer: 'permissionSet',
//         }, 
//         */
//                 {
//                     title: 'Permission Policies',
//                     key: 'policies'
//                 }, {
//                     title: 'Extra permissions',
//                     key: 'permissionSets',
//                     renderer: 'permissionSet',
//                 }, {
//                     title: 'Realm',
//                     key: 'realms'
//                 }, {
//                     title: 'Status',
//                     key: 'status'
//                 }
//             ],
//             filters: [{
//                 title: 'Policies',
//                 key: 'policies'
//             }]
//         })

//         controller.types.push({
//             singular: 'Event',
//             plural: 'Events',
//             path: 'event',
//             /*columns: [{
//             title: 'Start Date',
//             key: 'startDate',
//             filter: 'date',
//         },
//         {
//             title: 'Realms',
//             key: 'realms',
//             renderer:'multi',
//         }],
//         */
//             filters: [{
//                 title: 'Locations',
//                 key: 'locations',
//             }, {
//                 title: 'Rooms',
//                 key: 'rooms',
//             }],
//             viewModes: ['calendar', 'cards']
//         })

//         controller.types.push({
//             singular: 'Location',
//             plural: 'Locations',
//             path: 'location',
//             columns: [{
//                 title: 'Address',
//                 key: 'addressLine1'
//             }, {
//                 title: 'Suburb',
//                 key: 'suburb'
//             }, {
//                 title: 'State',
//                 key: 'state'
//             }, {
//                 title: 'Country',
//                 key: 'country'
//             }, ],
//             filters: [{
//                 title: 'State',
//                 key: 'state'
//             }, {
//                 title: 'Country',
//                 key: 'country'
//             }],
//             viewModes: ['map']

//         })

//         controller.types.push({
//             singular: 'Endpoint',
//             plural: 'Endpoints',
//             path: 'endpoint',
//         })

//         controller.types.push({
//             singular: 'Account',
//             plural: 'Accounts',
//             path: 'account',
//         })

//         controller.types.push({
//             singular: 'Collection',
//             plural: 'Collections',
//             path: 'collection',
//             columns: [{
//                 title: 'Items',
//                 key: 'items.length'
//             }, ]
//         })

//         controller.types.push({
//             singular: 'Article',
//             plural: 'Articles',
//             path: 'article',
//             columns: [{
//                 title: 'Author',
//                 key: 'author.name'
//             }, {
//                 title: 'Tags',
//                 key: 'tags',
//                 renderer: 'multi',
//             }, 
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'multi',
//             }
// /**/
//             ]
//         })



//         controller.types.push({
//             singular: 'Attendance',
//             plural: 'Attendance Reports',
//             path: 'attendance',
//             columns: [{
//                 title: 'Author',
//                 key: 'author.name'
//             }, {
//                 title: 'Event',
//                 key: 'event',
//             }, {
//                 title: 'Count',
//                 key: 'count',
//             }, 
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'multi',
//             }
// /**/
//             ]
//         })

//         controller.types.push({
//             singular: 'Asset',
//             plural: 'Assets',
//             path: 'asset',
//             columns: [{
//                 title: 'File Type',
//                 key: 'extension'
//             }, {
//                 title: 'Tags',
//                 key: 'tags',
//                 renderer: 'multi',
//             }, 
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'multi',
//             }, 
// /**/
//             ],
//             filters: [{
//                 title: 'File Type',
//                 key: 'extension'
//             }]
//         })

//         controller.types.push({
//             singular: 'Tag',
//             plural: 'Tags',
//             path: 'tag',
//             filters: [{
//                 title: 'Type',
//                 key: 'restrictType'
//             }],
//             columns: [
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'multi',
//             },
//             /**/
//              {
//                 title: 'Author',
//                 key: 'author.name'
//             }],
//         })

//         controller.types.push({
//             singular: 'Image',
//             plural: 'Images',
//             path: 'image',
//             columns: [{
//                 title: 'Dimensions',
//                 key: 'width',
//                 renderer: 'dimensions',
//             }, {
//                 title: 'Tags',
//                 key: 'tags',
//                 renderer: 'multi',
//             }, 
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'multi',
//             }, 
// /**/
//             {
//                 title: 'Size',
//                 key: 'filesize',
//                 renderer: 'filesize',
//             }, {
//                 title: 'Security',
//                 key: 'privacy',
//                 renderer: 'privacy',
//             }],
//             filters: [{
//                 title: 'Asset Type',
//                 key: 'assetType'
//             }],
//             viewModes: ['grid']

//         })

//         controller.types.push({
//             singular: 'Audio',
//             plural: 'Audio',
//             path: 'audio',
//             columns: [{
//                     title: 'Duration',
//                     key: 'duration',
//                 }, 
// /**
//                 {
//                     title: 'Realms',
//                     key: 'realms',
//                     renderer: 'multi',
//                 }, 
// /**/
//                 {
//                     title: 'File Type',
//                     key: 'extension'
//                 }, {
//                     title: 'Security',
//                     key: 'privacy',
//                     renderer: 'privacy',
//                 },

//             ],
//             filters: [{
//                 title: 'File Type',
//                 key: 'extension'
//             }, {
//                 title: 'Asset Type',
//                 key: 'assetType'
//             }]
//         })

//         controller.types.push({
//             singular: 'Video',
//             plural: 'Videos',
//             path: 'video',
//             columns: [{
//                 title: 'File Type',
//                 key: 'extension'
//             }, {
//                 title: 'Duration',
//                 key: 'duration',
//             }, 
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'multi',
//             },
//             /**/
//             {
//                 title: 'Security',
//                 key: 'privacy',
//                 renderer: 'privacy',
//             }],
//             filters: [{
//                 title: 'File Type',
//                 key: 'extension'
//             }, {
//                 title: 'Asset Type',
//                 key: 'assetType'
//             }],
//             viewModes: ['grid']
//         })

//         controller.types.push({
//             singular: 'Site',
//             plural: 'Sites',
//             path: 'site',
//             columns: [
// /**
//             {
//                 title: 'Realms',
//                 key: 'realms',
//                 renderer: 'multi',
//             }, 
//             /**/]
//         })

//         /////////////////////////////////////

//         return {
//             $get: function() {
//                 return controller;
//             }
//         };
//     })


// .service('TypeService', function($q, Fluro, FluroContent, FluroAccess, TypeConfig, $resource) {

//     var controller = {};

//     ///////////////////

//     controller.types = TypeConfig.types;

//     ///////////////////

//     controller.allTypes = function() {
//         return [].concat(controller.types, controller.definedTypes);
//     }


//     ///////////////////

//     controller.getTypeFromPath = function(path) {
//         var primitive = _.find(TypeConfig.types, {
//             path: path
//         });

//         if (primitive) {
//             return primitive;
//         } else {

//             var defined = _.find(controller.definedTypes, {
//                 definitionName: path
//             });

//             if (defined) {
//                 return {
//                     singular: defined.title,
//                     plural: defined.plural,
//                     path: defined.definitionName,
//                     parentType: defined.parentType,
//                 }
//             }

//         }
//     }

//     ///////////////////

//     controller.isBasicType = function(typeName) {
//         return _.some(controller.types, function(type) {
//             return type.path == typeName;
//         })
//     }

//     ///////////////////

//     controller.sideLoadDefinition = function(definition) {

//         console.log('Side Load Definition', definition)
//         if (controller.definedTypes) {

//             var exists = _.some(controller.definedTypes, {
//                 _id: definition._id
//             });
//             if (!exists) {
//                 console.log('Side loaded', definition)
//                 controller.definedTypes.push(definition);
//                 controller.refreshMenuTree();
//             }

//         }
//     }

//     ///////////////////

//     controller.refreshDefinedTypes = function() {

//         console.log('Refresh defined types')
//         //if (controller.definedTypes) {
//         //   return controller.definedTypes;
//         //}


//         //Make a new request
//         controller.definedTypes = FluroContent.endpoint('defined', true, true).query({
//             allDefinitions: true,
//         });

//         //Create the refresh request
//         //controller.refreshRequest = true;

//         //Clean up once done
//         controller.definedTypes.$promise.then(function() {
//             controller.refreshMenuTree();
//             //delete controller.refreshRequest;
//         })

//         return controller.definedTypes;

//     }

//     ///////////////////

//     controller.requiredBasicTypes = function() {

//         return _.map(controller.definedTypes, function(def) {
//             return def.parentType;
//         })

//     }


//     ///////////////////

//     controller.refreshMenuTree = function() {


//         var grouped = _.groupBy(controller.definedTypes, function(defined) {
//             return defined.parentType;
//         });

//         controller.menuTree = _.chain(controller.types)
//             .map(function(type) {
//                 var children = grouped[type.path];


//                 var canAccess = FluroAccess.canAccess(type.path);

//                 if (canAccess && children) {
//                     children.unshift(type);
//                 }

//                 type.children = children;

//                 if (canAccess || (children && children.length)) {
//                     return type;
//                 } else {
//                     return null;
//                 }
//             })
//             .compact()
//             .value();

//     }

//     ///////////////////

//     controller.getIcon = function(type) {
//         if (type.parentType) {
//             return type.parentType;
//         } else {
//             return type.path;
//         }
//     }

//     ///////////////////

//     controller.getAllCreateableTypes = function() {

//         var primitives = _.chain(controller.types)
//             .filter(function(type) {
//                 return FluroAccess.can('create', type.path);
//             })
//             .map(function(type) {
//                 type.icon = type.path;
//                 return type;
//             })
//             .value();

//         var defined = _.chain(controller.definedTypes)
//             .filter(function(type) {
//                 return FluroAccess.can('create', type.definitionName);
//             })
//             .each(function(type) {
//                 type.singular = type.title;
//                 type.path = type.definitionName;
//                 type.icon = type.parentType;
//             })
//             .value();

//         return primitives.concat(defined);
//     }


//     ///////////////////

//     return controller;
// });