(function() {
  var grid = {
    templateUrl: './scripts/components/grid/grid.view.html',
    controller: 'GridController'
  };

  angular
    .module('components.grid')
    .component('grid', grid);
})();
