// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
(function() {

var app = angular.module('starter', ['ionic', 'starter.controllers', 'angularMoment']);

  app.filter('trimHurriyet', function () {
    return function(value) {
        return value.replace(/(.*)hurriyet(.*)tr\//gi, '');
    };
  });

  app.factory('myService', function() {
    var savedData = {};
    function set(data) {
      savedData = data;
    }
    function get() {
      return savedData;
    }

    return {
      set: set,
      get: get
    };

  });


  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
      url: '',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: '/playlists/:playlistId',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.hurriyet', {
      url: '/hurriyet/:topicTitle',
      views: {
        'menuContent': {
          templateUrl: 'templates/hurriyet.html',
          controller: 'hurriyetCtrlNew',
          params: {
              paramOne: { objectProperty: "defaultValueOne" },  //default value
              paramTwo: "defaultValueTwo"
          }
        }
      }
    })

    .state('app.hurriyetDet', {
      url: '/hurriyet/detay/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/hurriyetDet.html',
          controller: 'hurriyetDetCtrlNew'
        }
      }
    })

    .state('app.funny', {
      url: '/news/:newsType',
      views: {
        'menuContent': {
          templateUrl: 'templates/reddit.html',
          controller: 'newsCntrl'
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home');
  });

}());
