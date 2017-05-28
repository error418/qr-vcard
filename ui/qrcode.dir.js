angular.module("QrApp")

.directive("qrCode", function($mdToast) {
	return {
		restrict: "E",
		templateUrl: "ui/partials/qrcode.html",
		scope: {
			data: "="
		},
		link: function(scope) {
			var QRCode = require("qrcode");
			var canvas = angular.element("canvas");

			scope.codeVisible = false;

			scope.save = function () {
				var dialog = require('electron').remote.dialog;

				var path = dialog.showSaveDialog({
					filters: [
						{"name": "Portable Network Graphics", extensions: ["png"]},
						{"name": "Scalable Vector Graphics", extensions: ["svg"]}
					]
				});

				QRCode.toFile(path, scope.displayData, {
				  "type": path.split('.').pop()
				}, function (error) {
				  if (error) {
						$mdToast.show($mdToast.simple().textContent('Oh no! Something went wrong :('));
						console.log(error);
					}
				})
			};

			scope.$watch("data", function() {
				if(scope.data !== undefined) {
					scope.displayData = getQrData(scope.data);

					QRCode.toCanvas(canvas.get(0), scope.displayData, function (error) {
						if (error) {
							$mdToast.show($mdToast.simple().textContent('Oh no! Something went wrong :('));
							console.log(error);
						}
						$mdToast.show($mdToast.simple().textContent('Hello!'));
						scope.codeVisible = !error;
					});
				} else {
					angular.element("canvas").empty();
				}
			});

			function getQrData(data) {
				return [
					{
					 data: data,
					 mode: "byte"
					}
				];
			}
		}
	};
});
