"use strict";function Router(e,t){e.state("register",{url:"/register",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("usersIndex",{url:"/",templateUrl:"/templates/home.html"}),t.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"332198860490764"}),e.instagram({clientId:"92e67d01aacb443fa782c92500650463"})}function RegisterController(e,t,i){function l(){e.signup(r.user).then(function(e){i.localStorage.setItem("token",e.data.token),t.go("usersIndex")})}var r=this;r.user={},r.submit=l}function LoginController(e,t){function i(){e.login(r.credentials).then(function(){console.log("We would go to the feed now!"),t.go("usersIndex")})}function l(i){e.authenticate(i,function(){t.go("usersIndex")})}var r=this;r.credentials={},r.isActive=!1,r.submit=i,r.authenticate=l}function googleMap(e){return{restrict:"E",replace:!0,template:'<div class="google-map">Google map here!</div>',link:function(t,i){new e.google.maps.Map(i[0],{center:{lat:22.212328,lng:-2.191592},zoom:1,styles:[{featureType:"all",elementType:"all",stylers:[{gamma:"2.71"},{hue:"#ff0000"},{visibility:"off"}]},{featureType:"administrative",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"geometry",stylers:[{weight:"0"},{gamma:"2"},{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text",stylers:[{color:"#ffffff"},{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#6b6972"}]},{featureType:"administrative.country",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"geometry.fill",stylers:[{gamma:"1.00"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"administrative.country",elementType:"labels.text",stylers:[{visibility:"off"},{lightness:"69"},{saturation:"-4"}]},{featureType:"administrative.country",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.neighborhood",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"administrative.land_parcel",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#ffffff"}]},{featureType:"landscape",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.landcover",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.terrain",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{gamma:"1.00"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"water",elementType:"all",stylers:[{color:"#e8f0f1"},{visibility:"on"}]},{featureType:"water",elementType:"geometry.stroke",stylers:[{visibility:"off"},{color:"#ffffff"}]}]})}}}function MainController(e,t,i){function l(){e.logout().then(function(){console.log("main controller logout")})}function r(i,l){n.message=null,!e.isAuthenticated&&a.includes(l.name)&&(i.preventDefault(),t.go("login"),n.message="You must be logged in to go there!")}var n=this;n.isLoggedIn=e.isAuthenticated,n.message=null;var a=["usersEdit","usersNew"];i.$on("$stateChangeStart",r),n.logout=l}function toggle(){return{restrict:"E",replace:!0,templateUrl:"templates/toggle.html",scope:{isActive:"="},link:function(e,t){t.on("click",function(){e.isActive=!e.isActive,e.$apply()})}}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}angular.module("travelApp",["ngResource","ui.router","satellizer","gMap"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("travelApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state","$window"],LoginController.$inject=["$auth","$state"],angular.module("travelApp").directive("googleMap",googleMap),googleMap.$inject=["$window"],angular.module("travelApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("travelApp").directive("toggle",toggle),angular.module("travelApp").factory("User",User);
//# sourceMappingURL=app.js.map
