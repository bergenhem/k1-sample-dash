(function() {
  function ChartController(coreservice) {
    var vm = this;

    // Since this is to compare employees we will group our data by the Employee field
    vm.chartDataSource = new kendo.data.DataSource({
      transport: {
        read: function(e) {
          coreservice.readData()
          .then(function success(response) {
            console.log('Reading grid data');
            e.success(response);
          }, function error(response) {
            console.log('Error while reading: ', response);
          });
        }
      },
      group: {
        field: 'Employee'
      },
      pageSize: 5
    });

    coreservice.onDataChanged(function() {
      console.log("on data added chart")
      vm.chartDataSource.read();
    });

  };
  angular
    .module('components.chart')
    .controller('ChartController', ChartController);
    ChartController.$inject = ['coreservice'];
})();
