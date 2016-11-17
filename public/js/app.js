"use strict";angular.module("travelApp",[]).directive("toggleClass",function(){return{restrict:"A",link:function(t,e,l){e.parent().bind("click",function(){e.toggleClass(l.toggleClass)})}}});
//# sourceMappingURL=app.js.map
