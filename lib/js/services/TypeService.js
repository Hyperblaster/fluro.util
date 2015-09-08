angular.module('fluro.util')
.provider('TypeConfig', function() {


    //Define all of our Content Types
    var controller = {
        types: []
    };

    controller.types.push({
        singular: 'Role',
        plural: 'Roles',
        path: 'role',
        columns: [{
            title: 'Applications',
            key: 'applicationKeys'
        }],
    })


    controller.types.push({
        singular: 'Family',
        plural: 'Families',
        path: 'family',
        columns: [{
            title: 'Names',
            key: 'firstLine'
        }],
    })

    controller.types.push({
        singular: 'Checkin',
        plural: 'Checkins',
        path: 'checkin',
        columns: [{
            title: 'Event',
            key: 'event'
        },
        {
            title: 'Contact',
            key: 'contact'
        },
        {
            title: 'Checked in',
            key: 'created',
            filter:'date'
        },
        {
            title: 'Checked out',
            key: 'checkout.date',
            filter:'checkout'
        }],
    })

    controller.types.push({
        singular: 'Reaction',
        plural: 'Reactions',
        path: 'reaction',
    })

    controller.types.push({
        singular: 'Policy',
        plural: 'Permission Policies',
        path: 'policy',
        columns: [{
            title: 'Permissions',
            key: 'permissionSets',
            renderer: 'permissionSet',
        }, {
            title: 'Realm',
            key: 'realms'
        }, {
            title: 'Status',
            key: 'status'
        }]
    })

    controller.types.push({
        singular: 'Team',
        plural: 'Teams',
        path: 'team',
        columns: [{
            title: 'Realms',
            key: 'realms',
            renderer: 'multi'

        },{
            title: 'Tags',
            key: 'tags',
            renderer: 'multi'

        }],
        filters: [{
            title: 'Team members',
            key: 'assignments.contacts'
        },
        {
            title: 'Title',
            key: 'title'
        },
        {
            title: 'Assignment count',
            key: 'assignments.length'
        }]
    })

    controller.types.push({
        singular: 'Plan',
        plural: 'Plans',
        path: 'plan',
        columns: [
        /*{
            title: 'Event',
            key: 'event',
        },
        */
        {
            title: 'Time',
            key: 'startDate',
            renderer: 'time'
        },
        {
            title: 'Date',
            key: 'startDate',
            renderer: 'date'
        },{
            title: 'Realms',
            key: 'realms',
            renderer: 'multi'

        }, {
            title: 'Tags',
            key: 'tags',
            renderer: 'multi'

        }
        ]
    })

    controller.types.push({
        singular: 'Code',
        plural: 'Code',
        path: 'code',
        columns: [{
            title: 'Syntax',
            key: 'syntax'
        }],
        filters: [{
            title: 'Syntax',
            key: 'syntax'
        }]
    })

    controller.types.push({
        singular: 'Component',
        plural: 'Components',
        path: 'component',
        /*columns: [{
            title: 'Syntax',
            key: 'syntax'
        }],
        filters: [{
            title: 'Syntax',
            key: 'syntax'
        }]*/
    })


    controller.types.push({
        singular: 'Query',
        plural: 'Queries',
        path: 'query',
        columns: [{
            title: 'Limit',
            key: 'limit'
        }]
    })

    controller.types.push({
        singular: 'Package',
        plural: 'Packages',
        path: 'package',
    })

    controller.types.push({
        singular: 'Contact',
        plural: 'Contacts',
        path: 'contact',
        columns: [{
            title: 'First Name',
            key: 'firstName'
        }, {
            title: 'Last Name',
            key: 'lastName'
        }, {
            title: 'Gender',
            key: 'gender'
        }, {
            title: 'Family',
            key: 'family'
        },],
        filters: [{
            title: 'Gender',
            key: 'gender'
        }]
    })

    controller.types.push({
        singular: 'Purchase',
        plural: 'Purchases',
        path: 'purchase',
        columns: [{
            title: 'Customer',
            key: 'owner.name'
        }, {
            title: 'Amount',
            key: 'transaction.amount'
        }, {
            title: 'Transaction',
            key: 'transaction._id'
        }]
    })

    controller.types.push({
        singular: 'Product',
        plural: 'Products',
        path: 'product',
        columns: [{
            title: 'Amount',
            key: 'amount'
        }, {
            title: 'License',
            key: 'license'
        }],
        filters: [{
            title: 'License',
            key: 'license'
        }]
    })


    controller.types.push({
        singular: 'Transaction',
        plural: 'Transactions',
        path: 'transaction',
        columns: [{
            title: 'Amount',
            key: 'amount'
        }, {
            title: 'Payment',
            key: 'paymentStatus'
        }, {
            title: 'Mode',
            key: 'mode'
        }, ],
        filters: [{
            title: 'Payment Status',
            key: 'paymentStatus'
        }, {
            title: 'Mode',
            key: 'mode'
        }]
    })

    controller.types.push({
        singular: 'Application',
        plural: 'Applications',
        path: 'application',
        columns: [{
            title: 'Type',
            key: 'applicationType'
        }, {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi'
        }, {
            title: 'Domain',
            key: 'domain',
        }, ]
    })


    controller.types.push({
        singular: 'Integration',
        plural: 'Integrations',
        path: 'integration',
        columns: [{
            title: 'Module',
            key: 'module'
        }, ],
        filters: [{
            title: 'Module',
            key: 'module'
        }]
    })


    controller.types.push({
        singular: 'Interaction',
        plural: 'Interactions',
        path: 'interaction',
        columns: [{
            title: 'First Name',
            key: 'contact.firstName'
        }, {
            title: 'Last Name',
            key: 'contact.lastName'
        }, ]
    })

    controller.types.push({
        singular: 'Definition',
        plural: 'Definitions',
        path: 'definition',
        columns: [{
            title: 'Type',
            key: 'parentType'
        },{
            title: 'Machine Name',
            key: 'definitionName'
        }, {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi'

        }, ],
        filters: [{
            title: 'Basic Type',
            key: 'parentType'
        }]
    })

    controller.types.push({
        singular: 'Realm',
        plural: 'Realms',
        path: 'realm',
    })

    controller.types.push({
        singular: 'User',
        plural: 'Users',
        path: 'user',
        columns: [
        /*{
            title: 'Roles',
            key: 'permissionSets',
            renderer: 'permissionSet',
        }, 
        */
       {
            title: 'Permission Policies',
            key: 'policies'
        },
        {
            title: 'Extra permissions',
            key: 'permissionSets',
            renderer: 'permissionSet',
        },
       {
            title: 'Realm',
            key: 'realms'
        }, {
            title: 'Status',
            key: 'status'
        }],
        filters: [{
            title: 'Policies',
            key: 'policies'
        }]
    })

    controller.types.push({
        singular: 'Event',
        plural: 'Events',
        path: 'event',
        /*columns: [{
            title: 'Start Date',
            key: 'startDate',
            filter: 'date',
        },
        {
            title: 'Realms',
            key: 'realms',
            renderer:'multi',
        }],
        */
        filters: [{
            title: 'Locations',
            key: 'locations',
        }, {
            title: 'Rooms',
            key: 'rooms',
        }],
        viewModes: ['calendar', 'cards']
    })

    controller.types.push({
        singular: 'Location',
        plural: 'Locations',
        path: 'location',
        columns: [{
            title: 'Address',
            key: 'addressLine1'
        }, {
            title: 'Suburb',
            key: 'suburb'
        }, {
            title: 'State',
            key: 'state'
        }, {
            title: 'Country',
            key: 'country'
        }, ],
        filters: [{
            title: 'State',
            key: 'state'
        }, {
            title: 'Country',
            key: 'country'
        }],
        viewModes: ['map']

    })

    controller.types.push({
        singular: 'Endpoint',
        plural: 'Endpoints',
        path: 'endpoint',
    })

    controller.types.push({
        singular: 'Account',
        plural: 'Accounts',
        path: 'account',
    })

    controller.types.push({
        singular: 'Collection',
        plural: 'Collections',
        path: 'collection',
        columns: [{
            title: 'Items',
            key: 'items.length'
        }, ]
    })

    controller.types.push({
        singular: 'Article',
        plural: 'Articles',
        path: 'article',
        columns: [{
            title: 'Author',
            key: 'author.name'
        }, {
            title: 'Tags',
            key: 'tags',
            renderer: 'multi',
        }, {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi',
        }]
    })

    controller.types.push({
        singular: 'Asset',
        plural: 'Assets',
        path: 'asset',
        columns: [{
            title: 'File Type',
            key: 'extension'
        }, {
            title: 'Tags',
            key: 'tags',
            renderer: 'multi',
        }, {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi',
        }, ],
        filters: [{
            title: 'File Type',
            key: 'extension'
        }]
    })

    controller.types.push({
        singular: 'Tag',
        plural: 'Tags',
        path: 'tag',
        filters: [{
            title: 'Type',
            key: 'restrictType'
        }]
    })

    controller.types.push({
        singular: 'Image',
        plural: 'Images',
        path: 'image',
        columns: [{
            title: 'Tags',
            key: 'tags',
            renderer: 'multi',
        },
        {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi',
        }, ],
        filters: [{
            title: 'Asset Type',
            key: 'assetType'
        }],
        viewModes: ['grid']

    })

    controller.types.push({
        singular: 'Audio',
        plural: 'Audio',
        path: 'audio',
        columns: [{
            title: 'File Type',
            key: 'extension'
        }, {
            title: 'Realms',
            key: 'realms',
            renderer: 'multi',
        }, ],
        filters: [{
            title: 'File Type',
            key: 'extension'
        }, {
            title: 'Asset Type',
            key: 'assetType'
        }]
    })

    controller.types.push({
        singular: 'Video',
        plural: 'Videos',
        path: 'video',
        columns: [{
            title: 'File Type',
            key: 'extension'
        }, ],
        filter: [{
            title: 'Asset Type',
            key: 'assetType'
        }],
        viewModes: ['grid']
    })

    controller.types.push({
        singular: 'Site',
        plural: 'Sites',
        path: 'site',
        columns: [{
            title: 'Realms',
            key: 'realms',
            renderer: 'multi',
        }, ]
    })

    /////////////////////////////////////

    return {
        $get: function() {
            return controller;
        }
    };
})


