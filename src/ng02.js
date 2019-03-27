var app = angular.module('myApp',[]);
var element = $("input[type='text']");
app.controller('myCtrl',function ($scope) {
    $scope.numRange = 6;
    $scope.reduce = function () {
        if($scope.numRange > 6) {
            $scope.numRange -= 1;
        }
    };
    $scope.plus = function () {
        if($scope.numRange < 10){
            $scope.numRange += 1;
        }
    };
    $scope.changeNum = function () {
        element.val($scope.numRange);
    };
    $scope.person = function () {
        switch($scope.numRange){
            case 6:
                $scope.wolf = 2;
                return 2;
            case 7:
                $scope.wolf = 2;
                return 3;
            case 8:
                $scope.wolf = 3;
                return 3;
            case 9:
                $scope.wolf = 3;
                return 4;
            case 10:
                $scope.wolf = 4;
                return 4;
        }
    }
});