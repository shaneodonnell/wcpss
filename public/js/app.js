angular.module("schoolsApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("#/", {
                controller: "ListController",
                templateUrl: "list.html",
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
            return $http.get("#/schools").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding schools.");
                });
        }
        this.getSchool = function(lea_code) {
            var url = "#/schools/" + lea_code;
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
    })
    .controller("NewSchoolController", function($scope, $location, Schools) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveSchool = function(school) {
            Schools.createSchool(school).then(function(doc) {
                var schoolUrl = "/school/" + doc.data._id;
                $location.path(schoolUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("EditSchoolController", function($scope, $routeParams, Schools) {
        Schools.getSchool($routeParams.schoolId).then(function(doc) {
            $scope.school = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.schoolFormUrl = "school-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.schoolFormUrl = "";
        }

        $scope.saveSchool = function(school) {
            Schools.editSchool(school);
            $scope.editMode = false;
            $scope.schoolFormUrl = "";
        }

        $scope.deleteSchool = function(schoolId) {
            Schools.deleteSchool(schoolId);
        }
    });
