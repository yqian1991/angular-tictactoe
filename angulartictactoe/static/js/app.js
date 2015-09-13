var app = angular.module('angulartictactoe', []);

app.controller('gameController',['$scope', '$http', function($scope, $http) {
    $scope.intro = true;
	$scope.introduction = "Tell you how to play the game";
    $scope.winner = false;
    $scope.winners = [];
    
    $scope.init_board = function () {
        init_game($scope, $http);
    }

	$scope.showIntro = function() {
	    $scope.intro = $scope.intro === false ? true : false;
	    console.log("Show introduction");
	}

	$scope.isTaken = function(cell) {
		flag = cell !== '_';
		console.log(flag);
        return flag;
    };

    $scope.update = function(rindex, cindex) {
        $scope.board[rindex][cindex] = $scope.currentPlayer;
        $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
        console.log("cell:"+$scope.currentPlayer);
        updateBoard(rindex*3 + cindex, $scope, $http);
    };
}]);

function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}

function updateBoard(index, scope, http) {
	http.get('http://0.0.0.0:6543/api/update?index='+index).
        success(function(data) {
          if (data._winner) {
            console.log("We have a winner.");
            scope.winner = true;
            scope.winners.push(data._current_player);
            init_game(scope, http);
            //history();
            return;
          }
        });
}

function init_game(scope, http){
    scope.winner = false;
    scope.cat = false;
	http.get('http://0.0.0.0:6543/api/init').
        success(function(data) {
        	scope.currentPlayer = data._current_player;
            scope.board = chunk(data._game_board, 3);
            console.log(scope.board);
    });
}