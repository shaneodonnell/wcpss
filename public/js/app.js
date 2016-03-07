angular.module("schoolsApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    schools: function(Schools) {
                        return Schools.getSchool();
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
        this.createSchool = function(contact) {
            return $http.post("/schools", school).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating school.");
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
        this.editContact = function(contact) {
            var url = "/schools/" + school._id;
            console.log(school._id);
            return $http.put(url, school).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this school.");
                    console.log(response);
                });
        }
        this.deleteSchool = function(schoolId) {
            var url = "/schools/" + schoolId;
            return $http.delete(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error deleting this school.");
                    console.log(response);
                });
        }
    })
    .controller("ListController", function(schools, $scope) {
        $scope.schools = schools.data;
    })
    .controller("NewSchoolController", function($scope, $location, Contacts) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveSchool = function(school) {
            Schools.createSchool(school).then(function(doc) {
                var schoolUrl = "/school/" + doc.data._id;
                $location.path(contactUrl);
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
            $scope.contactFormUrl = "school-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.contactFormUrl = "";
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
