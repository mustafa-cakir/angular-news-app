angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  $scope.loginData = {};


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.hideLoading = function(){
     // $ionicLoading.hide();
      console.log('clicked');
    };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('items', function($scope) {
  $scope.items = [
    { title: 'Android', icon:'ion-social-android'},
    { title: 'Video', icon:'ion-social-youtube'},
    { title: 'Funny', icon:'ion-happy'},
    { title: 'Gaming', icon:'ion-ios-game-controller-b'},
    { title: 'Pics', icon:'ion-ios-camera'},
    { title: 'Music', icon:'ion-play'},
    { title: 'Movies', icon:'ion-camera'},
    { title: 'All', icon:'ion-arrow-shrink'}
  ];

  $scope.hurrs = [
    { title: 'Ana Sayfa', id: '1', icon:'ion-home'},
    { title: 'Gundem', id: '1', icon:'ion-flame'},
    { title: 'Spor', id: '14', icon:'ion-ios-football'},
    { title: 'Dunya', id: '2', icon:'ion-earth'},
    { title: 'Teknoloji', id: '2158', icon:'ion-social-apple'},
    { title: 'Magazin', id: '2035', icon:'ion-chatboxes'},
    //{ title: 'WebTv', id: 'web', icon:'ion-ios-videocam'},
    { title: 'Kelebek', id: '2451', icon:'ion-paintbrush'},
    { title: 'Sinema', id: '2437', icon:'ion-videocamera'},
    { title: 'Ekonomi', id: '4', icon:'ion-cash'},
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('LeftMenuCtrl', function($scope, $location) {
  $scope.isItemActive = function(item, section) {
    return $location.path().indexOf(section+item.title) > -1;
  };
  $scope.isItemActiveHurr = function(hurr, section) {
    return $location.path().indexOf(section + hurr.id + '/' + hurr.title) > -1;
  };
})

.controller('hurriyetCtrlNew', function($http, $scope, $stateParams, $ionicLoading) {
  $ionicLoading.show({
    template: '<ion-spinner></ion-spinner><p>Loading...</p>'
  });
  if ($stateParams.topicTitle === 'Ana Sayfa') {
    //$stateParams.topicTitle = '';
  };
  $scope.topicTitle = $stateParams.topicTitle;
  var url = 'https://www.flexiblewebdesign.com/news/hurriyet.php';
  var req = {
     method: 'GET',
     url: url,
     params: {filter: $stateParams.topicTitle.toLowerCase(), case: 'list'}
  }
  $http(req).then(function(response){
    console.log(response.data);
    $scope.news = response.data;
    $ionicLoading.hide();
  }, function(){console.log('error error!')});

})
.controller('hurriyetDetCtrlNew', function($http, $scope, $stateParams, $ionicLoading) {
  $ionicLoading.show({
    template: '<ion-spinner></ion-spinner><p>Loading...</p>'
  });
  $scope.id = $stateParams.id;
  var url = 'https://www.flexiblewebdesign.com/news/hurriyet.php';
  var req = {
     method: 'GET',
     url: url,
     params: {id: $stateParams.id.toLowerCase(), case: 'detay'}
  }
  $http(req).then(function(response){
    console.log(response.data);
    $scope.newsDetay = response.data;
    $ionicLoading.hide();
  }, function(){console.log('error error!')});

})

.controller('hurriyetCtrl', function($http, $scope, $stateParams, $ionicLoading) {

  $ionicLoading.show({
    template: '<ion-spinner></ion-spinner><p>Loading...</p>'
  });

  $scope.topicTitle = $stateParams.topicTitle;
  // get the FEED via Google Api Feed service
  var url = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=40&callback=JSON_CALLBACK&q=http://rss.hurriyet.com.tr/rss.aspx?sectionId=' + $stateParams.itemId;

  $http.jsonp(url).then(function(response){
    $scope.news = response.data.responseData.feed.entries;
    $ionicLoading.hide();
  });
})

.controller('hurriyetDetCtrl', function($http, $scope, $stateParams, $ionicLoading) {

    $ionicLoading.show({
       template: '<ion-spinner></ion-spinner><p>Loading...</p>'
    });

    var url = 'http://www.hurriyet.com.tr/' + $stateParams.hurriyetDetLink;
    $.ajax({
      url: url,
      type: 'GET',
      contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
      success: function(response) {
        responseHTML = $('.news-detail-text',response.responseText).html();
        responseHTML= responseHTML.replace(/&amp;#39;/g,"'");
        responseHTML= responseHTML.replace(/href="\//g,'href="#/hurriyetDet/');
        $('ion-view[nav-view="active"] #hurriyetDetContainer').append(responseHTML);
        $ionicLoading.hide();
      },
      error: function(xhr, status, error) {
          console.log(status + '; ' + error);
      }
    });
})

.controller('newsCntrl', function($http, $scope, $stateParams) {
  $scope.stories = [];
  var newsType = $stateParams.newsType;
  $scope.newsType = newsType;
  function loadStories(params, callback, newsType) {
    $http.get('https://www.reddit.com/r/'+ newsType +'/new/.json', {params: params}).success(function(response){
      var stories = [];
      angular.forEach(response.data.children, function(child){
        child.data.thumbnail = ((child.data.thumbnail).startsWith('http')) ? child.data.thumbnail : 'img/nothumb.jpg';
        stories.push(child.data);
      });
     callback(stories);
    });
  }

  $scope.loadOlderStories = function() {
    var params = {};
    if($scope.stories.length > 0) {
      params['after'] = $scope.stories[$scope.stories.length - 1].name;
    }
    loadStories(params, function(olderStories) {
      $scope.stories = $scope.stories.concat(olderStories);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, newsType);

  };

  $scope.loadNewerStories = function() {
    var params = {'before' : $scope.stories[0].name};
    loadStories(params, function(newerStories) {
      $scope.stories = newerStories.concat($scope.stories);
      $scope.$broadcast('scroll.refreshComplete');
    }, newsType);

  };

});
