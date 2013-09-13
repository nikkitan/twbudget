(function(){
  var mod;
  mod = {};
  mod.version = function(){
    return "0.1";
  };
  mod.ProductSearch = ['$http'].concat(function($http){
    var currentQuery, results;
    currentQuery = '';
    results = {};
    return {
      search: function(query, cb){
        var currentQuery;
        currentQuery = query;
        return $http.get('/1/products/' + currentQuery).success(cb);
      },
      getResults: function(){
        return results;
      },
      moreResults: function(which){
        console.log('more');
        return results[which].products.push({
          name: 'newly added'
        });
      }
    };
  });
  mod.BudgetItem = ['$http'].concat(function($http){
    return {
      get: function(key, cb){
        return $http.get("/1/budgetitems/" + key).success(cb);
      },
      update: function(key, verb, cb){
        console.log('updating', key, verb);
        return $http.post("/1/budgetitems/" + key + "/" + verb).success(cb);
      },
      addtag: function(key, tag, cb){
        return $http.post("/1/budgetitems/" + key + "/tags/" + tag).success(cb);
      }
    };
  });
  angular.module('app.services', []).factory(mod);
}).call(this);
