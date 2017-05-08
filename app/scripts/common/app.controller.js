(function() {
  function AppController(coreservice) {
    var vm = this;
    vm.editToggle = true;

    vm.toggleAdd = function() {
      vm.editToggle = !vm.editToggle;
    };

    // This is used for the closing of the edit form
    vm.hideToggle = function(){
      vm.editToggle = true;
    };

  };

  angular
    .module('common')
    .controller('AppController', AppController);
  AppController.$inject = ['coreservice'];
})();
