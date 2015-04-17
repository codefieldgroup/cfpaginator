'use strict';

// Declare app level module which depends on filters, and services.
angular.module('project', [
    'ui.bootstrap',

    'cf'
])

    .controller('PaginatorController', ['$scope', 'Model', function ($scope, Model) {

        // Start Block to execute grid.
        $scope.getData = function () {
            Model.query({
                offset: $scope.params.offset,
                limit : $scope.params.limit
            }, function (result) {
                $scope.years = result.data;
                $scope.params.total = result.meta.total;
            })
        }
        // End Block to execute grid.

        // Remove function.
        $scope.remove = function (index) {
            Model.remove(index);
            $scope.$emit('refresh:table:years_grid_listener');
        }
    }])

    .factory('Model', ['$rootScope', function ($rootScope) {
        return {
            query : function (jsonData, callback) {
                callback({
                    data: $rootScope.years.slice(jsonData.offset, jsonData.offset + jsonData.limit),
                    meta: {
                        total: $rootScope.years.length
                    }
                });
            },
            remove: function (index) {
                $rootScope.years.splice(index, 1);
            }
        }
    }])

    .run(['$rootScope', function ($rootScope) {
        $rootScope.years = [
            {
                id  : 1,
                year: 1980
            },
            {
                id  : 2,
                year: 1981
            },
            {
                id  : 3,
                year: 1982
            },
            {
                id  : 4,
                year: 1983
            },
            {
                id  : 5,
                year: 1984
            },
            {
                id  : 6,
                year: 1985
            },
            {
                id  : 7,
                year: 1986
            },
            {
                id  : 8,
                year: 1987
            },
            {
                id  : 9,
                year: 1988
            },
            {
                id  : 10,
                year: 1989
            },
            {
                id  : 11,
                year: 1990
            },
            {
                id  : 12,
                year: 1991
            },
            {
                id  : 13,
                year: 1992
            },
            {
                id  : 14,
                year: 1993
            },
            {
                id  : 15,
                year: 1994
            },
            {
                id  : 16,
                year: 1995
            },
            {
                id  : 17,
                year: 1996
            },
            {
                id  : 18,
                year: 1997
            },
            {
                id  : 19,
                year: 1998
            },
            {
                id  : 20,
                year: 1999
            },
            {
                id  : 21,
                year: 2000
            },
            {
                id  : 22,
                year: 2001
            },
            {
                id  : 23,
                year: 2002
            },
            {
                id  : 24,
                year: 2003
            },
            {
                id  : 25,
                year: 2004
            },
            {
                id  : 26,
                year: 2005
            },
            {
                id  : 27,
                year: 2006
            },
            {
                id  : 28,
                year: 2007
            },
            {
                id  : 29,
                year: 2008
            },
            {
                id  : 30,
                year: 2009
            },
            {
                id  : 31,
                year: 2010
            },
            {
                id  : 32,
                year: 2011
            },
            {
                id  : 33,
                year: 2012
            },
            {
                id  : 34,
                year: 2013
            },
            {
                id  : 35,
                year: 2014
            },
            {
                id  : 36,
                year: 2015
            }
        ];
    }])