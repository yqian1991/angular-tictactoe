'use strict';

/* App Module*/
var app = angular.module('angulartictactoe', [
      'gameControllers',
      'gameServices',
    ]);

/* Controllers*/
var gameControllers = angular.module('gameControllers', []);

gameControllers.controller('gameController',['$scope', '$http', 'gameApiService', 
    function($scope, $http, gameApiService) {
      $scope.intro = true;
	  $scope.introduction = "Tell you how to play the game";
      $scope.winner = false;
      $scope.winners = [];
      $scope.histories = [];
      
      $scope.history = function(){
        gameApiService.history().success(function(data){
          console.log(data);
          $scope.histories = data._history;
        });
      };
    
      $scope.init_board = function() {
        $scope.winner = false;
        $scope.cat = false;  
        gameApiService.init().success(function(data) {
            $scope.currentPlayer = data._current_player;
            $scope.board = chunk(data._game_board, 3);
            console.log($scope.board);
        }); 
    
      };

	  $scope.show_introduction = function() {
	    $scope.intro = $scope.intro === false ? true : false;
	    console.log("Show introduction");
	  };

	  $scope.is_taken = function(cell) {
		$scope.flag = cell !== '_';
		console.log($scope.flag);
        return $scope.flag;
      };

      $scope.update = function(rindex, cindex) {
        $scope.board[rindex][cindex] = $scope.currentPlayer;
        $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
        console.log("cell:"+$scope.currentPlayer);
        var index = rindex*3 + cindex;
        gameApiService.update(index).success( function(data) {
          if (data._winner) {
            console.log("We have a winner.");
            $scope.winner = true;
            $scope.winners.push(data._current_player);
            $scope.init_board();
            return;
          }
        });
      };

      $scope.to_board = function(arr, size) {
        return chunk(arr, size);
      };
    }
]);

/* App services*/
var gameServices = angular.module('gameServices', []);

gameServices.factory('gameApiService', ['$http', 
    function($http){
      var urlBase = "http://0.0.0.0:6543/api";
      var gameApiService = {};
      gameApiService.init = function() {
        return $http.get(urlBase + '/init');
      };
      gameApiService.update = function(index) {
        return $http.post(urlBase + '/update?index='+index);
      };
      gameApiService.history = function() {
        return $http.get(urlBase + '/history');
      };
      return gameApiService;
   }
]);

/* Utility functions */
function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}