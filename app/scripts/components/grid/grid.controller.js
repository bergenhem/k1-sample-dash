(function() {
  function GridController(coreservice) {
    var vm = this;

    vm.dropdownDataSource = new kendo.data.DataSource({
      data: [
        { OrderStatus: 'Order Placed', value: 0 },
        { OrderStatus: 'Processing', value: 1 },
        { OrderStatus: 'Shipped', value: 2 }
      ]
    });

    vm.gridDataSource = new kendo.data.DataSource({
      schema: {
        model: {
          id: 'OrderId',
          fields: {
            OrderId: { type: 'number', nullable: false, editable: false },
            OrderDate: { type: 'date' },
            Customer: { type: 'string' },
            Employee: { type: 'string' },
            OrderTotal: { type: 'number' },
            OrderStatus: { type: 'string' },
            Delivered: { type: 'boolean' }
          }
        }
      },
      transport: {
        read: function(e) {
          coreservice.readData()
          .then(function success(response) {
            e.success(response);
          }, function error(response) {
            console.log('Error while reading: ', response);
          });
        },
        update: function(e) {
          console.log("update!");
          coreservice.updateData(e.data)
          .then(function success(response) {
            e.success(response);
          }, function(error) {
            console.log('Error while Updating: ', error);
          });
        },
        destroy: function(e) {
          coreservice.deleteData(e.data)
          .then(function success(response) {
            e.success(response);
          }, function(error) {
            console.log('Error while deleting: ', error);
          })
        },
        parameterMap: function(data, type) {
          // Refer to the following documentation section for
          // how to customize parameters
          // http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-transport.parameterMap
        },
      },
      pageSize: 5
    });

    vm.statusDropDownEditor = function(container, options) {
      var editor = $('<select kendo-drop-down-list ' +
                      'k-option-label="{ OrderStatus: \'Order Status\' }"' +
                      'k-value-primitive="true"' +
                      'k-data-text-field="\'OrderStatus\'"' +
                      'k-data-value-field="\'OrderStatus\'"' +
                      'k-data-source="$ctrl.dropdownDataSource"' +
                      'data-bind="value:' + options.field + '"' +
                      '></select>')
                      .appendTo(container);
    };

    vm.gridColumns = [
        { field: 'OrderDate', title: 'Order Date', format: '{0:yyyy-MM-dd}', width: 150 },
        { field: 'Customer', title: 'Customer' },
        { field: 'Employee', title: 'Employee' },
        { field: 'OrderTotal', title: 'Order Total' },
        { field: 'OrderStatus', title: 'Order Status', editor: vm.statusDropDownEditor },
        { field: 'Delivered', title: 'Delivered', width: 140 },
        { command: ['edit', 'destroy'], title: '&nbsp;', width: 200 }
    ];

    vm.gridEditableOptions = {
      mode: 'inline',
      update: true,
      destroy: true
    };

    vm.gridDataBound = function(e) {
      var grid = e.sender;
      grid.element.height('auto');
      grid.element.find('.k-grid-content').height('auto');
      kendo.resize(grid.element);
    };

    coreservice.onDataChanged(function() {
      console.log("on data added Grid");
      vm.gridDataSource.read();
    });
  };

  angular
    .module('components.grid')
    .controller('GridController', GridController);
  GridController.$inject = ['coreservice'];
})();
