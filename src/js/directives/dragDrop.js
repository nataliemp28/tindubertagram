angular
  .module('travelApp')
  .directive('dragDrop', dragDrop);

function dragDrop() {
  const reader = new FileReader();
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/dragDrop.html',
    scope: {
      base64: '=',
      src: '='
    },
    link($scope, element) {

      $scope.base64 = null;
      $scope.active = false;
      $scope.message = 'Drop image here!';

      $scope.$watchGroup(['base64', 'src'], () => {
        $scope.image = $scope.base64 || $scope.src;
      });

      reader.onload = () => {
        $scope.base64 = reader.result;
        $scope.$apply();
      };

      element
        .on('dragenter', () => {
          $scope.active = true;
          $scope.$apply();
        })
        .on('dragover', (e) => {
          e.preventDefault();
        })
        .on('dragleave', () => {
          $scope.active = false;
          $scope.$apply();
        })
        .on('drop', (e) => {
          e.preventDefault();
          const file = (e.target.files || e.dataTransfer.files)[0];
          reader.readAsDataURL(file);
        });
    }
  };
}
