(function() {
  var chart = {
    templateUrl: './scripts/components/chart/chart.view.html',
    controller: 'ChartController'
  };

  angular
    .module('components.chart')
    .component('chart', chart);
})();
