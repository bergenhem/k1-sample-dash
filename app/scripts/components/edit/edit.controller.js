(function() {
  function EditController(coreservice) {
    var vm = this;
    vm.gridItem = {
      "OrderId": null,
      "OrderDate": null,
      "Customer": null,
      "Employee": null,
      "OrderTotal": null,
      "OrderStatus": null,
      "Delivered": false
    };

    vm.dropdownDataSource = new kendo.data.DataSource({
      data: [
        { OrderStatus: "Order Placed", value: 0 },
        { OrderStatus: "Processing", value: 1 },
        { OrderStatus: "Shipped", value: 2 }
      ]
    });

    vm.submitClick = function(e) {
      e.preventDefault();
      coreservice.addData(vm.gridItem);
      vm.closeForm();
    };

    vm.closeForm = function() {
      vm.onAddToggle();
    }
  };

  angular
    .module('components.edit')
    .controller('EditController', EditController);
  EditController.$inject = ['coreservice'];
})();
