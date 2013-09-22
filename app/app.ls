# Declare app level module which depends on filters, and services
ChooseApArCtrl=($scope, $stateProvider)->console.log \Chooooo!
ChooseApArCtrl.$inject=[\$scope \$stateProvider]
angular.module \app, <[ partials ngResource app.controllers app.directives app.filters app.services ui.directives ui.router]>

.config <[$stateProvider $urlRouterProvider $locationProvider]> ++ (stateProvider, $urlRouterProvider, $locationProvider) ->
  stateProvider
    .state 'view2' do
      url: '/view2'
      templateUrl: '/partials/partial2.html'
    .state 'view3' do
      url: '/view3'
      templateUrl: '/partials/partial3.html'
      controller: \BudgetItem
    .state 'choose_apar' do
      url: '/choose_apar'
      templateUrl: '/partials/choose_apar.html'
      controller:['$scope','$stateProvider',($scope,$stateProvider)->console.log \Embed! $stateProvider.state('/debtclock') ]
    .state 'budget' do
      url: '/budget'
      templateUrl: '/partials/partial4.html'
      controller: \BudgetItem
    .state 'budget.detail' do
      url: '/{code}'
      templateUrl: '/partials/partial4.html'
    .state 'debtclock' do
      url: '/debtclock'
      templateUrl: '/partials/debtclock.html'
    .state 'profile' do
      url: '/profile'
      templateUrl: '/partials/profile.html'
    .state 'aboutus' do
      url: '/aboutus'
      templateUrl: '/partials/aboutus.html'

  $urlRouterProvider
    .otherwise('/choose_apar')
    #.otherwise('/budget')

  $locationProvider.html5Mode true

.run <[$rootScope $state $stateParams $location]> ++ ($rootScope, $state, $stateParams, $location) ->
  console.log 'RUN!'
  $rootScope.$state = $state
  $rootScope.$stateParam = $stateParams
  $rootScope.go = -> 
   console.log 'GO!'
   $location.path it
   console.log it
  #$rootScope._build = window.global.config.BUILD
  $rootScope.$on \$stateChangeSuccess (e, {url,name}) ->
    console.log "url"+url
    console.log "name"+name
    window?ga? 'send' 'pageview' page: url, title: name
