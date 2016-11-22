"use strict";function Router(e,t){e.state("register",{url:"/register",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("feed",{url:"/feed",templateUrl:"/templates/feed.html",controller:"MainFeedController as mainFeed"}).state("show",{url:"/posts/:id",templateUrl:"/templates/show.html",controller:"ShowPostController as showPost"}).state("profile",{url:"/users/:id",templateUrl:"/templates/profile.html",controller:"UserShowController as userShow"}).state("map",{url:"/map",templateUrl:"/templates/map.html"}).state("home",{url:"/",templateUrl:"/templates/home.html"}),t.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"332198860490764"}),e.instagram({clientId:"92e67d01aacb443fa782c92500650463"})}function RegisterController(e,t,r,l){function o(){e.signup(i.user).then(function(e){r.localStorage.setItem("token",e.data.token),l.$broadcast("loggedIn"),t.go("feed")})}var i=this;i.user={},i.submit=o}function LoginController(e,t,r){function l(){e.login(i.credentials).then(function(){r.$broadcast("loggedIn"),t.go("feed")})}function o(l){console.log("Authenticating"),e.authenticate(l).then(function(){r.$broadcast("loggedIn"),t.go("feed")})}var i=this;i.credentials={},i.isActive=!1,i.submit=l,i.authenticate=o}function createPost(){return{restrict:"E",replace:!0,templateUrl:"templates/createPost.html",controller:"CreatePostController as createPost"}}function dragDrop(){var e=new FileReader;return{restrict:"E",replace:!0,templateUrl:"templates/dragDrop.html",scope:{base64:"=",src:"="},link:function(t,r){t.base64=null,t.active=!1,t.message="Drop image here!",t.$watchGroup(["base64","src"],function(){t.image=t.base64||t.src}),e.onload=function(){t.base64=e.result,t.$apply()},r.on("dragenter",function(){t.active=!0,t.$apply()}).on("dragover",function(e){e.preventDefault()}).on("dragleave",function(){t.active=!1,t.$apply()}).on("drop",function(t){t.preventDefault();var r=(t.target.files||t.dataTransfer.files)[0];e.readAsDataURL(r)})}}}function MainFeed(e){return new e("/users/feed")}function ProfileFeed(e){return new e("/users/:id/posts",{id:"@_id"})}function MainFeedController(e,t){var r=this;r.all=t.query()}function ProfileFeedController(e,t){var r=this;r.all=t.query(e.params)}function SocialController(e,t,r){function l(l){var o=t.get({id:l});o.$promise.then(function(o){console.log(o),null===o.likes&&(o.likes=[]),o.likes.push({userId:r.getPayload()._id}),t.patch({id:l},{likes:o.likes}),e.reload()})}var o=this;o.addLike=l}function card(){return{restrict:"E",replace:!0,templateUrl:"templates/card.html"}}function googleMap(e,t){return{restrict:"E",replace:!0,template:'<div class="google-map">Google map here!</div>',scope:{posts:"="},link:function(r,l){var o=new e.google.maps.Map(l[0],{center:{lat:22.212328,lng:-2.191592},zoom:2,styles:t,scrollwheel:!1,minZoom:2}),i=new e.google.maps.InfoWindow;r.posts.forEach(function(t){var r=new e.google.maps.Marker({position:t.latlng,map:o,icon:"assets/images/newnewicon.png"});r.addListener("click",function(){i.close(),i.setContent('<h6 class="infoWindowText">'+t.title+'</h6><p><img src="'+t.image+'" class="infoWindowImg"></p>\n        '),i.open(o,r)})})}}}function MainController(e,t,r,l,o){function i(){e.getPayload()&&l.get({id:e.getPayload()._id},function(e){u.currentUser=e,r.currentUser=e})}function n(){e.logout().then(function(){t.go("home")})}function a(r,l){u.message=null,!e.isAuthenticated()&&c.includes(l.name)&&(console.log("protected"),r.preventDefault(),t.go("login"),u.message="You must be logged in to go there!")}function s(){0!==u.searchTerm.length?u.allUsers=l.query({search:u.searchTerm}):u.allUsers=0}var u=this;u.searchBoxOpen=!1,u.navToggle=!1,i(),r.$on("loggedIn",i),u.isLoggedIn=e.isAuthenticated,u.message=null;var c=["feed","show","profile","map"];r.$on("$stateChangeStart",a),u.logout=n,u.search=s,o.textAreaSetup=function(e){e.attr("ui-codemirror","")}}function Post(e){return new e("/posts/:id",{id:"@_id"},{update:{method:"PUT"},patch:{method:"PATCH"}})}function CreatePostController(e,t,r){function l(){i.formVisible=!i.formVisible}function o(){t.save(i.post,function(){r.reload(),i.formVisible=!1})}var i=this;i.formVisible=!1,i.toggleForm=l,i.post={},i.post.user=e.getPayload()._id,i.create=o}function ShowPostController(e,t,r){var l=this;l.post=t.get({id:r.params.id})}function toggle(){return{restrict:"E",replace:!0,templateUrl:"templates/toggle.html",scope:{isActive:"=",firstValue:"@",secondValue:"@"},link:function(e,t){t.on("click",function(){e.isActive=!e.isActive,e.$apply()})}}}function UploadController(){var e=this;e.data={}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function FollowToggle(e){return new e("/users/:id/following/toggle",{id:"@_id"},{update:{method:"PUT"}})}function Followers(e){return new e("/users/:id/followers",{id:"@_id"})}function UserShowController(e,t,r,l,o,i){function n(){s.user.$remove(function(){e.go("home")})}function a(t){l.update({_id:t.id},function(t){o.currentUser=t,e.reload()})}var s=this;s.isLoggedIn=t.isAuthenticated,s.user=r.get(e.params),s.profileIsCurrentUser=!1,s.followingUser=!1,i.query(e.params,function(e){e.$promise.then(function(e){s.followers=e})}),s.delete=n,s.follow=a,e.params.id===t.getPayload()._id?s.profileIsCurrentUser=!0:s.profileIsCurrentUser=!1,o.currentUser.following.indexOf(e.params.id)!==-1?s.followingUser=!0:s.followingUser=!1}function UserEditController(e,t){function r(){l.user.$update(function(){t.go("profile",t.params)})}var l=this;l.user=e.get(t.params),this.update=r}angular.module("travelApp",["ngResource","ui.router","satellizer","textAngular","ngSanitize"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("travelApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state","$window","$rootScope"],LoginController.$inject=["$auth","$state","$rootScope"],angular.module("travelApp").directive("createPost",createPost),angular.module("travelApp").directive("dragDrop",dragDrop),angular.module("travelApp").factory("MainFeed",MainFeed).factory("ProfileFeed",ProfileFeed),MainFeed.$inject=["$resource"],ProfileFeed.$inject=["$resource"],angular.module("travelApp").controller("MainFeedController",MainFeedController).controller("ProfileFeedController",ProfileFeedController).controller("SocialController",SocialController),MainFeedController.$inject=["$state","MainFeed"],ProfileFeedController.$inject=["$state","ProfileFeed"],SocialController.$inject=["$state","Post","$auth"],angular.module("travelApp").directive("card",card),angular.module("travelApp").directive("googleMap",googleMap),googleMap.$inject=["$window","mapStyles"],angular.module("travelApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope","User","$scope"],angular.module("travelApp").constant("mapStyles",[{featureType:"all",elementType:"all",stylers:[{gamma:"2.71"},{hue:"#ff0000"},{visibility:"off"}]},{featureType:"administrative",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"geometry",stylers:[{weight:"0"},{gamma:"2"},{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text",stylers:[{color:"#ffffff"},{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#6b6972"}]},{featureType:"administrative.country",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"geometry.fill",stylers:[{gamma:"1.00"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels.text",stylers:[{visibility:"off"},{lightness:"69"},{saturation:"-4"}]},{featureType:"administrative.country",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.neighborhood",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.land_parcel",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#ffffff"}]},{featureType:"landscape",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.landcover",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.terrain",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{gamma:"1.00"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"water",elementType:"all",stylers:[{color:"#e8f0f1"},{visibility:"on"}]},{featureType:"water",elementType:"geometry.stroke",stylers:[{visibility:"off"},{color:"#ffffff"}]}]),angular.module("travelApp").factory("Post",Post),Post.$inject=["$resource"],angular.module("travelApp").controller("CreatePostController",CreatePostController).controller("ShowPostController",ShowPostController),CreatePostController.$inject=["$auth","Post","$state"],ShowPostController.$inject=["$auth","Post","$state"],angular.module("travelApp").directive("toggle",toggle),angular.module("travelApp").controller("UploadController",UploadController),angular.module("travelApp").factory("User",User).factory("Followers",Followers).factory("FollowToggle",FollowToggle),User.$inject=["$resource"],FollowToggle.$inject=["$resource"],Followers.$inject=["$resource"],angular.module("travelApp").controller("UserShowController",UserShowController).controller("UserEditController",UserEditController),UserShowController.$inject=["$state","$auth","User","FollowToggle","$rootScope","Followers"],UserEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
