// angular.module('dogApp')
//     .controller('DogsIndexController', DogsIndexController)
//     .controller('DogsNewController', DogsNewController)
//     .controller('DogsShowController', DogsShowController)
//     .controller('DogsEditController', DogsEditController)
//
// DogsIndexController.$inject = ['Dog'];
// 
// //INDEX
// function DogsIndexController(Dog){
//     const dogsIndex = this;
//
//     dogsIndex.all = Dog.query();
// }
//
// DogsNewController.$inject = ['Dog', '$state'];
//
// //CREATE
// function DogsNewController(Dog, $state) {
//     const dogsNew = this;
//     dogsNew.dog = {};
//
//   function createDog() {
//     Dog.save(dogsNew.dog, () => {
//         $state.go('dogsIndex');
//     });
// }
//   dogsNew.create = createDog;
// }
//
// DogsShowController.$inject = ['Dog', '$state'];
//
// //SHOW & DELETE
// function DogsShowController(Dog, $state) {
//     const dogsShow = this;
//
//     dogsShow.dog = Dog.get($state.params);
//
//   function deleteDog() {
//     dogsShow.dog.$remove(() => {
//         $state.go('dogsIndex');
//     });
// }
// dogsShow.delete = deleteDog;
// }
//
//
// DogsEditController.$inject = ['Dog', '$state'];
//
// //EDIT & UPDATE
// function DogsEditController(Dog, $state) {
//   const dogsEdit = this;
//
//   dogsEdit.dog = Dog.get($state.params);
//
//   function update() {
//     Dog.update({ id: dogsEdit.dog._id }, dogsEdit.dog, () => {
//       $state.go('dogsShow', $state.params);
//     });
//   }
//
//   this.update = update;
// }
