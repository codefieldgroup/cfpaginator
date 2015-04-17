# CFPaginator to AngularJS

CFPaginator is a simple directive to include pagination to any element we need with paginations.

## It is assumed
- Install nodejs: `sudo apt-get install nodejs npm`
- Install bower and update: `sudo npm install -g bower` and `bower update`

## Usage
- With bower: `bower install --save cfpaginator`
- Add **cf** as a dependency to your app. Example:
```
angular.module('project', [
    ...,
    'cf'
])
```

## In html:

```
<script src="./bower_components/cfpaginator/dist/cfpaginator.min.js"></script>
```

```
<div cfpaginator on="event_listener" indices="5" limit="10">
	... Here the element you want to make pagination.
</div>
```

Example to show grid:

```
<div cfpaginator fnc="getData()" on="years_grid_listener" indices="5" limit="10">
    <table class="table table-responsive table-bordered">
        <thead>
        <tr>
            <th>Count</th>
            <th>ID</th>
            <th>Year</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr ng-repeat="year in years">
            <td>{{ $index + 1 }}</td>
            <td>{{ year.id }}</td>
            <td>{{ year.year }}</td>
            <td>
                <a class="red" href="" ng-click="remove($index)" title="Remove">Remove</a>
            </td>
        </tr>
        </tbody>
    </table>
</div>
```
#### Controller

In the controller you should create a function with same name that parameter fnc of the directive, in this case is getData().

```
$scope.getData = function () {
    Model.query({
        offset: $scope.params.offset,
        limit : $scope.params.limit
    }, function (result) {
        $scope.years = result.data;
        $scope.params.total = result.meta.total;
    })
}
```

**$scope.params.offset** and **$scope.params.limit** is generated automatically by the directive. The initial value to $scope.params.limit is specified in the parameter "limit" in the html.

**$scope.params.total** must be instantiated when data from the API with the value of total elements are obtained in the Database.

To update the pagination when inserting or removing an item should use the event $emit:
```
// Remove function.
$scope.remove = function (index) {
    Model.remove(index);
    $scope.$emit('refresh:table:years_grid_listener');
}
```

Where "years_grid_listener" is the phrase specified by you in "on" parameter of directive.

## Options
The directive accepts the following attributes:
- 'fnc': Default value is 'getData()'. Function to execute in controller to get data for show in grid.
- 'on': Default value is "". String to complete de event $rootScope.$on('refresh:table:' $attrs.on, function () ... with $attrs.on to invoke a specific controller of grid.
- 'indices': Default value is 5. Limit number for pagination size.
- 'limit': Default value is 10. Maximum number of items per page.
- 'templateUrl': Default value is cfpaginator.html. Template to show paginator.

## Installation for used example
- Install node http-server: `sudo npm install -g http-server`
- Access to folder `cd ./bower_components/cfpaginator`
- Execute command: `http-server .` and open browser with URL [http://localhost:8080/example/](http://localhost:8080/example/)
