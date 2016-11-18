angular
  .module('travelApp')
  .directive('toggle', toggle);

function toggle() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/toggle.html' ,
    scope: {
      isActive: '=',
      firstValue: '@',
      secondValue: '@'
    },
    link: function(scope, element) {
      element.on('click', () => {
        scope.isActive = !scope.isActive;
        scope.$apply();
      });
    }
  };
}
