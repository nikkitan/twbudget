(function(){
  var mod;
  mod = {};
  mod.AppCtrl = [
    '$scope', '$location', '$resource', '$rootScope', function(s, $location, $resource, $rootScope){
      s.$location = $location;
      s.$watch('$location.path()', function(path){
        return s.activeNavId = path || '/';
      });
      return s.getClass = function(id){
        if (s.activeNavId.substring(0, id.length) === id) {
          return 'active';
        } else {
          return '';
        }
      };
    }
  ];
  mod.LoginController = ['$scope', '$http', 'authService'].concat(function($scope, $http, authService){
    $scope.$on('event:auth-loginRequired', function(){
      return $scope.loginShown = true;
    });
    $scope.$on('event:auth-loginConfirmed', function(){
      return $scope.loginShown = false;
    });
    window.addEventListener('message', function(arg$){
      var data;
      data = arg$.data;
      return $scope.$apply(function(){
        if (data.auth) {
          $scope.message = '';
          authService.loginConfirmed();
        }
        if (data.authFailed) {
          return $scope.message = data.message || 'login failed';
        }
      });
    });
    $scope.message = '';
    return $scope.submit = function(){
      return $http.post('auth/login', {
        email: $scope.email,
        password: $scope.password
      }).success(function(){
        $scope.message = '';
        return authService.loginConfirmed();
      }).error(function(it){
        return $scope.message = typeof it === 'object' ? it.message : it;
      });
    };
  });
  mod.Profile = ['$scope', '$http'].concat(function($scope, $http){
    $scope.name = 'Guest';
    return $http.get('/1/profile').success(function(res){
      var name;
      name = res.name;
      return $scope.name = name;
    });
  });
  mod.MyCtrl1 = ['$scope', 'ProductSearch'].concat(function($scope, productSearch){
    $scope.updateblah = function(which){
      var i;
      i = parseInt($('#categories').scrollLeft() / 150);
      if ($scope.category_index_old !== i) {
        return $scope.category_index_old = i;
      }
    };
    $scope.blah = function(which){
      var i;
      i = 1 + Math.abs(which - parseInt($('#categories').scrollLeft() / 150));
      if (i >= 3) {
        i = 3;
      }
      return i;
    };
    $scope.moreProducts = productSearch.moreResults;
    $scope.search = 'HTC';
    $scope.cc = 1;
    return productSearch.search("htc", function(results){
      $scope.results = results;
    });
  });
  mod.BudgetItem = ['$scope', '$state', 'BudgetItem'].concat(function($scope, $state, BudgetItem){
    var update_from_item;
    console.log('BudgetItem Controller!');
    $scope.$watch('$state.params.code', function(code){
      return $scope.code = code;
    });
    update_from_item = function(res){
      return $scope.nlikes = res.nlikes, $scope.nhates = res.nhates, $scope.ncuts = res.ncuts, $scope.nconfuses = res.nconfuses, $scope.tags = res.tags, $scope;
    };
    $scope.$watch('key', function(){
      return BudgetItem.get($scope.key, function(res){
        return update_from_item(res);
      });
    });
    return import$($scope, {
      nlikes: '???',
      nconfuses: '???',
      nhates: '???',
      ncuts: '???',
      like: function(){
        return BudgetItem.update($scope.key, 'likes', update_from_item);
      },
      hate: function(){
        return BudgetItem.update($scope.key, 'hates', update_from_item);
      },
      confuse: function(){
        return BudgetItem.update($scope.key, 'confuses', update_from_item);
      },
      cut: function(){
        return BudgetItem.update($scope.key, 'cuts', update_from_item);
      },
      addtag: function(){
        if ($scope.tagname) {
          return BudgetItem.addtag($scope.key, $scope.tagname, update_from_item);
        }
      },
      addunit: function(){
        if (!$scope.addunit_quantity) {
          return $('#addunit-modal input:eq(0)').tooltip("show");
        }
        if (!$scope.addunit_unit) {
          return $('#addunit-modal input:eq(1)').tooltip("show");
        }
        if (!jQuery.isNumeric($scope.addunit_value)) {
          return $('#addunit-modal input:eq(2)').tooltip("show");
        }
        return $('#addunit-modal').modal('hide');
      },
      units: [["", '元', '1'], ['份', '營養午餐', '25'], ['份', '營養午餐(回扣)', '30'], ['人', '的一年薪水', '308000'], ['座', '釣魚台', '80000000'], ['秒', '太空旅遊', '16666'], ['碗', '鬍鬚張魯肉飯', '68'], ['個', '便當', '50'], ['杯', '珍奶', '30'], ['份', '雞排加珍奶', '60'], ['個', '晨水匾', '700000000'], ['個', '夢想家', '200000000'], ['個', '林益世(粗估)', '83000000'], ['座', '冰島', '2000080000000'], ['坪', '帝寶', '2500000'], ['支', 'iPhone5', '25900'], ['座', '硬兔的小島', '2000080000000']]
    });
  });
  mod.DebtClock = ['$scope', '$timeout'].concat(function($scope, $timeout){
    $scope.data = {
      yr2008: {
        base: 13171112000000,
        interest: 7389
      }
    };
    $scope.refreshDebtClock = function(){
      var now, spday, message, a;
      now = new Date();
      spday = new Date(2008, 1 - 1, 1);
      message = '';
      a = (now.getTime() - spday.getTime()) / 1000 * $scope.data.yr2008.interest + $scope.data.yr2008.base;
      a = Math.ceil(a);
      return $scope.total = {
        debt: a,
        avg: Math.round(a / 23000000)
      };
    };
    $scope.scheduleDebtClockRefresh = function(){
      var timeoutId;
      return timeoutId = $timeout(function(){
        $scope.refreshDebtClock();
        $scope.scheduleDebtClockRefresh();
      }, 1000);
    };
    return $scope.scheduleDebtClockRefresh();
  });
  mod.DailyBread = ['$scope', '$http'].concat(function($scope, $http){
    $scope.tax = 80000;
    $scope.$watch('tax', function(){
      var ref$;
      return (ref$ = window.__db) != null ? ref$.setTax($scope.tax) : void 8;
    });
    return dailybread();
  });
  mod.UnitMapper = ['$scope'].concat(function($scope){
    return $scope.units = UnitMapper.table;
  });
  mod.MyCtrl2 = [
    '$scope', function(s){
      return s.Title = "MyCtrl2";
    }
  ];
  angular.module('app.controllers', ['http-auth-interceptor']).controller(mod);
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
