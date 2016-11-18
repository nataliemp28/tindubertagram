"use strict";function Router(e,t){e.state("register",{url:"/register",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("feed",{url:"/feed",templateUrl:"/templates/cardContainer.html",controller:"MainFeedController as mainFeed"}).state("profile",{url:"/user/:id",templateUrl:"/templates/profile.html",controller:"UserShowController as userShow"}).state("map",{url:"/map",templateUrl:"/templates/map.html"}).state("home",{url:"/",templateUrl:"/templates/home.html"}),t.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"332198860490764"})}function RegisterController(e,t,r){function l(){e.signup(i.user).then(function(e){r.localStorage.setItem("token",e.data.token),t.go("feed")})}var i=this;i.user={},i.submit=l}function LoginController(e,t){function r(){e.login(i.credentials).then(function(){t.go("feed")})}function l(r){e.authenticate(r,function(){t.go("usersIndex")})}var i=this;i.credentials={},i.isActive=!1,i.submit=r,i.authenticate=l}function MainFeedController(e,t){var r=this;r.all=t.query()}function ProfileFeedController(e,t){var r=this;r.all=t.query()}function MainFeed(e){return new e("/user/feed")}function ProfileFeed(e){return new e("/user/posts")}function googleMap(e){return{restrict:"E",replace:!0,template:'<div class="google-map">Google map here!</div>',link:function(t,r){new e.google.maps.Map(r[0],{center:{lat:22.212328,lng:-2.191592},zoom:1,styles:[{featureType:"all",elementType:"all",stylers:[{gamma:"2.71"},{hue:"#ff0000"},{visibility:"off"}]},{featureType:"administrative",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"geometry",stylers:[{weight:"0"},{gamma:"2"},{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text",stylers:[{color:"#ffffff"},{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#6b6972"}]},{featureType:"administrative.country",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"geometry.fill",stylers:[{gamma:"1.00"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels.text",stylers:[{visibility:"off"},{lightness:"69"},{saturation:"-4"}]},{featureType:"administrative.country",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.neighborhood",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.land_parcel",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#ffffff"}]},{featureType:"landscape",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.landcover",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.terrain",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{gamma:"1.00"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"water",elementType:"all",stylers:[{color:"#e8f0f1"},{visibility:"on"}]},{featureType:"water",elementType:"geometry.stroke",stylers:[{visibility:"off"},{color:"#ffffff"}]}]})}}}function MainController(e,t,r,l,i){function o(){e.logout().then(function(){t.go("home")})}function n(r,l){s.message=null,!e.isAuthenticated&&y.includes(l.name)&&(r.preventDefault(),t.go("login"),s.message="You must be logged in to go there!")}function a(){0!==s.searchTerm.length?s.allUsers=i.query({search:s.searchTerm}):s.allUsers=0}var s=this;if(e.getPayload()){var u={id:e.getPayload()._id};this.currentUser=l.get(u)}s.isLoggedIn=e.isAuthenticated,s.message=null;var y=["usersEdit","usersNew"];r.$on("$stateChangeStart",n),s.logout=o,s.search=a}function ProfileController(e,t,r){var l=this;l.user=r.show(e.getPayload()._id)}function toggle(){return{restrict:"E",replace:!0,templateUrl:"templates/toggle.html",scope:{isActive:"=",firstValue:"@",secondValue:"@"},link:function(e,t){t.on("click",function(){e.isActive=!e.isActive,e.$apply()})}}}function UserSearch(e){return new e("/users")}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UserShowController(e,t,r){function l(){i.user.$remove(function(){e.go("home")})}var i=this;i.isLoggedIn=t.isAuthenticated,i.user=r.get(e.params),i.delete=l}function UserEditController(e,t){function r(){l.user.$update(function(){t.go("profile",t.params)})}var l=this;l.user=e.get(t.params),this.update=r}angular.module("travelApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("travelApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state","$window"],LoginController.$inject=["$auth","$state"],angular.module("travelApp").controller("MainFeedController",MainFeedController).controller("ProfileFeedController",ProfileFeedController),MainFeedController.$inject=["$state","MainFeed"],ProfileFeedController.$inject=["$state","ProfileFeed"],angular.module("travelApp").factory("MainFeed",MainFeed).factory("ProfileFeed",ProfileFeed),MainFeed.$inject=["$resource"],ProfileFeed.$inject=["$resource"],angular.module("travelApp").directive("googleMap",googleMap),googleMap.$inject=["$window"],angular.module("travelApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope","User","UserSearch"],angular.module("travelApp").controller("ProfileController",ProfileController),ProfileController.$inject=["$auth","$state","User"],angular.module("travelApp").directive("toggle",toggle),angular.module("travelApp").factory("User",User).factory("UserSearch",UserSearch),UserSearch.$inject=["$resource"],User.$inject=["$resource"],angular.module("travelApp").controller("UserShowController",UserShowController).controller("UserEditController",UserEditController),UserShowController.$inject=["$state","$auth","User"],UserEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
