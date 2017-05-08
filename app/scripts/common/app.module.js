(function() {
  angular
    .module('common', [
      'ui.router',
      'components.edit',
      'components.grid',
      'components.chart'
    ])
    .run(['$state', function($state) {
      $state.transitionTo('app');
    }]);
})();
