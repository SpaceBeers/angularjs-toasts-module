(function(module) {

    "use strict";

    module.directive("fire", ["toastieService", function(toastieService) {
        var toasts = [{
            type: "info",
            content: "Oh. Hi. I'm a toast"
        },
        {
            type: "warning",
            content: "I'm a warning. You're next!"
        },
        {
            type: "error",
            content: "Derp Derp Error Derp"
        },
        {
            type: "success",
            content: "Hurrah!"
        },
        {
            type: "info",
            content: "Somebody love me"
        }]

        return {
            restrict: "E",
            replace: true,
            link: function($scope, $element, $attrs) {
                $scope.fire = function() {
                    toastieService.create(toasts[Math.floor((Math.random() * toasts.length) + 1)]);
                }
            },
            template: '<button ng-click="fire()">Fire Bread!!</button>'
        }
    }]);

})(angular.module("toastie-helpers", ["toastie"]));