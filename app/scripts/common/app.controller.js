(function() {
  function AppController(coreservice) {
    var vm = this;
  };

  angular
    .module('common')
    .controller('AppController', AppController);
  AppController.$inject = ['coreservice'];
})();
