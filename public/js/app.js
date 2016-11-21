"use strict";function Router(e,t){e.state("register",{url:"/register",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("feed",{url:"/feed",templateUrl:"/templates/feed.html",controller:"MainFeedController as mainFeed"}).state("profile",{url:"/users/:id",templateUrl:"/templates/profile.html",controller:"UserShowController as userShow"}).state("map",{url:"/map",templateUrl:"/templates/map.html"}).state("home",{url:"/",templateUrl:"/templates/feed.html"}),t.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"332198860490764"}),e.instagram({clientId:"92e67d01aacb443fa782c92500650463"})}function RegisterController(e,t,r){function l(){e.signup(o.user).then(function(e){r.localStorage.setItem("token",e.data.token),t.go("feed")})}var o=this;o.user={},o.submit=l}function LoginController(e,t){function r(){e.login(o.credentials).then(function(){t.go("feed")})}function l(r){console.log("Authenticating"),e.authenticate(r).then(function(){t.go("feed")})}var o=this;o.credentials={},o.isActive=!1,o.submit=r,o.authenticate=l}function createPost(){return{restrict:"E",replace:!0,templateUrl:"templates/createPost.html",controller:"CreatePostController as createPost"}}function card(){return{restrict:"E",replace:!0,templateUrl:"templates/card.html"}}function MainFeed(e){return new e("/users/feed")}function ProfileFeed(e){return new e("/users/:id/posts",{id:"@_id"})}function MainFeedController(e,t){var r=this;r.all=t.query()}function ProfileFeedController(e,t,r){var l=this;l.feed=t.query(e.params),angular.forEach(l.feed,function(e){e.bodyText=r.trustAsHtml(e.bodyText)}),l.all=l.feed}function googleMap(e){return{restrict:"E",replace:!0,template:'<div class="google-map">Google map here!</div>',link:function(t,r){new e.google.maps.Map(r[0],{center:{lat:22.212328,lng:-2.191592},zoom:1,styles:[{featureType:"all",elementType:"all",stylers:[{gamma:"2.71"},{hue:"#ff0000"},{visibility:"off"}]},{featureType:"administrative",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"geometry",stylers:[{weight:"0"},{gamma:"2"},{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text",stylers:[{color:"#ffffff"},{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#6b6972"}]},{featureType:"administrative.country",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"geometry.fill",stylers:[{gamma:"1.00"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels.text",stylers:[{visibility:"off"},{lightness:"69"},{saturation:"-4"}]},{featureType:"administrative.country",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.neighborhood",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.land_parcel",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#ffffff"}]},{featureType:"landscape",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.landcover",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.terrain",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{gamma:"1.00"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"water",elementType:"all",stylers:[{color:"#e8f0f1"},{visibility:"on"}]},{featureType:"water",elementType:"geometry.stroke",stylers:[{visibility:"off"},{color:"#ffffff"}]}]})}}}function MainController(e,t,r,l,o,i){function n(){e.logout().then(function(){t.go("home")})}function a(r,l){u.message=null,!e.isAuthenticated&&c.includes(l.name)&&(r.preventDefault(),t.go("login"),u.message="You must be logged in to go there!")}function s(){0!==u.searchTerm.length?u.allUsers=o.query({search:u.searchTerm}):u.allUsers=0}var u=this;if(u.searchBoxOpen=!1,u.navToggle=!1,e.getPayload()){var f={id:e.getPayload()._id};this.currentUser=l.get(f),r.currentUser=this.currentUser}u.isLoggedIn=e.isAuthenticated,u.message=null;var c=["usersEdit","usersNew"];r.$on("$stateChangeStart",a),u.logout=n,u.search=s,i.textAreaSetup=function(e){e.attr("ui-codemirror","")}}function Post(e){return new e("/posts")}function CreatePostController(e,t,r){function l(){t.save(o.post,function(){r.go("home")})}var o=this;o.post={},o.post.user=e.getPayload()._id,o.create=l}function toggle(){return{restrict:"E",replace:!0,templateUrl:"templates/toggle.html",scope:{isActive:"=",firstValue:"@",secondValue:"@"},link:function(e,t){t.on("click",function(){e.isActive=!e.isActive,e.$apply()})}}}function UserSearch(e){return new e("/users")}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function FollowToggle(e){return new e("/users/:id/following/toggle",{id:"@_id"},{update:{method:"PUT"}})}function UserShowController(e,t,r,l,o){function i(){a.user.$remove(function(){e.go("home")})}function n(t){l.update({_id:t.id},function(t){o.currentUser=t,e.reload()})}var a=this;a.isLoggedIn=t.isAuthenticated,a.user=r.get(e.params),a.profileIsCurrentUser=!1,a.followingUser=!1,a.delete=i,a.follow=n,e.params.id===t.getPayload()._id?a.profileIsCurrentUser=!0:a.profileIsCurrentUser=!1,o.currentUser.following.indexOf(e.params.id)!==-1?a.followingUser=!0:a.followingUser=!1}function UserEditController(e,t){function r(){l.user.$update(function(){t.go("profile",t.params)})}var l=this;l.user=e.get(t.params),this.update=r}angular.module("travelApp",["ngResource","ui.router","satellizer","textAngular","ngSanitize"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("travelApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state","$window"],LoginController.$inject=["$auth","$state"],angular.module("travelApp").directive("createPost",createPost),angular.module("travelApp").directive("card",card),angular.module("travelApp").factory("MainFeed",MainFeed).factory("ProfileFeed",ProfileFeed),MainFeed.$inject=["$resource"],ProfileFeed.$inject=["$resource"],angular.module("travelApp").controller("MainFeedController",MainFeedController).controller("ProfileFeedController",ProfileFeedController),MainFeedController.$inject=["$state","MainFeed"],ProfileFeedController.$inject=["$state","ProfileFeed","$sce"],angular.module("travelApp").directive("googleMap",googleMap),googleMap.$inject=["$window"],angular.module("travelApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope","User","UserSearch","$scope"],angular.module("travelApp").factory("Post",Post),Post.$inject=["$resource"],angular.module("travelApp").controller("CreatePostController",CreatePostController),CreatePostController.$inject=["$auth","Post","$state"],angular.module("travelApp").directive("toggle",toggle),angular.module("travelApp").factory("User",User).factory("UserSearch",UserSearch).factory("FollowToggle",FollowToggle),UserSearch.$inject=["$resource"],User.$inject=["$resource"],FollowToggle.$inject=["$resource"],angular.module("travelApp").controller("UserShowController",UserShowController).controller("UserEditController",UserEditController),UserShowController.$inject=["$state","$auth","User","FollowToggle","$rootScope"],UserEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