.service('TypeService', function($q, Fluro, FluroContent, FluroAccess, TypeConfig, $resource) {

    var controller = {};

    ///////////////////

    controller.types = TypeConfig.types;

    ///////////////////

    controller.allTypes = function() {
        return [].concat(controller.types, controller.definedTypes);
    }


    ///////////////////

    controller.getTypeFromPath = function(path) {
        var primitive = _.find(TypeConfig.types, {
            path: path
        });

        if (primitive) {
            return primitive;
        } else {

            var defined = _.find(controller.definedTypes, {
                definitionName: path
            });

            if (defined) {
                return {
                    singular: defined.title,
                    plural: defined.plural,
                    path: defined.definitionName,
                    parentType: defined.parentType,
                }
            }

        }
    }

    ///////////////////

    controller.isBasicType = function(typeName) {
        return _.some(controller.types, function(type) {
            return type.path == typeName;
        })
    }

    ///////////////////

    controller.sideLoadDefinition = function(definition) {

        console.log('Side Load Definition', definition)
        if(controller.definedTypes) {

            var exists = _.some(controller.definedTypes, {_id:definition._id});
            if(!exists) {
                console.log('Side loaded', definition)
                controller.definedTypes.push(definition);
                controller.refreshMenuTree();
            }
            
        }
    }

    ///////////////////

    controller.refreshDefinedTypes = function() {

        console.log('Refresh defined types')
        //if (controller.definedTypes) {
         //   return controller.definedTypes;
        //}

        //Make a new request
        controller.definedTypes = FluroContent.endpoint('defined', true, true).query();

        //Create the refresh request
        //controller.refreshRequest = true;

        //Clean up once done
        controller.definedTypes.$promise.then(function() {
            controller.refreshMenuTree();
            //delete controller.refreshRequest;
        })

        return controller.definedTypes;

    }

    ///////////////////

    controller.requiredBasicTypes = function() {

        return _.map(controller.definedTypes, function(def) {
            return def.parentType;
        })

    }


    ///////////////////

    controller.refreshMenuTree = function() {


        var grouped = _.groupBy(controller.definedTypes, function(defined) {
            return defined.parentType;
        });

        controller.menuTree = _.chain(controller.types)
            .map(function(type) {
                var children = grouped[type.path];


                var canAccess = FluroAccess.canAccess(type.path);

                if (canAccess && children) {
                    children.unshift(type);
                }

                type.children = children;

                if (canAccess || (children && children.length)) {
                    return type;
                } else {
                    return null;
                }
            })
            .compact()
            .value();

    }

    ///////////////////

    controller.getIcon = function(type) {
        if (type.parentType) {
            return type.parentType;
        } else {
            return type.path;
        }
    }

    ///////////////////

    controller.getAllCreateableTypes = function() {

        var primitives = _.chain(controller.types)
            .filter(function(type) {
                return FluroAccess.can('create', type.path);
            })
            .map(function(type) {
                type.icon = type.path;
                return type;
            })
            .value();

        var defined = _.chain(controller.definedTypes)
            .filter(function(type) {
                return FluroAccess.can('create', type.definitionName);
            })
            .each(function(type) {
                type.singular = type.title;
                type.path = type.definitionName;
                type.icon = type.parentType;
            })
            .value();

        return primitives.concat(defined);
    }


    ///////////////////

    return controller;
});