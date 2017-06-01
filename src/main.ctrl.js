angular.module("QrApp")

.controller("MainController", function($scope) {
	$scope.contact = require("vcards-js")();

	$scope.createCode = function () {
		$scope.vcardData = $scope.contact.getFormattedString();
	};
});
