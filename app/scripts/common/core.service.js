(function() {
  function coreservice($http, $q) {
    var callbacks = [];
    var dataFromBackend = [
      {
        'OrderId': 1,
        'OrderDate': new Date('2017/01/8'),
        'Customer': 'ACME',
        'Employee': 'Bob',
        'OrderTotal': 1000,
        'OrderStatus': 'Shipped',
        'Delivered': false
      },
      {
        'OrderId': 2,
        'OrderDate': new Date('2017/01/10'),
        'Customer': 'Hogwarts',
        'Employee': 'Sarah',
        'OrderTotal': 3000,
        'OrderStatus': 'Processing',
        'Delivered': false
      },
      {
        'OrderId': 3,
        'OrderDate': new Date('2017/02/22'),
        'Customer': 'Stark Industries',
        'Employee': 'Bob',
        'OrderTotal': 1299,
        'OrderStatus': 'Order Placed',
        'Delivered': true
      },
      {
        'OrderId': 4,
        'OrderDate': new Date('2017/02/12'),
        'Customer': 'Wayne Industries',
        'Employee': 'Sarah',
        'OrderTotal': 599,
        'OrderStatus': 'Order Placed',
        'Delivered': true
      },
    ];

    // We are just faking a two second load here since we're dealing with local data
    function readData() {
      var deferred = $q.defer();

      dataFromBackend.sort(_compare);
      deferred.resolve(dataFromBackend);

      return deferred.promise;
    };

    // External form is the only way to add so we have to make our own unique ID setup
    // Can be automated if we let the Grid's DataSource add without the external form
    function addData(dataItem) {
      var deferred = $q.defer();

      dataFromBackend.sort(_compare);
      var lastId = dataFromBackend[dataFromBackend.length - 1].OrderId;
      dataItem.OrderId = lastId + 1; //increment our OrderIds
      dataFromBackend.push(dataItem);
      for(var i = 0; i < callbacks.length; i++) {
        callbacks[i](dataItem);
      }

      deferred.resolve(dataFromBackend);

      return deferred.promise;
    };

    function updateData(dataItem) {
      var deferred = $q.defer();

      var itemIndex = _findItemIndexById(dataItem.OrderId);
      if(itemIndex != undefined) {
        var itemToUpdate = dataFromBackend[itemIndex];
        itemToUpdate.OrderDate = dataItem.OrderDate;
        itemToUpdate.Customer = dataItem.Customer;
        itemToUpdate.Employee = dataItem.Employee;
        itemToUpdate.OrderTotal = dataItem.OrderTotal;
        itemToUpdate.OrderStatus = dataItem.OrderStatus;
        itemToUpdate.Delivered = dataItem.Delivered;

        for(var i = 0; i < callbacks.length; i++) {
          callbacks[i](dataItem);
        }
        
        deferred.resolve(itemToUpdate);
        }
        else {
          deferred.reject("Item not found via Order Id: " + dataItem.OrderId);
        }

      return deferred.promise;
    };

    // This is not really needed as we wrap our array with ObservableArray
    // This would be where we call our server
    function deleteData(dataItem) {
      var deferred = $q.defer();
      //TODO: Delete item on the server
      for(var i = 0; i < callbacks.length; i++) {
        callbacks[i](dataItem);
      }
      deferred.resolve(dataItem);
      return deferred.promise;
    };

    function onDataChanged(callback) {
      callbacks.push(callback);
    };

    function _findItemIndexById(id) {
      var indexToReturn = undefined;
      for(var i = 0; i < dataFromBackend.length; i++) {
        if(dataFromBackend[i].OrderId === id) {
          indexToReturn = i;
        }
      }
      return indexToReturn;
    };

    // This is just to sort on IDs to be safe (we base new IDs off of the "last" ID)
    function _compare(a, b) {
      if(a.OrderId < b.OrderId) {
        return -1;
      }
      if(a.OrderId > b.OrderId) {
        return 1;
      }
      return 0;
    };

    return {
      readData: readData,
      addData: addData,
      updateData: updateData,
      deleteData: deleteData,
      onDataChanged: onDataChanged
    };
  };
  angular
    .module('common')
    .factory('coreservice', coreservice);
  coreservice.$inject = ['$http', '$q'];
})();
