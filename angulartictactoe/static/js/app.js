var app = angular.module('angulartictactoe', []);

var gameController = function($scope) {
    $scope.intro = true;
    $scope.introButton = "How to play";
	$scope.introduction = "Tell you how to play the game";
	$scope.showIntro = function() {
	    $scope.intro = $scope.intro === false ? true : false;
	}
}