angular.module('fluro.util')

.service('Asset', function(Fluro, $window) {

    var controller = {}

    /////////////////////////////////////////////////////
   
    controller.getUrl = function(id) {
        // console.log('Get Asset URL', id)
        var url = Fluro.apiURL + '/get/' + id;

        if (Fluro.token) {
            url += '?access_token=' + Fluro.token;
        }

        return url;
    }

    /////////////////////////////////////////////////////

    controller.thumbnailUrl = function(id) {
        return controller.imageUrl(id, 50);
    }

    //////////////////////////////////////////////////

    controller.imageUrl = function(_id, w, h) {
        var url = Fluro.apiURL + '/get/' + _id + '?dimensions';


        var limitWidth = 1200;

        if ($window.screen.width <= 768) {
            limitWidth = 768;
        }

        if ($window.screen.width <= 320) {
            limitWidth = 320;
        }

        if (!w && !h) {
            url += '&w=' + limitWidth;
        } else {

            if (w) {
                url += '&w=' + w;
            }

            if (h) {
                url += '&h=' + h;
            }
        }

        if (Fluro.token) {
            url += '&access_token=' + Fluro.token;
        }

        return url;
    }


    /////////////////////////////////////////////////////
   
    controller.downloadUrl = function(id) {

        var url = Fluro.apiURL + '/download/' + id;

        if (Fluro.token) {
            url += '?access_token=' + Fluro.token;
        }

        return url;

    }

    /////////////////////////////////////////////////////
   
    controller.isAssetType = function(object) {
       
        switch(object._type) {
            case 'asset':
            case 'video':
            case 'audio':
            case 'image':
                return true;
            break;
            default:
                return false;
            break;
        }
    }

    /////////////////////////////////////////////////////

    return controller;
});