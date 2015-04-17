'use strict';

angular.module("cf", [])

/**
 * Directive to complemented Grid.
 * Example to show grid:
 *
 * <div cfpaginator fnc="getData()" on="indications_templates" indices="5" limit="10">
 *      <table class="table table-responsive table-bordered">
 *          ...
 *      </table>
 * </div>
 *
 * The directive accepts the following attributes:
 *
 * - 'fnc': Default value is 'getData()'. Function to execute in controller to get data for show in grid.
 * - 'on': Default value is ''. String to complete de event $rootScope.$on('refresh:table:' + $attrs.on, function () ... with $attrs.on
 *                              to invoke a specific controller of table.
 * - 'indices': Default value is 5. Limit number for pagination size.
 * - 'limit': Default value is 10. Maximum number of items per page.
 * - 'templateUrl': Default value is cfpaginator.html. Template to show paginator.
 */
    .directive('cfpaginator', ['$document', '$parse', function ($document, $parse) {
        return {
            restrict   : 'A',
            replace    : true,
            transclude : true,
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl || 'cfpaginator.html'
            },
            controller : ['$scope', '$attrs', '$parse', function ($scope, $attrs, $parse) {
                var indices = (!!$attrs.indices) ? $parse($attrs.indices)($scope) : 5;
                var limit = (!!$attrs.limit) ? $parse($attrs.limit)($scope) : 10;

                $scope.params = {
                    indices    : indices,
                    limit      : limit,
                    offset     : 0,
                    total      : 0,
                    currentPage: 1
                }

                $scope.search = '';
                $scope.limits = [10, 15, 25, 30, 50, 100];

                var executeFunction = (!!$attrs.fnc) ? $parse($attrs.fnc) : $parse('getData()');
                executeFunction($scope);

                // Function calculate offset to search in DB respect of current page.
                function calculate() {
                    if ($scope.params.currentPage == 1) {
                        $scope.params.offset = 0;
                    } else if ($scope.params.currentPage > 1) {
                        $scope.params.offset = $scope.params.currentPage * $scope.params.limit - $scope.params.limit;
                    }
                }

                $scope.$watch('params.currentPage', function (newValue, oldValue) {
                    if (newValue != oldValue) {
                        calculate();
                        executeFunction($scope);
                    }
                });

                // Change limit function.
                $scope.changeLimit = function () {
                    calculate();
                    executeFunction($scope);
                }

                // Search function.
                $scope.shortSearch = function (search) {
                    if (search && search.length > 2) {
                        $scope.search = search;
                        executeFunction($scope);
                    }
                };

                $scope.closeSearch = function () {
                    $scope.search = null;
                    executeFunction($scope);
                };

                // Angularjs listener.
                $scope.$on('refresh:table:' + $attrs.on, function () {
                    console.log('ok en la directiva')
                    calculate();
                    executeFunction($scope);
                });
                // End Block to execute table.
            }]
        }
    }])