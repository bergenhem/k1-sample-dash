(function() {
  var app = {
    templateUrl: './scripts/common/app.view.html',
    controller: 'AppController'
  };

  angular
    .module('common')
    .component('app', app)
    .config(function ($stateProvider) {
      $stateProvider
        .state('app', {
          url: '/',
          component: 'app'
        })
    });
})();
