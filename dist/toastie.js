(function(module) {

    "use strict";
    
    module.constant("TYPES", {
        INFO: "info"
    })

    .controller("ToastieController", ["$scope", "$rootScope", "toastieService", function($scope, $rootScope, toastieService) {
        $scope.toasts = [];

        var addToast = function(event, item) {
            $scope.toasts.push(item);
        }

        $rootScope.$on("toast", addToast);
    }])

    .service("toastieService", ["$rootScope", "TYPES", function($rootScope) {

        var create = function(toast) {
            $rootScope.$emit("toast", toast);
        }

        // Animation from MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Detecting_CSS_animation_support
        // Needed for IE9 support even though IE9 support needs to die.
        var animationDetect = function() {
            var animation = false,
                animationstring = 'animation',
                keyframeprefix = '',
                domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
                pfx  = '',
                elm = document.createElement('div');

            if( elm.style.animationName !== undefined ) { animation = true; }    

            if( animation === false ) {
              for( var i = 0; i < domPrefixes.length; i++ ) {
                if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                  pfx = domPrefixes[ i ];
                  animationstring = pfx + 'Animation';
                  keyframeprefix = '-' + pfx.toLowerCase() + '-';
                  animation = true;
                  break;
                }
              }
            }

            return animation;
        }

        var service = {
            create: create,
            animationDetect: animationDetect
        }

        return service;
    }])

    .directive("toastie", ['toastieService', function(toastieService) {
        return {
            controller: "ToastieController",
            templateUrl: "toasts-template.html",
            link: function($scope, $element, $attrs) {
                if (toastieService.animationDetect()) {
                     $element[0].className += ' animated';   
                }
            }
        }
    }])

    .directive('toast', ['toastieService', '$timeout', function(toastieService, $timeout) {
        var events = ["webkitAnimationEnd", "mozAnimationEnd", "oTransitionEnd", "MSAnimationEnd", "animationend"];

        return {
            restrict: "E",
            link: function($scope, $element, $attrs) { 
                var $el = $element[0];

                if (toastieService.animationDetect()) {
                    $scope.$watch($attrs.toast, function(value) {
                        events.map(function(event) {
                            $el.addEventListener(event, function() {
                                $el.remove();
                                $scope.toasts.shift();
                                $el.removeEventListener(event);
                            }, false);
                        });
                    });
                } else {
                    $timeout(function() {
                        angular.element($element).remove(); 
                        $scope.toasts.shift();
                    }, 3000);
                }                
            }
        }
    }]);

})(angular.module("toastie", []));
;(function(){

'use strict';

angular.module('toastie').run(['$templateCache', function($templateCache) {

  $templateCache.put('toasts-template.html', '<div class="toasts">\n    <toast class="toast {{toast.type}}" ng-repeat="toast in toasts track by $index">\n        <span class="content">{{toast.content}}</span>\n    </toast>\n</div>');

}]);

})();