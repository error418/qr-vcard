angular.module("QrApp")

.directive("qrCode", function($mdToast) {
	return {
		restrict: "E",
		templateUrl: "qrcode/qrcode.html",
		scope: {
			data: "="
		},
		link: function(scope, $log) {
			var QRCode = require("qrcode");
			var canvas = angular.element("canvas");

			scope.codeVisible = false;

			scope.save = function () {
				var dialog = require("electron").remote.dialog;

				var path = dialog.showSaveDialog({
					filters: [
						{"name": "Portable Network Graphics", extensions: ["png"]},
						{"name": "Scalable Vector Graphics", extensions: ["svg"]}
					]
				});

				if (!path) {
					return;
				}

				QRCode.toFile(path, scope.displayData, {
					"type": path.split(".").pop()
				}, function (error) {
					if (error) {
						$mdToast.show($mdToast.simple().textContent("Oh no! Something went wrong :("));
						$log.error(error);
					}
				});
			};

			scope.$watch("data", function() {
				if(scope.data !== undefined) {
					scope.displayData = getQrData(scope.data);

					QRCode.toCanvas(canvas.get(0), scope.displayData, function (error) {
						if (error) {
							$mdToast.show($mdToast.simple().textContent("Oh no! Something went wrong :("));
							$log.error(error);
						}
						$mdToast.show($mdToast.simple().textContent("Code generated."));
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
