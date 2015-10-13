angular.module('inspinia')

	.controller('loginCtrl', ['$scope', "$rootScope", '$http', 'auth', 'store', "$location", function($scope, $rootScope, $http, auth, store, $location) {
	$scope.login = function() {

		auth.signin({
					 username: $scope.username,
  					 password: $scope.password,
  					 connection: "sinopecarg-dev"
		}, function(profile, token) {

			/*	SAVE	token en local storage */
			store.set('profile', profile);
			store.set('token', token);


			/*	ASSIGN 		token de auth0 cuando el usuario se autentica */
  			$rootScope.authentication = auth.profile;

    		/*	DEFINE 		para representar en pantalla, icono de usuario conectado en success y girando */
			$rootScope.authenticationClass = "fa fa-user fa-lg text-info"

			$location.path("/google_maps");

		}, function() {

			alert("ERROR ver que hacemos");

		});

	}


	$scope.logout = function() {

		auth.signout();

		/*	REMOVE 	variables del local storage  */
		store.remove('profile');
		store.remove('token');

    	/*	DEFINE 	para representar en pantalla, icono de usuario desconectado en danger */
		$rootScope.authenticationClass = "fa fa-toggle-on fa-lg text-danger"

	    /*	DEFINE 	para uso global - token de auth0	*/
	    $rootScope.authentication = "";

	}


}]);