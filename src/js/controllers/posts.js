angular.module('travelApp')
  .controller('CreatePostController', CreatePostController)
  .controller('ShowPostController', ShowPostController);


CreatePostController.$inject = ['$auth', 'Post', '$state', '$window', '$scope'];
function CreatePostController($auth, Post, $state, $window, $scope) {
  const newPost = this;
  newPost.formVisible = false;
  newPost.location;
  newPost.formattedLocation;
  newPost.submitLat;
  newPost.submitLng;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((data) => {
        newPost.location = data;
        newPost.submitLat = newPost.location.coords.latitude;
        newPost.submitLng = newPost.location.coords.longitude;
        geocodeLatLng(geocoder);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  getLocation();

  const geocoder = new $window.google.maps.Geocoder;

  function geocodeLatLng(geocoder) {
    const location = newPost.location.coords;
    const latlng = {lat: location.latitude, lng: location.longitude};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          newPost.formattedLocation = results[1].formatted_address;
          console.log(newPost.formattedLocation);
          $scope.$apply();
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  function autoComplete(){
    var input = /** @type {!HTMLInputElement} */(document.getElementById('pac-input'));
    var autocomplete = new $window.google.maps.places.Autocomplete(input);

    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        console.log( 'No details available for input');
        return;
      } else {
        newPost.submitLat = place.geometry.location.lat();
        newPost.submitLng = place.geometry.location.lng();
      }
    });
  }

  newPost.autoComplete = autoComplete;

  function toggleForm() {
    if (newPost.formVisible) {
      return;
    } else {
      newPost.formVisible = newPost.formVisible ? false : true;
    }
  }


  newPost.toggleForm = toggleForm;

  newPost.post = {};
  newPost.post.user = $auth.getPayload()._id;

  function createPost(){
    Post.save(newPost.post, () =>{
      $state.reload();
      newPost.formVisible = false;
    });
  }

  newPost.create = createPost;
}


ShowPostController.$inject = ['$auth', 'Post', '$state'];
function ShowPostController($auth, Post, $state) {
  const showPost = this;

  showPost.post = Post.get({ id: $state.params.id });
}
