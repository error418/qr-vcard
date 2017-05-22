angular.module("QrApp")

.directive("qrCode", function() {
	return {
		restrict: "E",
		templateUrl: "ui/partials/qrcode.html",
		scope: {
			data: "="
		},
		link: function(scope) {
			var QRCode = require("qrcode");
			var canvas = angular.element("canvas");

			scope.$watch("data", function() {
				if(scope.data !== undefined) {
					QRCode.toCanvas(canvas.get(0), scope.data, function (error) {
						if (error) console.log(error);
					});
				} else {
					angular.element("canvas").empty();
				}
			});
		}
	};
});
