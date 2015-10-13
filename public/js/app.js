/*
inspinia 	configuración de módulos que utilizo en la aplicación
			Cada librería que bajamos con npm o bower, debe estar 
			definida en este lugar.
*/
angular.module('inspinia', [
    'ui.router',                    // Routing
    'oc.lazyLoad',                  // ocLazyLoad
    'ui.bootstrap',                 // Ui Bootstrap
    'pascalprecht.translate',       // Angular Translate
    'ngIdle',                       // Idle timer
    'auth0',						// auth0
    'angular-storage',				// auth0
    'angular-jwt'        			// auth0
    //'ui.sortable'					// drag and drop - por ahora no implementada
])



/*	auth0 -	loginState, match con loginState */
.config(function (authProvider) {
    authProvider.init({
	    domain: 'sinopecarg-dev.auth0.com',
    	clientID: '7qbMsPsy6oa4kCvP7avzwybzYUmIXxxr',
 		loginState: 'login'
    });
})      



/*	auth0	vinvula eventos para chequear ni bien se inicia la aplicación */
.run(function(auth) {
	auth.hookEvents();
})



.run(function($rootScope, $state) {

    $rootScope.$state = $state;

    /*	DEFINE JSON 	para uso global */
    //$rootScope.user = "xmazzuce";
    $rootScope.IdEntity = "1";
    $rootScope.whereSearch = "app_Core_Search_by_Wells_vw"

    /*	DEFINE 		para uso global - token de auth0	*/
    $rootScope.authentication = "";

    /*	DEFINE 		para representar en pantalla, icono de usuario desconectado en danger */
	$rootScope.authenticationClass = "fa fa-toggle-on fa-lg text-danger";

})


/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written state for all view in theme.
 *
 */
.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("/login");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider

    /*	auth0	*/

  	.state('login',
  		{	url: '/login', 
  			templateUrl: 'views/login.html', 
  			controller: 'loginCtrl' 
  		})

  	.state('logout', 
  		{	url: '/logout', 
  			templateUrl: 'views/lockscreen.html', 
  			controller: 'logoutCtrl' 
  		})
  	
  	.state('root',
  		{ 	url: '/', 
  			templateUrl: 'views/google_maps.html', 
  			controller: 'googleMapsCtrl',
  			data: { requiresLogin: true } 
  		})
    
    /*	auth0	*/


    .state('google_maps', {
        url: "/google_maps",
        templateUrl: "views/google_maps.html",
		data: {requiresLogin: true},
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'ui.event',
                    files: ['./js/plugins/uievents/event.js']
                }, {
                    name: 'ui.map',
                    files: ['./js/plugins/uimaps/ui-map.js']
                }, ]);
            }
        }
    })


    .state('documents', {
        url: "/documents",
        templateUrl: "views/documents.html",
		data: {requiresLogin: true},
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([{
                        name: 'ngGrid',
                        files: ['./js/plugins/nggrid/ng-grid-2.0.3.min.js']
                    }, {
                        insertBefore: '#loadBefore',
                        files: ['./js/plugins/nggrid/ng-grid.css']
                    }, {
                        insertBefore: '#loadBefore',
                        name: 'localytics.directives',
                        files: ['./css/plugins/chosen/chosen.css',
                            './js/plugins/chosen/chosen.jquery.js',
                            './js/plugins/chosen/chosen.js'
                        ]
                    }

                ]);
            }
        }

    })


    .state('dashboard_1', {
        url: "/dashboard_1",
        templateUrl: "views/dashboard_1.html",
		data: {requiresLogin: true},
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([{

                    serie: true,
                    name: 'angular-flot',
                    files: ['./js/plugins/flot/jquery.flot.js',
                        './js/plugins/flot/jquery.flot.time.js',
                        './js/plugins/flot/jquery.flot.tooltip.min.js',
                        './js/plugins/flot/jquery.flot.spline.js',
                        './js/plugins/flot/jquery.flot.resize.js',
                        './js/plugins/flot/jquery.flot.pie.js',
                        './js/plugins/flot/curvedLines.js',
                        './js/plugins/flot/angular-flot.js'
                    ]
                }, {
                    name: 'angles',
                    files: ['./js/plugins/chartJs/angles.js',
                        './js/plugins/chartJs/Chart.min.js'
                    ]
                }, {
                    name: 'angular-peity',
                    files: ['./js/plugins/peity/jquery.peity.min.js',
                        './js/plugins/peity/angular-peity.js'
                    ]
                }]);
            }
        }
    })



    .state('dashboard_2', {
        url: "/dashboard_2",
        templateUrl: "views/dashboard_2.html",
		data: {requiresLogin: true},
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    serie: true,
                    name: 'angular-flot',
                    files: ['./js/plugins/flot/jquery.flot.js',
                        './js/plugins/flot/jquery.flot.time.js',
                        './js/plugins/flot/jquery.flot.tooltip.min.js',
                        './js/plugins/flot/jquery.flot.spline.js',
                        './js/plugins/flot/jquery.flot.resize.js',
                        './js/plugins/flot/jquery.flot.pie.js',
                        './js/plugins/flot/curvedLines.js',
                        './js/plugins/flot/angular-flot.js'
                    ]
                }, {
                    files: ['./js/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js',
                        './js/plugins/jvectormap/jquery-jvectormap-2.0.2.css'
                    ]
                }, {
                    files: ['./js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js']
                }, {
                    name: 'ui.checkbox',
                    files: ['./js/bootstrap/angular-bootstrap-checkbox.js']
                }]);
            }
        }
    })



    .state('dashboard_3', {
        url: "/dashboard_3",
        templateUrl: "views/dashboard_3.html",
		data: {requiresLogin: true},
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'angles',
                    files: ['./js/plugins/chartJs/angles.js',
                        './js/plugins/chartJs/Chart.min.js'
                    ]
                }, {
                    name: 'angular-peity',
                    files: ['./js/plugins/peity/jquery.peity.min.js',
                        './js/plugins/peity/angular-peity.js'
                    ]
                }, {
                    name: 'ui.checkbox',
                    files: ['./js/bootstrap/angular-bootstrap-checkbox.js']
                }]);
            }
        }
    })



    .state('dashboard_4', {
        url: "/dashboard_4",
        templateUrl: "views/dashboard_4.html",
		data: {requiresLogin: true},
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'angles',
                    files: ['./js/plugins/chartJs/angles.js',
                        './js/plugins/chartJs/Chart.min.js'
                    ]
                }, {
                    name: 'angular-peity',
                    files: ['./js/plugins/peity/jquery.peity.min.js',
                        './js/plugins/peity/angular-peity.js'
                    ]
                }, {
                    serie: true,
                    name: 'angular-flot',
                    files: ['./js/plugins/flot/jquery.flot.js',
                        './js/plugins/flot/jquery.flot.time.js',
                        './js/plugins/flot/jquery.flot.tooltip.min.js',
                        './js/plugins/flot/jquery.flot.spline.js',
                        './js/plugins/flot/jquery.flot.resize.js',
                        './js/plugins/flot/jquery.flot.pie.js',
                        './js/plugins/flot/curvedLines.js',
                        './js/plugins/flot/angular-flot.js'
                    ]
                }]);
            }
        }
    })


});
