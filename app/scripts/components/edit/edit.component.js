(function() {
  var edit = {
    bindings: {
      onAddToggle: '&'
    },
    templateUrl: './scripts/components/edit/edit.view.html',
    controller: 'EditController',
  };

  angular
    .module('components.edit')
    .component('edit', edit);
})();
