var myApp = angular.module('weatherApp',['ngRoute','ngResource']);
myApp.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'pages/home.html',
		controller: 'homeController'
		})
	.when('/forecast',{
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})
});

myApp.service('nameService', function(){
	this.name = "Santa Clara";
});
myApp.controller('homeController',['$scope','$location','nameService',function($scope,$location,nameService){
	// $scope.cityName="london";
	$scope.$watch('cityName', function(){
	nameService.name = $scope.cityName;
});
$scope.submit = function(){
	$location.path = "/forecast";
};	
}]);

myApp.controller('forecastController',['$scope','$resource','nameService', function($scope,$resource, nameService){
	$scope.cityName = nameService.name;
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback: "JSON_CALLBACK"},{	get: {	method: "JSONP"	}});
	$scope.weatherResult = $scope.weatherAPI.get({q: $scope.cityName, cnt : 7, APPID: 'f2377b75c7705db7f2a250ff48d3378e'});
	$scope.convertToF = function(deg){
	return Math.round(1.8 * (deg - 273) + 32);
	};
	$scope.convertToDate = function(date){
	var dt = new Date(date*1000);
	return dt.toLocaleDateString("en-us",{month: 'short'}) +' '+dt.getDate();
	};
	// console.log($scope.weatherResult);
}]);