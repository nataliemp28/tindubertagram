angular
  .module('travelApp')
  .directive('card', card);

function card() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/card.html'
  };
}
