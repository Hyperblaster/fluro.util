angular.module('fluro.util')

.service('Asset', function(Fluro, $window) {

    var controller = {}

    /////////////////////////////////////////////////////

    controller.getUrl = function(id, extension, params) {

        if (!params) {
            params = {};
        }

        // console.log('Get Asset URL', id)
        var url = Fluro.apiURL + '/get/' + id;


        if (extension) {
            url += '/file/file.' + extension;
        }

        // if (Fluro.token && !params.token) {
        //     url += '?access_token=' + Fluro.token;
        // }

        if (Fluro.token && !params['access_token']) {
            params['access_token'] = Fluro.token;
        }

        ////////////////////////////////////////

        var queryParams = _.map(params, function(v, k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }).join('&');

        if (queryParams.length) {
            url += '?' + queryParams;
        }

        return url;
    }

    /////////////////////////////////////////////////////

    controller.thumbnailUrl = function(id) {
        // console.log('Get Asset URL', id)
        var url = Fluro.apiURL + '/get/' + id + '?w=50';

        if (Fluro.token) {
            url += '?access_token=' + Fluro.token;
        }

        return url;
    }

    //////////////////////////////////////////////////

    controller.imageUrl = function(_id, w, h, params) {

        if (!params) {
            params = {};
        }

        var url = Fluro.apiURL + '/get/' + _id; // + '?dimensions';

        //////////////////////////////////////

        var limitWidth = 1920;

        if ($window.screen.width <= 768) {
            limitWidth = 1536;
        }

        if ($window.screen.width <= 320) {
            limitWidth = 640;
        }

        ////////////////////////////////////
        if (!w && !h) {
            //url += '&w=' + limitWidth;
            params['w'] = limitWidth;
        } else {

            if (w) {
                // url += '&w=' + w;
                params['w'] = w;
            }

            if (h) {
                //url += '&h=' + h;
                params['h'] = h;
            }
        }


        if (Fluro.token && !params['access_token']) {
            params['access_token'] = Fluro.token;
        }


        var queryParams = _.map(params, function(v, k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
        }).join('&');


        if (queryParams.length) {
            url += '?' + queryParams;
        }


        // if (Fluro.token) {
        //     url += '&access_token=' + Fluro.token;
        // }

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

        switch (object._type) {
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