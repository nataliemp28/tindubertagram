"use strict";function Router(e,t){e.state("register",{url:"/register",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("feed",{url:"/feed",templateUrl:"/templates/feed.html",controller:"MainFeedController as mainFeed"}).state("show",{url:"/posts/:id",templateUrl:"/templates/show.html",controller:"ShowPostController as showPost"}).state("profile",{url:"/users/:id",templateUrl:"/templates/profile.html",controller:"UserShowController as userShow"}).state("map",{url:"/map",templateUrl:"/templates/map.html"}).state("home",{url:"/",templateUrl:"/templates/home.html"}),t.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"332198860490764"}),e.instagram({clientId:"92e67d01aacb443fa782c92500650463"})}function RegisterController(e,t,o,r){function l(){e.signup(i.user).then(function(e){o.localStorage.setItem("token",e.data.token),r.$broadcast("loggedIn"),t.go("feed")})}var i=this;i.user={},i.submit=l}function LoginController(e,t,o){function r(){e.login(i.credentials).then(function(){o.$broadcast("loggedIn"),t.go("feed")})}function l(r){console.log("Authenticating"),e.authenticate(r).then(function(){o.$broadcast("loggedIn"),t.go("feed")})}var i=this;i.credentials={},i.isActive=!1,i.submit=r,i.authenticate=l}function createPost(){return{restrict:"E",replace:!0,templateUrl:"templates/createPost.html",controller:"CreatePostController as createPost"}}function dragDrop(){var e=new FileReader;return{restrict:"E",replace:!0,templateUrl:"templates/dragDrop.html",scope:{base64:"=",src:"="},link:function(t,o){t.base64=null,t.active=!1,t.message="Drop image here!",t.$watchGroup(["base64","src"],function(){t.image=t.base64||t.src}),e.onload=function(){t.base64=e.result,t.$apply()},o.on("dragenter",function(){t.active=!0,t.$apply()}).on("dragover",function(e){e.preventDefault()}).on("dragleave",function(){t.active=!1,t.$apply()}).on("drop",function(t){t.preventDefault();var o=(t.target.files||t.dataTransfer.files)[0];e.readAsDataURL(o)})}}}function MainFeed(e){return new e("/users/feed")}function ProfileFeed(e){return new e("/users/:id/posts",{id:"@_id"})}function MainFeedController(e,t){var o=this;o.all=t.query()}function ProfileFeedController(e,t){var o=this;o.all=t.query(e.params)}function SocialController(e,t,o){function r(r){var l=t.get({id:r});l.$promise.then(function(l){console.log(l),null===l.likes&&(l.likes=[]),l.likes.push({userId:o.getPayload()._id}),t.patch({id:r},{likes:l.likes}),e.reload()})}var l=this;l.addLike=r}function card(){return{restrict:"E",replace:!0,templateUrl:"templates/card.html"}}function googleMap(e,t){return{restrict:"E",replace:!0,template:'<div class="google-map">Google map here!</div>',scope:{posts:"="},link:function(o,r){var l=new e.google.maps.Map(r[0],{center:{lat:22.212328,lng:-2.191592},zoom:3,styles:t,scrollwheel:!1,minZoom:3}),i=new e.google.maps.InfoWindow;o.posts.forEach(function(t){var o=new e.google.maps.Marker({position:t.latlng,map:l,icon:"assets/images/newnewicon.png"});o.addListener("click",function(){i.close(),i.setContent('<h6 class="infoWindowText">'+t.title+'</h6><p><img src="'+t.image+'" class="infoWindowImg"></p><a href="#/posts/'+t._id+'">See more...</a>\n        '),i.open(l,o)})})}}}function MainController(e,t,o,r,l){function i(){u.searchBoxOpen=!1,u.navToggle=!1}function n(){e.getPayload()&&r.get({id:e.getPayload()._id},function(e){u.currentUser=e,o.currentUser=e})}function a(){e.logout().then(function(){t.go("home")})}function s(o,r){u.message=null,!e.isAuthenticated()&&p.includes(r.name)&&(console.log("protected"),o.preventDefault(),t.go("login"),u.message="You must be logged in to go there!"),"show"===r.name?u.bodyWhite=!0:u.bodyWhite=!1}function c(){0!==u.searchTerm.length?u.allUsers=r.query({search:u.searchTerm}):u.allUsers=0}var u=this;u.searchBoxOpen=!1,u.navToggle=!1,u.closePopups=i,n(),o.$on("loggedIn",n),u.isLoggedIn=e.isAuthenticated,u.message=null,u.bodyWhite=!1;var p=["feed","show","profile","map"];o.$on("$stateChangeStart",s),u.logout=a,u.search=c,l.textAreaSetup=function(e){e.attr("ui-codemirror","")}}function Post(e){return new e("/posts/:id",{id:"@_id"},{update:{method:"PUT"},patch:{method:"PATCH"}})}function CreatePostController(e,t,o,r,l){function i(){navigator.geolocation?navigator.geolocation.getCurrentPosition(function(e){u.location=e,u.submitLat=u.location.coords.latitude,u.submitLng=u.location.coords.longitude,n(p)}):console.log("Geolocation is not supported by this browser.")}function n(e){var t=u.location.coords,o={lat:t.latitude,lng:t.longitude};e.geocode({location:o},function(e,t){"OK"===t?e[1]?(u.formattedLocation=e[1].formatted_address,console.log(u.formattedLocation),l.$apply()):console.log("No results found"):console.log("Geocoder failed due to: "+t)})}function a(){var e=document.getElementById("pac-input"),t=new r.google.maps.places.Autocomplete(e);t.addListener("place_changed",function(){var e=t.getPlace();return e.geometry?(u.submitLat=e.geometry.location.lat(),void(u.submitLng=e.geometry.location.lng())):void console.log("No details available for input")})}function s(){u.formVisible||(u.formVisible=!u.formVisible)}function c(){t.save(u.post,function(){o.reload(),u.formVisible=!1})}var u=this;u.formVisible=!1,u.location,u.formattedLocation,u.submitLat,u.submitLng,i();var p=new r.google.maps.Geocoder;u.autoComplete=a,u.toggleForm=s,u.post={},u.post.user=e.getPayload()._id,u.create=c}function ShowPostController(e,t,o){var r=this;r.post=t.get({id:o.params.id})}function toggle(){return{restrict:"E",replace:!0,templateUrl:"templates/toggle.html",scope:{isActive:"=",firstValue:"@",secondValue:"@"},link:function(e,t){t.on("click",function(){e.isActive=!e.isActive,e.$apply()})}}}function UploadController(){var e=this;e.data={}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function FollowToggle(e){return new e("/users/:id/following/toggle",{id:"@_id"},{update:{method:"PUT"}})}function Followers(e){return new e("/users/:id/followers",{id:"@_id"})}function UserShowController(e,t,o,r,l,i){function n(){s.user.$remove(function(){e.go("home")})}function a(t){r.update({_id:t.id},function(t){l.currentUser=t,e.reload()})}var s=this;s.isLoggedIn=t.isAuthenticated,s.user=o.get(e.params),s.profileIsCurrentUser=!1,s.followingUser=!1,i.query(e.params,function(e){e.$promise.then(function(e){s.followers=e})}),s.delete=n,s.follow=a,e.params.id===t.getPayload()._id?s.profileIsCurrentUser=!0:s.profileIsCurrentUser=!1,l.currentUser.following.indexOf(e.params.id)!==-1?s.followingUser=!0:s.followingUser=!1}function UserEditController(e,t){function o(){r.user.$update(function(){t.go("profile",t.params)})}var r=this;r.user=e.get(t.params),this.update=o}angular.module("travelApp",["ngResource","ui.router","satellizer","textAngular","ngSanitize"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("travelApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state","$window","$rootScope"],LoginController.$inject=["$auth","$state","$rootScope"],angular.module("travelApp").directive("createPost",createPost),angular.module("travelApp").directive("dragDrop",dragDrop),angular.module("travelApp").factory("MainFeed",MainFeed).factory("ProfileFeed",ProfileFeed),MainFeed.$inject=["$resource"],ProfileFeed.$inject=["$resource"],angular.module("travelApp").controller("MainFeedController",MainFeedController).controller("ProfileFeedController",ProfileFeedController).controller("SocialController",SocialController),MainFeedController.$inject=["$state","MainFeed"],ProfileFeedController.$inject=["$state","ProfileFeed"],SocialController.$inject=["$state","Post","$auth"],angular.module("travelApp").directive("card",card),angular.module("travelApp").directive("googleMap",googleMap),googleMap.$inject=["$window","mapStyles"],angular.module("travelApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope","User","$scope"],angular.module("travelApp").constant("mapStyles",[{featureType:"all",elementType:"all",stylers:[{gamma:"2.71"},{hue:"#ff0000"},{visibility:"off"}]},{featureType:"administrative",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"geometry",stylers:[{weight:"0"},{gamma:"2"},{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text",stylers:[{color:"#ffffff"},{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#6b6972"}]},{featureType:"administrative.country",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"geometry.fill",stylers:[{gamma:"1.00"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels.text",stylers:[{visibility:"off"},{lightness:"69"},{saturation:"-4"}]},{featureType:"administrative.country",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.neighborhood",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.land_parcel",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#ffffff"}]},{featureType:"landscape",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.landcover",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.terrain",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{gamma:"1.00"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"water",elementType:"all",stylers:[{color:"#e8f0f1"},{visibility:"on"}]},{featureType:"water",elementType:"geometry.stroke",stylers:[{visibility:"off"},{color:"#ffffff"}]}]),angular.module("travelApp").factory("Post",Post),Post.$inject=["$resource"],angular.module("travelApp").controller("CreatePostController",CreatePostController).controller("ShowPostController",ShowPostController),CreatePostController.$inject=["$auth","Post","$state","$window","$scope"],ShowPostController.$inject=["$auth","Post","$state"],angular.module("travelApp").directive("toggle",toggle),angular.module("travelApp").controller("UploadController",UploadController),angular.module("travelApp").factory("User",User).factory("Followers",Followers).factory("FollowToggle",FollowToggle),User.$inject=["$resource"],FollowToggle.$inject=["$resource"],Followers.$inject=["$resource"],angular.module("travelApp").controller("UserShowController",UserShowController).controller("UserEditController",UserEditController),UserShowController.$inject=["$state","$auth","User","FollowToggle","$rootScope","Followers"],UserEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
