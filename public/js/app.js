angular.module("schoolsApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    schools: function(Schools) {
                        return Schools.getSchools();
                    }
                }
            })
            .when("/schools/:lea_code", {
                controller: "viewSchoolController",
                templateUrl: "school.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("Schools", function($http) {
        this.getSchools = function() {
            return $http.get("/schools").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding schools.");
                });
        }
        this.getSchool = function(lea_code) {
            var url = "/schools/" + lea_code;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this school.");
                });
        }
    })
    .controller("ListController", function(schools, $scope) {
        $scope.schools = schools.data;
    });
