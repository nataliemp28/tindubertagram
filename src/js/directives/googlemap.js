angular.module('travelApp')
.directive('googleMap', googleMap);

googleMap.$inject = ['$window', 'mapStyles'];
function googleMap($window, mapStyles) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">Google map here!</div>',
    scope: {
      posts: '='
    },
    link: function($scope, element) {

      const map = new $window.google.maps.Map(element[0], {
        center: { lat: 22.212328, lng: -2.191592 },
        zoom: 3,
        styles: mapStyles,
        scrollwheel: false,
        minZoom: 3
      });

      const infowindow = new $window.google.maps.InfoWindow();

      $scope.posts.forEach((post) => {
        const marker = new $window.google.maps.Marker({
          position: post.latlng,
          map: map,
          icon: 'assets/images/newnewicon.png'
        });

        marker.addListener('click', () => {
          infowindow.close();
          infowindow.setContent(`<h6 class="infoWindowText">${post.title}</h6><p><img src="${post.image}" class="infoWindowImg"></p>
        `);

          infowindow.open(map, marker);
        });
      });
    }
  };
}
